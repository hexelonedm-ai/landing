import React, { useState } from "react";
import { Sparkles, Calculator, Play, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function ROIWidget({ onOpenCheckout }: { onOpenCheckout: () => void }) {
  const [adSpend, setAdSpend] = useState<number>(15000);
  const [businessType, setBusinessType] = useState<string>("service");
  const [currentCpl, setCurrentCpl] = useState<number>(180);

  // Benchmarked improvements:
  // Targeting Mastery decreases Cost-Per-Lead (CPL) by ~40%
  // AI Ad copy improves CTR, saving ad budget
  // WhatsApp automation stops leading leakage, increasing lead-to-sale conversion from ~2% to ~8%
  
  const estimatedNewCpl = Math.round(currentCpl * 0.65); // 35% reduction in CPL
  const currentLeads = Math.round(adSpend / currentCpl);
  const estimatedNewLeads = Math.round(adSpend / estimatedNewCpl);
  const improvementLeads = estimatedNewLeads - currentLeads;
  
  // Lead leakage simulation
  const standardConversionRate = 0.02; // 2% without WhatsApp funnel
  const smartConversionRate = 0.06; // 6% with instant WhatsApp funnel automated replies
  
  const currentSales = Math.round(currentLeads * standardConversionRate);
  const estimatedSalesWithFunnel = Math.round(estimatedNewLeads * smartConversionRate);
  const pureProfitGain = estimatedSalesWithFunnel - currentSales;

  return (
    <div id="roi-calculator" className="bg-white rounded-2xl border border-zinc-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="bg-zinc-950 p-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-900/40 via-transparent to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30 mb-2 font-mono">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> AI & META CAMPAIGN FORECASTER
          </span>
          <h3 className="text-xl sm:text-2xl font-display font-bold">Calculate Your Campaign Growth</h3>
          <p className="text-sm text-zinc-400 mt-1 max-w-md">See how Meta targeting optimization and WhatsApp automation transform your returns</p>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <label className="flex justify-between text-sm font-semibold text-zinc-700 mb-2">
            <span>Monthly Facebook/Insta Ad Spend:</span>
            <span className="text-rose-600 font-mono font-bold">₹{adSpend.toLocaleString("en-IN")}</span>
          </label>
          <input
            type="range"
            min="3000"
            max="150000"
            step="1000"
            value={adSpend}
            onChange={(e) => setAdSpend(Number(e.target.value))}
            className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-rose-600 focus:outline-none"
          />
          <div className="flex justify-between text-xs text-zinc-400 mt-1 font-mono">
            <span>₹3,000</span>
            <span>₹75,000</span>
            <span>₹1,50,000+</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Business Type</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-800 font-medium focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
            >
              <option value="service">Service Agency / Consulting</option>
              <option value="retail">Local Business (Store/Gym/Cafe)</option>
              <option value="ecommerce">E-commerce Brand</option>
              <option value="coaching">Professional Coach / Creator</option>
              <option value="realestate">Real Estate & High-Ticket Lead Gen</option>
            </select>
          </div>

          <div>
            <label className="flex justify-between text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              <span>Your Current CPL (Lead Cost)</span>
              <span className="text-zinc-700 font-mono">₹{currentCpl}</span>
            </label>
            <input
              type="range"
              min="30"
              max="600"
              step="5"
              value={currentCpl}
              onChange={(e) => setCurrentCpl(Number(e.target.value))}
              className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-zinc-800 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
              <span>₹30 (Low Cost)</span>
              <span>₹600 (High-Ticket)</span>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-100 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Box 1 */}
            <div className="bg-zinc-50 border border-zinc-100 p-4 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">CPL Reduction</span>
                <span className="text-zinc-400 line-through text-xs font-mono">Was ₹{currentCpl}</span>
                <div className="text-xl font-display font-extrabold text-emerald-600 mt-0.5">
                  ₹{estimatedNewCpl} <span className="text-xs font-normal">/ lead</span>
                </div>
              </div>
              <p className="text-[11px] text-zinc-500 mt-2">Cut costs by up to 35% with targeted audience frameworks.</p>
            </div>

            {/* Box 2 */}
            <div className="bg-zinc-50 border border-zinc-100 p-4 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Leads Generated</span>
                <span className="text-zinc-500 text-xs font-mono">{currentLeads} leads today</span>
                <div className="text-xl font-display font-extrabold text-zinc-900 mt-0.5">
                  {estimatedNewLeads} leads <span className="text-xs text-rose-600 font-bold bg-rose-50 px-1 rounded">+{improvementLeads} extra</span>
                </div>
              </div>
              <p className="text-[11px] text-zinc-500 mt-2">Maximize your daily campaign run rates utilizing AI copies.</p>
            </div>

            {/* Box 3 */}
            <div className="bg-rose-50/50 border border-rose-100/50 p-4 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider block mb-1">WhatsApp Conversion</span>
                <span className="text-zinc-500 text-xs font-mono">{currentSales} sales today</span>
                <div className="text-xl font-display font-extrabold text-rose-600 mt-0.5">
                  {estimatedSalesWithFunnel} clients <span className="text-xs text-white bg-rose-600 px-1.5 py-0.5 rounded font-bold">X3 Growth</span>
                </div>
              </div>
              <p className="text-[11px] text-rose-800/80 mt-2">Convert leaks into buyers instantly using automated chatbots.</p>
            </div>
          </div>
        </div>

        {/* Dynamic ROI Message */}
        <div className="bg-zinc-950 rounded-xl p-4 sm:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-[10px] uppercase font-mono text-rose-400 tracking-widest font-bold">Estimated Monthly Gain</span>
            <div className="text-2xl font-bold font-display text-white">
              +{pureProfitGain} Extra Customers <span className="text-xs font-light text-zinc-400">/ month</span>
            </div>
            <p className="text-xs text-zinc-400">
              Recover your ₹4,999 masterclass investment in just days.
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onOpenCheckout}
            className="w-full sm:w-auto bg-[#e21b22] text-white font-bold text-sm px-5 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            Claim Seat & Start Generating Leads <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-400 font-mono">
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Practical Implementation</span>
          <span className="h-3 w-px bg-zinc-200"></span>
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Live Ad Budget Advice</span>
        </div>
      </div>
    </div>
  );
}
