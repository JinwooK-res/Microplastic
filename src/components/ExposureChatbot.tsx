import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Trash2, HelpCircle, Loader2, ArrowDownCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ExposureResult } from "../types";

interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
}

interface ExposureChatbotProps {
  totalExposure: number;
  plasticWeightMg: number;
  creditCardFraction: number;
  worstFood?: ExposureResult | null;
  results: ExposureResult[];
}

export const ExposureChatbot: React.FC<ExposureChatbotProps> = ({
  totalExposure,
  plasticWeightMg,
  creditCardFraction,
  worstFood,
  results,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with tailored welcome message based on current inputs
  useEffect(() => {
    const timeStr = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const initialText = `Hello! I am your **Dietary Microplastic Exposure AI Advisor**. 🤖

Based on your current dietary selections:
- 📊 **Total Weekly Ingestion**: **${totalExposure.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} particles/week**
- ⚖️ **Estimated Mass**: ~**${plasticWeightMg.toFixed(2)} mg** (annual equivalent: ~${(creditCardFraction * 52).toFixed(2)} credit cards/year)
- ⚠️ **Primary Contributor**: **${worstFood ? `${worstFood.name_en} (${worstFood.percentage.toFixed(1)}%)` : "None"}**

Feel free to ask about the real-world health implications of your score, comparisons against the empirical Korean adult baseline in **Pham et al. (2023)**, or practical kitchen washing and cooking tips to reduce microplastic intake!`;

    setMessages([
      {
        id: "welcome-1",
        role: "model",
        content: initialText,
        timestamp: timeStr,
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (userText?: string) => {
    const query = (userText || input).trim();
    if (!query || loading) return;

    const timeStr = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userText) setInput("");
    setLoading(true);

    try {
      // Build conversation history for API (last 6 turns to keep context tight and relevant)
      const chatHistory = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const contextPayload = {
        totalExposure: totalExposure.toFixed(2),
        plasticWeightMg: plasticWeightMg.toFixed(2),
        creditCardFraction: (creditCardFraction * 52).toFixed(2),
        worstFood: worstFood
          ? {
              name_en: worstFood.name_en,
              name_kr: worstFood.name_kr,
              percentage: worstFood.percentage.toFixed(1),
              intake: worstFood.intake,
              unit: worstFood.unit,
            }
          : null,
        results: results.map((r) => ({
          name_en: r.name_en,
          name_kr: r.name_kr,
          intake: r.intake,
          unit: r.unit,
          concentration: r.concentration,
          concentrationUnit: r.concentrationUnit,
          exposure: r.exposure,
          percentage: r.percentage,
        })),
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: query,
          history: chatHistory,
          context: contextPayload,
        }),
      });

      const data = await res.json();
      const replyText = data.reply || "Failed to retrieve a response. Please try again shortly.";

      const aiMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: "model",
        content: replyText,
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "model",
        content:
          "There was an error communicating with the server. Please check your network connection and try again.",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    const timeStr = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "model",
        content: `Conversation reset. Your current weekly estimated exposure is **${totalExposure.toFixed(1)} particles/week**. What would you like to explore?`,
        timestamp: timeStr,
      },
    ]);
  };

  const QUICK_QUESTIONS = [
    "Is my calculated exposure higher than the average adult baseline?",
    worstFood ? `How can I significantly reduce exposure from [${worstFood.name_en}]?` : "Which foods pose the highest risk of microplastics?",
    "How does this compare to the findings in Pham et al. (2023)?",
    "Does rinsing dried seaweed or cooking in glass actually remove microplastics?",
  ];

  return (
    <div id="ai-exposure-chatbot-section" className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col transition-all">
      {/* Header */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-white tracking-tight font-display flex items-center gap-1.5">
                AI Exposure Analysis & Scientific Advisor
              </h3>
              <span className="bg-amber-400/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/20">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Interactive explanations grounded in empirical food research and your real-time intake data
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Active Exposure: <strong className="text-amber-400 font-mono">{totalExposure.toFixed(1)} p/w</strong></span>
          </div>

          <button
            onClick={handleResetChat}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Reset conversation"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggestion Prompts Banner */}
      <div className="bg-slate-50/80 border-b border-slate-150 px-6 py-2.5 overflow-x-auto scrollbar-none flex items-center gap-2 text-xs">
        <span className="text-slate-400 text-[11px] font-semibold shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" /> Suggested Prompts:
        </span>
        <div className="flex items-center gap-1.5 flex-nowrap">
          {QUICK_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              disabled={loading}
              onClick={() => handleSend(q)}
              className="shrink-0 bg-white hover:bg-slate-100 hover:text-indigo-600 text-slate-600 text-[11px] px-3 py-1 rounded-full border border-slate-200 shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Stream Container */}
      <div className="p-6 space-y-4 max-h-[460px] min-h-[280px] overflow-y-auto bg-slate-50/30">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs shadow-2xs ${
                  isUser
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-900 text-amber-400 border border-slate-800"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed space-y-1 shadow-2xs ${
                  isUser
                    ? "bg-indigo-600 text-white rounded-tr-xs"
                    : "bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] opacity-70 mb-1">
                  <span className="font-bold">{isUser ? "You" : "AI Exposure Advisor"}</span>
                  <span className="font-mono">{msg.timestamp}</span>
                </div>

                <div className={`prose prose-xs max-w-none text-xs ${isUser ? "text-white prose-invert" : "text-slate-800"}`}>
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 my-1">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1 my-1">{children}</ol>,
                      li: ({ children }) => <li className="leading-snug">{children}</li>,
                      strong: ({ children }) => <strong className="font-extrabold">{children}</strong>,
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Bubble */}
        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl shrink-0 bg-slate-900 text-amber-400 border border-slate-800 flex items-center justify-center shadow-2xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-4 text-xs text-slate-500 shadow-2xs flex items-center gap-2.5">
              <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
              <span>Analyzing dietary exposure metrics against empirical research data...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-4 bg-white border-t border-slate-200 flex items-center gap-3"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about toxicity, comparisons with average adult baselines, or tips to reduce intake..."
            disabled={loading}
            className="w-full bg-slate-50 border border-slate-250 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
