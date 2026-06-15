import React from "react";
import { Check, X, ShieldAlert, Sparkles, Zap } from "lucide-react";

export default function Transformation() {
  const points = [
    "Create high-converting Meta Ads",
    "Find the right audience",
    "Generate qualified leads consistently",
    "Build WhatsApp automation funnels",
    "Scale profitable campaigns confidently"
  ];

  const beforeItems = [
    "Guessing interests randomly inside Meta ads manager",
    "Writing dry ad texts that are ignored",
    "Waiting hours to manually call leads who already cooled off",
    "Wasting ₹10,000+ testing campaigns with zero leads",
    "Stressed and dependent on unresponsive marketing agencies"
  ];

  const afterItems = [
    "Surgical persona hunting using the Audience Research Framework",
    "AI copy mastery hooks tailored to your business model",
    "Automated instant WhatsApp conversation funnels that capture details in secs",
    "Scale only what is already profitable with secure templates",
    "100% control of your business leads, pipelines and scale"
  ];

  return (
    <section id="transformation" className="py-20 bg-white border-b border-zinc-100 relative">
      {/* Subtle decorations */}
      <div className="absolute left-0 bottom-4 w-60 h-60 bg-rose-50 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-[#e21b22] uppercase bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            THE TRANSFORMATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-zinc-950 tracking-tight">
            Imagine Having a Predictable Lead Generation System
          </h2>
          <p className="text-zinc-600 text-normal sm:text-base max-w-2xl mx-auto">
            This isn’t just a regular digital marketing course. It's an intensive 7-day tactical program built to move you from frustration to scaling profits.
          </p>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-12">
          
          {/* Before State */}
          <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-200/60 pb-4">
              <div className="p-2 bg-rose-50 text-rose-500 rounded-xl">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-zinc-800">Your Current Ad System</h3>
                <p className="text-xs text-zinc-500">Unpredictable expense & silent budget burn</p>
              </div>
            </div>

            <ul className="space-y-4">
              {beforeItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-600 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After State */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-3xl p-6 sm:p-8 space-y-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-950/20 via-transparent to-transparent"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 border-b border-zinc-800 pb-4 mb-6">
                <div className="p-2 bg-rose-600 text-white rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">The Hexel One Ads Framework</h3>
                  <p className="text-xs text-rose-400">Automated lead gen pipeline in 7 days</p>
                </div>
              </div>

              <ul className="space-y-4">
                {afterItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-200 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Bullet List Recap */}
        <div className="bg-rose-50/40 border border-rose-100 rounded-2xl p-6 mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="text-zinc-900 font-display font-bold text-lg flex items-center justify-center md:justify-start gap-2">
              <Zap className="w-5 h-5 text-rose-600" /> Start Converting Traffic Confidently
            </h4>
            <p className="text-zinc-600 text-xs sm:text-sm max-w-xl">
              You will leave this bootcamp with high-converting scripts, target profiles, and custom templates you can run immediately.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 text-xs font-mono font-bold text-rose-700 uppercase">
            <span>✓ Lifetime Access</span>
            <span className="w-1.5 h-1.5 bg-rose-300 rounded-full"></span>
            <span>✓ Daily Checklists</span>
          </div>
        </div>

      </div>
    </section>
  );
}
