import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "32kb" }));

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
    if (message.length > 2000) {
      return res.status(400).json({ error: "Message must be 2,000 characters or fewer." });
    }

    // Prepare system instructions with calculation context & academic paper references
    const contextSummary = context
      ? `
[Current User's Weekly Microplastic Intake Calculation Results]
- Estimated Total Weekly Intake: ${context.totalExposure ?? "0"} particles/week
- Estimated Total Mass: ~${context.totalMassMicrograms ?? "0"} μg/week
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
  1. Measured empirical microplastic contamination across eight food types. The calculator represents beverages as soft drinks, fruit drinks, and bottled tea, producing ten calculation categories.
  2. The paper's aggregate deterministic and Monte Carlo estimates were 139.9 and 305.6 μg/week, respectively, across 13 categories including fish, shellfish, and water. Do not directly treat those values as a matched baseline for this calculator's ten categories.
  3. Mass is estimated separately for each category from its geometric-mean particle size, assuming spherical particles and a density of 0.98 g/mL. It is not calculated using a universal mass-per-particle factor.
  4. In the study's preparation experiment, washing dried seaweed and kelp twice reduced measured particle counts by 70% and 84%, respectively. Do not generalize this result to every product without qualification.
  5. The primary plastic polymer types identified were Polyethylene (PE), Polypropylene (PP), and PET, predominantly in small particle sizes below 300 μm (with a high frequency between 45–99 μm).
`
      : "[No calculation data available]";

    const systemInstruction = `You are a scientific AI Environmental Health & Dietary Microplastic Exposure Advisor.
Your role is to clearly and objectively explain the user's estimated weekly dietary microplastic exposure based on academic research and empirical measurements.

Strictly adhere to the following guidelines:
1. Use the active calculation figures: total particles/week, particle-size-based mass, and category contributions.
2. Treat Pham et al. (2023) as an exposure-assessment source, not as evidence of a human dose-response relationship or a clinical risk threshold.
3. Explicitly state that the calculator cannot determine whether an individual's exposure is safe, harmful, or causally linked to a health outcome.
4. Distinguish the ten measured-food calculation categories from the paper's 13-category aggregate estimate.
5. Only recommend reduction measures directly supported by the cited study, such as washing dried seaweed/kelp. Label broader advice as general precautionary guidance.
6. Respond in clear, professional, fluent English with concise Markdown.`;

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
      model: process.env.GEMINI_MODEL || "gemini-3.6-flash",
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
