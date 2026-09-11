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
[Current User's Weekly Microplastic Intake Calculation Results]
- Estimated Total Weekly Intake: ${context.totalExposure ?? "0"} particles/week
- Estimated Total Weight: ~${context.plasticWeightMg ?? "0"} mg/week
- Annual Credit Card Equivalent: ~${context.creditCardFraction ?? "0"} cards/year
- Highest Contributing Food Category: ${context.worstFood?.name_en || context.worstFood?.name_kr || "None"} (~${context.worstFood?.percentage ?? 0}%)
- Detailed Intake & Exposure Breakdown by Food Group:
${
  Array.isArray(context.results)
    ? context.results
        .map(
          (r: any) =>
            `  * ${r.name_en || r.name_kr}: Intake ${r.intake}${r.unit}, Concentration ${r.concentration}${r.concentrationUnit} -> Exposure ${r.exposure?.toFixed?.(2) ?? r.exposure} particles (${r.percentage?.toFixed?.(1) ?? r.percentage}%)`
        )
        .join("\n")
    : "  No data provided"
}

[Academic Research Reference Standard]
- Paper: "Analysis of microplastics in various foods and assessment of aggregate human exposure via food consumption in Korea" (Environmental Pollution 322 (2023) 121153)
- Authors: Dat Thanh Pham, Jinwoo Kim, Sang-Hwa Lee, Juyang Kim, Dowoon Kim, Soonki Hong, Jaehak Jung, Jung-Hwan Kwon (Korea University, FITI Testing & Research Institute, KASTIS)
- Key Research Findings:
  1. Measured empirical microplastic contamination concentrations across 8 staple food groups in Korea (salt, soy sauce, fish sauce, salted fermented seafood, seaweed, honey, beer, bottled beverages).
  2. The calculated average weekly microplastic intake for a Korean adult ranges between 1.4×10^-4 to 3.1×10^-4 g/week (~0.14 to 0.31 mg/week).
  3. Sensationalized media claims such as "eating a credit card's worth of plastic (5g) every week" stem from extreme assumptions and outliers; rigorous empirical dietary measurements show actual mass intake is orders of magnitude lower.
  4. Rinsing dried seaweed (Wakame, Kelp) 2 to 3 times thoroughly under running tap water before cooking eliminates 70% to 84% of adhered microplastic particles.
  5. The primary plastic polymer types identified were Polyethylene (PE), Polypropylene (PP), and PET, predominantly in small particle sizes below 300 μm (with a high frequency between 45–99 μm).
`
      : "[No calculation data available]";

    const systemInstruction = `You are a scientific AI Environmental Health & Dietary Microplastic Exposure Advisor.
Your role is to clearly, objectively, and encouragingly explain the user's weekly calculated microplastic exposure based on academic research and empirical measurements.

Strictly adhere to the following guidelines:
1. Provide personalized explanations grounded in the user's active calculation figures (total particles/week, estimated mg mass, and their top exposure vectors).
2. Ground all toxicological and exposure context in the scientific findings of Pham et al. (2023), "Analysis of microplastics in various foods and assessment of aggregate human exposure via food consumption in Korea" (Environmental Pollution 322:121153).
3. Put risk into objective perspective: clarify that the sensationalized "eating 1 credit card (5 grams) per week" statistic was an inflated estimate from early speculative models, whereas peer-reviewed empirical measurements place actual weekly intake in the hundreds of micrograms.
4. Highlight the single highest dietary contributor in the user's current settings, and provide practical, evidence-based reduction tips (e.g., washing dried seaweed, selecting vacuum-refined table/rock salt, avoiding heating food in disposable plastics, using reusable stainless/glass bottles).
5. Respond in clear, professional, fluent English. Format answers with clean Markdown (bold metrics, concise bullet points, and scannable paragraphs).`;

    let ai;
    try {
      ai = getAIClient();
    } catch (e: any) {
      return res.status(500).json({
        reply: `⚠️ **Notice**: GEMINI_API_KEY is not configured in the environment. Please set the API key in your environment variables. (Local Fallback Summary: Your current estimated weekly exposure is ${context?.totalExposure ?? 0} particles/week.)`,
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
