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
    const timeStr = new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
    const initialText = `안녕하세요! **미세플라스틱 노출 분석 AI 전문 어드바이저**입니다. 🤖

현재 계산된 회원님의 주간 추정치:
- 📊 **총 주간 섭취량**: **${totalExposure.toLocaleString("ko-KR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} particles/week**
- ⚖️ **추정 중량**: 약 **${plasticWeightMg.toFixed(2)} mg** (연간 신용카드 약 ${(creditCardFraction * 52).toFixed(1)}장 분량)
- ⚠️ **최대 노출 식품**: **${worstFood ? `${worstFood.name_kr} (${worstFood.percentage.toFixed(1)}%)` : "선택 없음"}**

계산된 노출량의 실제 건강 영향, **Pham et al. (2023)** 논문의 한국인 평균 실측 데이터와의 비교, 또는 섭취량을 대폭 줄이는 세척/조리 팁 등에 대해 무엇이든 편하게 질문해 주세요!`;

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

    const timeStr = new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
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
              name_kr: worstFood.name_kr,
              percentage: worstFood.percentage.toFixed(1),
              intake: worstFood.intake,
              unit: worstFood.unit,
            }
          : null,
        results: results.map((r) => ({
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
      const replyText = data.reply || "답변을 받아오지 못했습니다. 잠시 후 다시 시도해 주세요.";

      const aiMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: "model",
        content: replyText,
        timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "model",
        content:
          "서버와 통신하는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주시거나 네트워크 상태를 확인해 주세요.",
        timestamp: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    const timeStr = new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "model",
        content: `대화 내용이 초기화되었습니다. 현재 설정된 주간 총 섭취량은 **${totalExposure.toFixed(1)} particles/week** 입니다. 궁금하신 점을 말씀해 주세요!`,
        timestamp: timeStr,
      },
    ]);
  };

  const QUICK_QUESTIONS = [
    "현재 나의 노출량 수치가 일반 성인 대비 높은 편인가요?",
    worstFood ? `가장 비중이 높은 [${worstFood.name_kr}] 노출을 어떻게 줄일 수 있나요?` : "가장 주의해야 할 식품은 무엇인가요?",
    "논문(Pham et al., 2023)의 실제 한국인 평균 섭취량과 비교해줘",
    "해조류나 젓갈을 조리할 때 미세플라스틱을 줄이는 실천법은?",
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
                AI 노출량 분석 & 자문 챗봇
              </h3>
              <span className="bg-amber-400/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/20">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              실시간 계산된 주간 노출량 데이터 및 학술 연구 기준 기반 맞춤 설명
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>연동 섭취량: <strong className="text-amber-400 font-mono">{totalExposure.toFixed(1)} p/w</strong></span>
          </div>

          <button
            onClick={handleResetChat}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
            title="대화 초기화"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggestion Prompts Banner */}
      <div className="bg-slate-50/80 border-b border-slate-150 px-6 py-2.5 overflow-x-auto scrollbar-none flex items-center gap-2 text-xs">
        <span className="text-slate-400 text-[11px] font-semibold shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" /> 추천 질문:
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
                  <span className="font-bold">{isUser ? "나" : "AI 노출량 어드바이저"}</span>
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
              <span>현재 노출량 지표 및 논문 연구 데이터를 종합 분석 중입니다...</span>
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
            placeholder="노출량 의미, 건강 영향, 위험도 평가나 저감 팁에 대해 질문하세요..."
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
              <span>전송</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
