import React from "react";
import { CheckCircle, ShieldAlert, Sparkles, TrendingUp, Users, Calendar, ArrowRight, Star } from "lucide-react";
import { motion } from "motion/react";

export default function Hero({ onOpenCheckout }: { onOpenCheckout: () => void }) {
  return (
    <header className="relative bg-zinc-950 text-white pt-24 pb-16 sm:pb-24 overflow-hidden border-b border-zinc-900">
      {/* Mesh Background Design */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-rose-950/30 via-zinc-950 to-zinc-950"></div>
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-500/30 to-transparent"></div>
      
      {/* Decorative floating grids */}
      <div className="absolute right-0 top-12 opacity-10 pointer-events-none select-none z-0 hidden lg:block">
        <svg width="400" height="400" fill="none" viewBox="0 0 400 400" className="text-white">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Urgent Live Bar */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-sm animate-pulse">
            <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
            Special Launch Price: Save 46% Today!
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Copy - Left 7 Cols */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-display font-extrabold tracking-tight leading-tight mt-4">
              AI Powered <br className="hidden sm:inline" />
              <span className="text-[#e21b22] bg-clip-text">Meta Ads Masterclass</span>
            </h1>

            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 font-sans tracking-wide">
              Generate More Leads, Sales & Customers Using AI + Meta Ads
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg font-sans max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              🚀 Learn how to create high-converting ad creatives, launch profitable Meta Ads campaigns, generate qualified leads, and build automated sales funnels using the latest AI tools.
            </p>

            <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl max-w-xl mx-auto lg:mx-0 text-left space-y-2">
              <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-black">7 Days Live Online Program</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#e21b22] shrink-0" />
                  <span>Interactive Sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#e21b22] shrink-0" />
                  <span>Tamil & English support</span>
                </li>
                <li className="flex items-center gap-2 col-span-1 sm:col-span-2">
                  <CheckCircle className="w-4 h-4 text-[#e21b22] shrink-0" />
                  <span>Practical Training with Real Business Campaigns</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenCheckout}
                className="w-full sm:w-auto bg-[#e21b22] text-white font-bold text-base px-8 py-4 rounded-xl hover:bg-neutral-100 hover:text-black transition-colors shadow-xl shadow-rose-900/20 flex items-center justify-center gap-3 group relative cursor-pointer"
              >
                Enroll Today for ₹4,999
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              
              <div className="text-zinc-400 text-xs text-left">
                <span className="line-through block sm:inline mr-2 text-zinc-500 text-sm">Regular Price: ₹8,000</span>
                <span className="text-emerald-400 font-bold font-mono">Save 37% Today!</span>
              </div>
            </div>

            {/* Social Proof Badges */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-6 text-zinc-400 text-xs border-t border-zinc-900">
              <div className="flex items-center gap-1 text-rose-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-rose-500 text-rose-500" />
                ))}
                <span className="text-white font-bold ml-1">4.9/5</span>
                <span className="text-zinc-500">(1,480+ reviews)</span>
              </div>
              <span className="hidden sm:inline h-4 w-px bg-zinc-800"></span>
              <div className="flex items-center gap-1.5 font-mono">
                <Users className="w-4 h-4 text-rose-500" />
                <span>BATCH LIMIT: 25 SEATS ONLY</span>
              </div>
            </div>
          </div>

          {/* Interactive UI Mockup Card - Right 5 Cols */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-rose-500/10 rounded-2xl blur-3xl -z-10"></div>
            
            {/* Elegant glass Card */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-rose-500 rounded-full inline-block"></span>
                  <span className="text-xs font-mono text-zinc-400 font-bold">META ADS MANAGER SIMULATION</span>
                </div>
                <span className="text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded px-2 py-0.5 font-bold">ACTIVE TEST RUN</span>
              </div>

              {/* Simulated Stats Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-950/80 p-3.5 rounded-lg border border-zinc-800/60 text-center">
                  <span className="text-[10px] uppercase text-zinc-400 block mb-1">Ad Reach</span>
                  <span className="text-xl font-display font-bold text-white">48,228</span>
                  <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-1 py-0.5 rounded ml-1 font-mono">+12.4%</span>
                </div>
                <div className="bg-zinc-950/80 p-3.5 rounded-lg border border-zinc-800/60 text-center">
                  <span className="text-[10px] uppercase text-zinc-400 block mb-1">Cost Per Lead (CPL)</span>
                  <span className="text-xl font-display font-bold text-emerald-400">₹64.20</span>
                  <span className="text-[10px] text-emerald-400 font-mono">-34% drops!</span>
                </div>
                <div className="bg-zinc-950/80 p-3.5 rounded-lg border border-zinc-800/60 text-center">
                  <span className="text-[10px] uppercase text-zinc-400 block mb-1">WhatsApp Opt-ins</span>
                  <span className="text-xl font-display font-bold text-rose-500">88.4%</span>
                  <span className="text-[10px] text-rose-400 font-mono">Automation</span>
                </div>
                <div className="bg-zinc-950/80 p-3.5 rounded-lg border border-zinc-800/60 text-center">
                  <span className="text-[10px] uppercase text-zinc-400 block mb-1">Conv. Rate</span>
                  <span className="text-xl font-display font-bold text-white">6.8%</span>
                  <span className="text-[10px] text-rose-500 font-bold font-mono">3x Average</span>
                </div>
              </div>

              {/* Live simulation banner */}
              <div className="space-y-3.5">
                <div className="bg-zinc-950/90 rounded-lg p-3 text-xs border border-zinc-800 flex items-start gap-2.5">
                  <Sparkles className="w-4.5 h-4.5 text-rose-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold text-zinc-200">AI Hook Hookmaster v2</p>
                    <p className="text-zinc-400">"Tired of burning budget on ads? Build self-operating WhatsApp funnels that generate client list on autopilot."</p>
                    <span className="text-[10px] text-rose-400 font-mono block">CTR: 4.85% (High Performing)</span>
                  </div>
                </div>

                <div className="bg-zinc-950 rounded-lg p-3 text-xs border border-zinc-800 space-y-2">
                  <div className="flex justify-between text-zinc-400 text-[10px]">
                    <span className="font-bold text-zinc-300">BOOTCAMP SEATS RESERVED</span>
                    <span className="font-bold text-rose-500">22 / 25 seats filled</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#e21b22] h-full rounded-full transition-all duration-1000" style={{ width: "88%" }}></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-rose-300 pt-1">
                    <span>Only 3 Seats Remaining!</span>
                    <span>Starting Soon</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 text-center">
                <span className="text-xs text-zinc-500 block">Course Certificate Included Upon Passing Day 7 Test</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
