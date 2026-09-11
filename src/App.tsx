/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { 
  AlertTriangle, 
  Check, 
  Copy, 
  Droplet, 
  Flame, 
  Info, 
  Scale, 
  ShieldCheck, 
  Terminal, 
  Sparkles,
  RefreshCw,
  Coffee,
  Database,
  ArrowRight,
  TrendingUp,
  FileDown
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from "recharts";
import { motion, AnimatePresence } from "motion/react";
import { MP_CONCENTRATION, INITIAL_INTAKES, MICROPLASTIC_TIPS, PYTHON_STREAMLIT_CODE } from "./data";
import { FoodKey, ExposureResult } from "./types";
import { ExposureChatbot } from "./components/ExposureChatbot";

export default function App() {
  const [intakes, setIntakes] = useState(INITIAL_INTAKES);
  const [activeTab, setActiveTab] = useState<"calculator" | "streamlit">("calculator");
  const [copied, setCopied] = useState(false);

  // Reset to default values
  const handleReset = () => {
    setIntakes(INITIAL_INTAKES);
  };

  // Handle single value change
  const handleIntakeChange = (key: FoodKey, val: number) => {
    // Round to reasonable decimals based on step size
    const step = MP_CONCENTRATION[key].step;
    const roundedVal = Math.max(
      MP_CONCENTRATION[key].min,
      Math.min(MP_CONCENTRATION[key].max, Number(val.toFixed(step < 1 ? 3 : 1)))
    );
    setIntakes((prev) => ({
      ...prev,
      [key]: roundedVal,
    }));
  };

  // Calculate results
  const results = useMemo<ExposureResult[]>(() => {
    const calculated: ExposureResult[] = [];
    let totalExposure = 0;

    // Calculate individual exposures and total
    Object.keys(MP_CONCENTRATION).forEach((k) => {
      const key = k as FoodKey;
      const config = MP_CONCENTRATION[key];
      const intake = intakes[key];
      const exposure = config.value * intake;
      totalExposure += exposure;

      calculated.push({
        key,
        name_kr: config.name_kr,
        name_en: config.name_en,
        intake,
        unit: config.unit === "p/g" ? "g" : "L",
        concentration: config.value,
        concentrationUnit: config.unit,
        exposure,
        percentage: 0, // calculated later
      });
    });

    // Calculate percentages
    return calculated.map((item) => ({
      ...item,
      percentage: totalExposure > 0 ? (item.exposure / totalExposure) * 100 : 0,
    }));
  }, [intakes]);

  // Total exposure count
  const totalExposure = useMemo(() => {
    return results.reduce((sum, item) => sum + item.exposure, 0);
  }, [results]);

  // Find food with highest contribution
  const worstFood = useMemo(() => {
    if (totalExposure === 0) return null;
    return [...results].sort((a, b) => b.exposure - a.exposure)[0];
  }, [results, totalExposure]);

  // Copy Streamlit Python Code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(PYTHON_STREAMLIT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Equivalent to credit cards or objects
  // Researchers estimate a weekly intake of ~2,000 particles is about 5g of plastic (equivalent to 1 credit card weight).
  const plasticWeightMg = useMemo(() => {
    // Standard approximation: 1 particle = ~0.002 mg for educational illustration.
    return totalExposure * 0.002;
  }, [totalExposure]);

  const creditCardFraction = useMemo(() => {
    // 1 credit card is 5000 mg (5 grams)
    return plasticWeightMg / 5000;
  }, [plasticWeightMg]);

  // Chart data format
  const barChartData = useMemo(() => {
    return results
      .map((item) => ({
        name: item.name_en,
        name_kr: item.name_kr,
        exposure: Number(item.exposure.toFixed(2)),
        unit: item.unit,
        intake: item.intake,
        percentage: Number(item.percentage.toFixed(1)),
      }))
      .sort((a, b) => b.exposure - a.exposure);
  }, [results]);

  const pieChartData = useMemo(() => {
    return results
      .filter((item) => item.exposure > 0)
      .map((item) => ({
        name: item.name_en,
        name_kr: item.name_kr,
        value: Number(item.exposure.toFixed(2)),
        percentage: Number(item.percentage.toFixed(1)),
      }));
  }, [results]);

  // Custom Colors for foods
  const COLORS = {
    salt: "#6366f1", // Indigo
    fish_sauce: "#ec4899", // Pink
    salted_seafood: "#f43f5e", // Rose
    seaweed: "#10b981", // Emerald
    honey: "#f59e0b", // Amber
    soy_sauce: "#8b5cf6", // Violet
    beer: "#ef4444", // Red
    beverage: "#06b6d4" // Cyan
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased">
      {/* Header Banner */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl" id="logo-icon">⚠️</span>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-slate-800 tracking-tight font-display">
                Weekly Microplastics Exposure Calculator
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                Dietary Exposure Assessment Dashboard based on Academic Research
              </p>
            </div>
          </div>

          {/* Navigation Tab Buttons */}
          <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
            <button
              id="tab-calculator"
              onClick={() => setActiveTab("calculator")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                activeTab === "calculator"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Exposure Calculator
            </button>
            <button
              id="tab-streamlit"
              onClick={() => setActiveTab("streamlit")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                activeTab === "streamlit"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Streamlit Python Code
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Bento Page Title Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div className="space-y-1.5">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-extrabold rounded-full uppercase tracking-widest inline-block">
              Environmental Health Tracker
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-850 tracking-tight font-display flex items-center gap-2">
              ⚠️ Weekly Dietary Microplastics Calculator
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
              Track and evaluate microplastic particle ingestion from regular processed food products and staples in your weekly diet.
            </p>
          </div>
          <div className="text-right text-slate-400 text-xs italic font-medium bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200/60 self-stretch md:self-auto flex items-center justify-center">
            Data Model: MP_CONCENTRATION Standards (Pham et al., 2023)
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "calculator" ? (
            <motion.div
              key="calc-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Left Column: Bento Inputs Grid */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-slate-100/50 rounded-3xl p-6 border border-slate-200/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2 font-display">
                        <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                        Weekly Dietary Intake Settings
                      </h3>
                      <p className="text-xs text-slate-500">
                        Adjust your consumption for 8 staple categories (check grams vs. liters)
                      </p>
                    </div>
                    <button
                      id="btn-reset-inputs"
                      onClick={handleReset}
                      className="text-xs text-slate-600 hover:text-indigo-600 flex items-center gap-1 border border-slate-200 bg-white px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs font-semibold cursor-pointer"
                      title="Reset to default baseline"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Reset
                    </button>
                  </div>

                  {/* Bento Grid layout for 8 foods */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(Object.keys(MP_CONCENTRATION) as FoodKey[]).map((key) => {
                      const food = MP_CONCENTRATION[key];
                      const val = intakes[key];
                      const isSolid = food.unit === "p/g";
                      
                      // Emojis mapping
                      const EMOJIS: Record<FoodKey, string> = {
                        salt: "🧂",
                        fish_sauce: "🐟",
                        salted_seafood: "🦐",
                        seaweed: "🌿",
                        honey: "🍯",
                        soy_sauce: "🧴",
                        beer: "🍺",
                        beverage: "🥤"
                      };

                      return (
                        <div 
                          key={key} 
                          id={`input-group-${key}`} 
                          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between hover:shadow-xs hover:border-slate-300 transition-all duration-200 space-y-3"
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-extrabold flex items-center gap-1.5 text-slate-800">
                              <span className="text-base">{EMOJIS[key]}</span>
                              {food.name_en}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                              {food.value} {food.unit}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-400 leading-tight min-h-[32px]">{food.description_en}</p>
                          
                          {/* Slider control with custom styles */}
                          <div className="space-y-1">
                            <input
                              type="range"
                              id={`slider-${key}`}
                              min={food.min}
                              max={food.max}
                              step={food.step}
                              value={val}
                              onChange={(e) => handleIntakeChange(key, parseFloat(e.target.value))}
                              className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
                            />
                            <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                              <span>{food.min} {isSolid ? "g" : "L"}</span>
                              <span>{food.max} {isSolid ? "g" : "L"}</span>
                            </div>
                          </div>

                          {/* Manual Input Container */}
                          <div className="flex items-center justify-between bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-150">
                            <input
                              type="number"
                              id={`input-${key}`}
                              value={val}
                              onChange={(e) => handleIntakeChange(key, parseFloat(e.target.value) || 0)}
                              min={food.min}
                              max={food.max}
                              step={food.step}
                              className="w-full bg-transparent text-right font-bold text-slate-800 text-xs focus:outline-none focus:ring-0"
                            />
                            <span className="text-slate-500 text-[10px] font-bold pl-2 shrink-0">
                              {isSolid ? "Grams (g)" : "Liters (L)"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Bento Results Section */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Main Metric Card - Premium Dark Bento Theme */}
                <div id="results-hero-card" className="bg-slate-900 text-white p-8 rounded-3xl flex flex-col items-center justify-center space-y-5 shadow-xl relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-5 pointer-events-none">
                    <Scale className="w-64 h-64" />
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

                  <span className="px-3 py-1 bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[10px] font-black rounded-full uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    Total Weekly Microplastic Ingestion
                  </span>

                  <div className="flex flex-col items-center text-center">
                    <span id="metric-total-exposure" className="text-6xl sm:text-7xl font-black text-amber-400 tracking-tight font-display">
                      {totalExposure.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                    </span>
                    <span className="text-base font-bold text-slate-400 tracking-wider mt-2">particles / week</span>
                  </div>

                  <p className="text-center text-slate-400 text-xs leading-relaxed max-w-sm">
                    Estimated total count of microplastic particles ingested weekly through the 8 staple food categories.
                  </p>

                  {/* Equivalent metrics comparison */}
                  <div className="w-full grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                    <div className="text-center border-r border-slate-800/80 pr-2">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Estimated Mass</span>
                      <span className="text-sm font-black text-slate-200 block mt-0.5">
                        ~{plasticWeightMg.toFixed(2)} mg
                      </span>
                    </div>
                    <div className="text-center pl-2">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Credit Card Eq.</span>
                      <span className="text-sm font-black text-amber-400 block mt-0.5">
                        ~{(creditCardFraction * 52).toFixed(2)} cards / yr
                      </span>
                    </div>
                  </div>

                  {/* Diagnosis message */}
                  <div className="w-full mt-2 p-3 bg-slate-800/80 rounded-xl border border-slate-750 flex items-start space-x-3 text-left">
                    <div className="p-1.5 bg-amber-500/15 text-amber-400 rounded-lg shrink-0">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-[11px] space-y-1">
                      <p className="font-bold text-slate-200">
                        {totalExposure === 0 ? (
                          "Adjust food intake sliders to view your exposure breakdown."
                        ) : worstFood ? (
                          `Top contributing category: [${worstFood.name_en}]`
                        ) : (
                          "Dietary intake calculated within baseline."
                        )}
                      </p>
                      {totalExposure > 0 && worstFood && (
                        <p className="text-slate-400 leading-normal">
                          {worstFood.name_en} accounts for <strong>{worstFood.percentage.toFixed(1)}%</strong> of your total weekly microplastic intake.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Visualization Card - White Bento Layout */}
                <div id="visual-chart-card" className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-4">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-extrabold text-slate-800 font-display">
                      📊 Exposure by Food Category
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Breakdown of primary microplastic exposure vectors
                    </p>
                  </div>

                  {totalExposure === 0 ? (
                    <div className="h-48 flex flex-col items-center justify-center text-center p-4">
                      <Coffee className="w-6 h-6 text-slate-300 mb-1.5" />
                      <p className="text-xs font-bold text-slate-400">
                        No intake data entered yet
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Top 4 Custom Mini Bar representation for pristine bento layout feel */}
                      <div className="space-y-2.5">
                        {barChartData.slice(0, 4).map((entry) => {
                          const foodEntry = results.find(r => r.name_en === entry.name);
                          const color = foodEntry ? COLORS[foodEntry.key] : "#f59e0b";
                          return (
                            <div key={entry.name} className="space-y-1">
                              <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-700 flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></span>
                                  {entry.name}
                                </span>
                                <span className="font-mono text-slate-500">{entry.exposure.toFixed(1)} p ({entry.percentage}%)</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div 
                                  className="h-full rounded-full transition-all duration-500" 
                                  style={{ width: `${entry.percentage}%`, backgroundColor: color }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Toggle Expander for Charts Visualization */}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="h-44 w-full text-xs">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={barChartData}
                              margin={{ top: 5, right: 5, left: -25, bottom: 5 }}
                            >
                              <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 9 }} />
                              <YAxis tick={{ fill: "#64748b", fontSize: 9 }} />
                              <Tooltip
                                contentStyle={{ backgroundColor: "#0f172a", borderRadius: "8px", border: "none", color: "#fff", fontSize: "11px" }}
                                formatter={(value: any, name: any, props: any) => [
                                  `${value} particles (${props.payload.percentage}%)`,
                                  `Exposure`
                                ]}
                              />
                              <Bar dataKey="exposure" radius={[3, 3, 0, 0]}>
                                {barChartData.map((entry, index) => {
                                  const foodEntry = results.find(r => r.name_en === entry.name);
                                  const color = foodEntry ? COLORS[foodEntry.key] : "#6366f1";
                                  return <Cell key={`cell-${index}`} fill={color} />;
                                })}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          ) : (
            <motion.div
              key="streamlit-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6 max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 gap-4">
                  <div>
                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 font-display">
                      <Terminal className="w-5 h-5 text-indigo-600" />
                      Export Streamlit Python MVP Code
                    </h2>
                    <p className="text-xs text-slate-500">
                      Standalone, runnable Python script ready for local execution or Streamlit Cloud deployment.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      id="btn-copy-code"
                      onClick={handleCopyCode}
                      className="px-3 py-1.5 text-xs font-semibold rounded-md border border-slate-200 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Python Code
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-indigo-50/60 rounded-xl p-4 border border-indigo-100 text-xs text-indigo-950 space-y-2">
                  <p className="font-bold flex items-center gap-1.5 text-indigo-900">
                    <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                    💻 Quick Start Instructions
                  </p>
                  <ol className="list-decimal pl-5 space-y-1 text-[11px] text-indigo-900/80 leading-relaxed font-mono">
                    <li>Install required packages: <span className="bg-indigo-100/80 px-1 py-0.5 rounded font-bold">pip install streamlit pandas matplotlib</span></li>
                    <li>Save the code below as <span className="bg-indigo-100/80 px-1 py-0.5 rounded font-bold">app.py</span></li>
                    <li>Run in terminal: <span className="bg-indigo-100/80 px-1 py-0.5 rounded font-bold">streamlit run app.py</span></li>
                  </ol>
                </div>

                {/* Code Window */}
                <div className="relative rounded-xl overflow-hidden bg-slate-900 text-slate-100 border border-slate-800 shadow-md">
                  <div className="bg-slate-950 px-4 py-2 flex items-center justify-between border-b border-slate-800 text-[11px] text-slate-400 font-mono">
                    <span>app.py (Streamlit MVP Code)</span>
                    <span className="text-[9px] bg-indigo-950 text-indigo-300 border border-indigo-900/40 px-1.5 py-0.5 rounded">Python</span>
                  </div>
                  <pre className="p-4 overflow-x-auto text-[11px] leading-relaxed font-mono text-indigo-100 max-h-[500px]">
                    <code>{PYTHON_STREAMLIT_CODE}</code>
                  </pre>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {activeTab === "calculator" && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Detailed table card - White Bento Style */}
            <div id="data-table-card" className="md:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 font-display">
                  📝 Detailed Intake & Exposure Data Table
                </h3>
                <p className="text-[11px] text-slate-400">
                  Exact exposure quantification derived from food concentrations and your reported dietary intake
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-100">
                <table className="min-w-full divide-y divide-slate-100 text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[9px]">
                    <tr>
                      <th className="px-4 py-3">Food Group</th>
                      <th className="px-4 py-3 text-right">Concentration</th>
                      <th className="px-4 py-3 text-right">Weekly Intake</th>
                      <th className="px-4 py-3 text-right">Weekly Exposure (p/w)</th>
                      <th className="px-4 py-3 text-right">Share (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {results.map((item) => {
                      const rowColor = COLORS[item.key];
                      return (
                        <tr key={item.key} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 py-3 flex items-center space-x-2">
                            <span className="w-1.5 h-3 rounded-xs shrink-0" style={{ backgroundColor: rowColor }}></span>
                            <span className="font-extrabold text-slate-800">{item.name_en}</span>
                          </td>
                          <td className="px-4 py-3 text-right text-slate-400 font-mono text-[10px]">
                            {item.concentration} {item.concentrationUnit}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-slate-900">
                            {item.intake} <span className="text-slate-400 font-normal text-[10px]">{item.unit}</span>
                          </td>
                          <td className="px-4 py-3 text-right font-mono font-bold text-amber-600">
                            {item.exposure.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-right font-mono text-slate-400 text-[10px]">
                            {item.percentage.toFixed(1)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommendations - Emerald Bento Card */}
            <div id="education-tips-card" className="md:col-span-5 bg-emerald-50/40 border border-emerald-150 rounded-3xl p-6 space-y-4">
              <div className="flex items-center space-x-2 text-emerald-900">
                <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600" />
                <h3 className="text-sm font-extrabold font-display">
                  💡 Daily Microplastic Reduction Tips
                </h3>
              </div>

              <div className="space-y-3">
                {MICROPLASTIC_TIPS.map((tip, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4 border border-emerald-100/50 shadow-2xs space-y-1">
                    <h4 className="text-[11px] font-extrabold text-emerald-950 flex items-center gap-1.5">
                      <span className="w-4 h-4 bg-emerald-100 text-emerald-700 text-[10px] font-mono rounded-full flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      {tip.title_en}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-5">
                      {tip.desc_en}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Exposure Explainer Chatbot */}
            <div className="col-span-1 md:col-span-12">
              <ExposureChatbot
                totalExposure={totalExposure}
                plasticWeightMg={plasticWeightMg}
                creditCardFraction={creditCardFraction}
                worstFood={worstFood}
                results={results}
              />
            </div>

          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-10 mt-12 text-center text-xs text-slate-400 space-y-4">
        <div className="max-w-3xl mx-auto px-4 bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left space-y-3">
          <p className="font-extrabold text-slate-700 text-xs flex items-center gap-1.5 font-display">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            📖 Scientific Academic Reference
          </p>
          <div className="space-y-1.5 pl-3.5 border-l-2 border-indigo-300">
            <p className="font-bold text-slate-800 leading-normal text-xs sm:text-sm font-display">
              "Analysis of microplastics in various foods and assessment of aggregate human exposure via food consumption in Korea"
            </p>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Dat Thanh Pham, <span className="text-indigo-600 font-bold">Jinwoo Kim</span>, Sang-Hwa Lee, Juyang Kim, Dowoon Kim, Soonki Hong, Jaehak Jung, Jung-Hwan Kwon
            </p>
            <p className="text-slate-400 text-[10px] font-mono">
              Environmental Pollution 322 (2023) 121153 | DOI:{" "}
              <a
                href="https://doi.org/10.1016/j.envpol.2023.121153"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:underline inline-flex items-center gap-0.5 font-bold"
              >
                10.1016/j.envpol.2023.121153
                <ArrowRight className="w-2.5 h-2.5 inline" />
              </a>
            </p>
          </div>
          <p className="text-[11px] text-slate-500 leading-normal pl-3.5">
            💡 This calculator simulator is built upon empirical contamination datasets (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-600 text-[10px]">MP_CONCENTRATION</code>) and exposure assessment formulas published by the research team above.
          </p>
        </div>

        <div className="space-y-1 pt-2">
          <p className="font-bold text-slate-600">⚠️ Weekly Microplastics Exposure Calculator MVP</p>
          <p>Designed for environmental health awareness, food safety education, and dietary exposure assessment.</p>
        </div>
        
        <div className="flex items-center justify-center space-x-1 bg-slate-100 w-fit mx-auto px-2 py-1 rounded text-[10px] text-slate-500 border border-slate-200/50">
          <Database className="w-3 h-3" />
          <span>Bento Grid Theme Enabled | Secure Offline-Ready Application</span>
        </div>
      </footer>
    </div>
  );
}
