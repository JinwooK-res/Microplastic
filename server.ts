import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in the environment.");
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", geminiConfigured: !!process.env.GEMINI_API_KEY });
});

// Chatbot endpoint to explain microplastic exposure
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, context } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required." });
    }

    // Prepare system instructions with calculation context & academic paper references
    const contextSummary = context
      ? `
[현재 사용자의 주간 미세플라스틱 섭취 계산 결과]
- 주당 총 미세플라스틱 추정 섭취량: ${context.totalExposure ?? "0"} particles/week (개/주)
- 추정 미세플라스틱 중량: 약 ${context.plasticWeightMg ?? "0"} mg/week
- 연간 신용카드 환산치: 연간 약 ${context.creditCardFraction ?? "0"}장 분량
- 가장 높은 노출 비중 식품군: ${context.worstFood?.name_kr ?? "없음"} (약 ${context.worstFood?.percentage ?? 0}%)
- 식품군별 상세 섭취 및 노출 데이터:
${
  Array.isArray(context.results)
    ? context.results
        .map(
          (r: any) =>
            `  * ${r.name_kr}: 섭취량 ${r.intake}${r.unit}, 농도 ${r.concentration}${r.concentrationUnit} -> 노출량 ${r.exposure?.toFixed?.(2) ?? r.exposure}개 (${r.percentage?.toFixed?.(1) ?? r.percentage}%)`
        )
        .join("\n")
    : "  정보 없음"
}

[학술 연구 레퍼런스 기준 정보]
- 연구 논문: "Analysis of microplastics in various foods and assessment of aggregate human exposure via food consumption in Korea" (Environmental Pollution 322 (2023) 121153)
- 저자: Dat Thanh Pham, Jinwoo Kim, Sang-Hwa Lee, Juyang Kim, Dowoon Kim, Soonki Hong, Jaehak Jung, Jung-Hwan Kwon (고려대학교, FITI시험연구원, 한국분석과학기술원)
- 핵심 연구 결과:
  1. 한국인이 주로 소비하는 8대 식품군(소금, 간장, 액젓, 젓갈, 해조류, 꿀, 맥주, 음료)의 실측 미세플라스틱 농도 측정.
  2. 한국 성인 1인당 주간 평균 미세플라스틱 섭취량은 1.4×10^-4 ~ 3.1×10^-4 g/week (약 0.14 ~ 0.31 mg/week) 수준으로 산출됨.
  3. 과거 일부 언론이나 초기 연구에서 보도된 "매주 신용카드 1장(5g) 분량 섭취"와 같은 극단적 추정치는 이상치(outlier) 및 비현실적 가정에 기인한 과대평가이며, 실제 실측 노출량은 그보다 수만 배 이상 작음.
  4. 건조 미역/다시마 등 해조류의 경우 조리 전 수돗물로 2~3회 깨끗이 씻으면 미세플라스틱이 70~84% 이상 크게 감소함.
  5. 검출된 플라스틱 성분은 주로 PE(폴리에틸렌), PP(폴리프로필렌), PET이며, 입자 크기는 대부분 300 μm 미만(특히 45~99 μm 구간이 다수)이었음.
`
      : "[계산 결과 정보 없음]";

    const systemInstruction = `당신은 대한민국 환경보건 및 미세플라스틱 식품 노출 평가 전문 AI 자문 챗봇입니다.
사용자가 계산한 주간 미세플라스틱 섭취량 수치를 친절하고 과학적 근거에 기반하여 명쾌하게 설명해주는 역할을 합니다.

사용자의 질문에 답할 때 다음 지침을 엄격히 준수하세요:
1. 사용자의 현재 계산 수치(총 섭취 입자수, mg 중량, 주요 원인 식품군)를 바탕으로 맞춤형 설명을 제공하세요.
2. Pham et al. (2023) 논문('Analysis of microplastics in various foods and assessment of aggregate human exposure via food consumption in Korea')의 과학적 사실을 바탕으로 설명하세요.
3. 과거 언론의 과장된 공포("매주 신용카드 1장 분량인 5g을 먹는다")와 실제 실측 연구 결과(평균 수백 마이크로그램 수준)의 객관적 차이를 올바르게 짚어주어 불필요한 불안을 덜어주세요.
4. 사용자의 식단에서 가장 비중이 큰 식품군을 짚고, 이를 현실적으로 줄일 수 있는 실천 팁(예: 해조류 세척법, 정제염 선택, 일회용 플라스틱 용기 가열 금지, 텀블러 사용 등)을 제안하세요.
5. 친절하고 읽기 쉬운 한국어로 답변하고, 핵심은 마크다운(굵은 글씨, 불릿 포인트)을 활용해 정돈해 주세요.`;

    let ai;
    try {
      ai = getAIClient();
    } catch (e: any) {
      return res.status(500).json({
        reply: `⚠️ **안내**: Gemini API Key 설정이 필요합니다. 관리자 환경변수(GEMINI_API_KEY)를 확인해 주세요. (로컬 기본 설명: 현재 계산된 주간 노출량은 총 ${context?.totalExposure ?? 0} particles/week 입니다.)`,
      });
    }

    // Build chat contents from history if provided
    const contents: any[] = [];

    // Append previous dialogue if valid
    if (Array.isArray(history)) {
      for (const msg of history) {
        if (msg.role === "user" || msg.role === "model") {
          contents.push({
            role: msg.role === "model" ? "model" : "user",
            parts: [{ text: msg.content }],
          });
        }
      }
    }

    // Append current user message with context
    contents.push({
      role: "user",
      parts: [
        {
          text: `[시스템 데이터 컨텍스트]\n${contextSummary}\n\n[사용자 질문]\n${message}`,
        },
      ],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || "답변을 생성하지 못했습니다. 다시 시도해 주세요.";
    return res.json({ reply });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return res.status(500).json({
      error: "Gemini API 호출 중 오류가 발생했습니다.",
      details: error?.message || String(error),
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
