import React, { useState, useEffect } from "react";
import { CreditCard, Check, Clock, ShieldCheck, Flame, ArrowRight, Zap } from "lucide-react";
import { motion } from "motion/react";

export default function Pricing({ onOpenCheckout }: { onOpenCheckout: () => void }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 41,
    seconds: 35
  });

  // Simple countdown ticker simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 2, minutes: 59, seconds: 59 }; // Reset to simulate ongoing scarcity
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const stackElements = [
    { name: "7-Day Live Meta Ads Masterclass", value: "₹8,000", free: false },
    { name: "Bonus 1: Certificate of Completion", value: "₹1,500", free: true },
    { name: "Bonus 2: Exclusive WhatsApp Community Access", value: "₹2,500", free: true },
    { name: "Bonus 3: 50+ AI Prompts for Content Creation", value: "₹3,000", free: true },
    { name: "Bonus 4: Lifetime Access to Session Recordings", value: "₹2,999", free: true },
    { name: "Bonus 5: PPTs, Notes & Learning Resources", value: "₹1,999", free: true }
  ];

  return (
    <section id="pricing" className="py-24 bg-zinc-950 text-white border-t border-zinc-900 relative">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-rose-950/20 via-zinc-950 to-zinc-950"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-flex items-center gap-1.5 px-35 py-1.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase font-mono">
            JOIN THE BEST BATCH NOW
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight">
            Special Launch Offer
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            One-time investment in a game-changing skill that will generate highly qualified leads for your business for years to come.
          </p>
        </div>

        {/* Pricing Stack Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Stack Breakdown - Left 7 cols */}
          <div className="lg:col-span-7 bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold font-display uppercase tracking-widest text-[#e21b22] mb-6">The Complete Value Stack</h3>
              
              <ul className="space-y-4">
                {stackElements.map((el, i) => (
                  <li key={i} className="flex items-center justify-between gap-4 text-xs sm:text-sm border-b border-zinc-800/60 pb-3">
                    <div className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-rose-500 shrink-0" />
                      <span className={el.free ? "text-zinc-300 font-medium" : "text-white font-bold"}>
                        {el.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500 line-through font-mono">{el.value}</span>
                      {el.free && <span className="text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px] uppercase font-mono">FREE</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 border-t border-zinc-800 mt-6 flex justify-between items-baseline flex-wrap gap-2">
              <span className="text-zinc-400 text-sm uppercase tracking-wider font-semibold">Total Cumulative Value:</span>
              <span className="text-zinc-500 text-lg line-through font-mono">₹19,498</span>
            </div>
          </div>

          {/* Pricing Box - Right 5 cols */}
          <div className="lg:col-span-5 bg-white text-zinc-950 border border-zinc-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative shadow-2xl overflow-hidden hover:scale-[1.01] transition-transform duration-300">
            {/* Red Accent pill */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#e21b22]"></div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-rose-50 border border-rose-100 text-[#e21b22] text-[10px] font-mono font-bold uppercase">
                  <Flame className="w-3.5 h-3.5 animate-pulse" /> LIMITED SEATS AVAILABLE
                </span>
                <h3 className="text-2xl font-display font-black text-zinc-900">AI Powered Meta Ads Masterclass</h3>
                <p className="text-xs text-zinc-400">Everything you need to master traffic & lead sales in 7 days</p>
              </div>

              {/* Price Tag */}
              <div className="py-4 border-y border-zinc-100 space-y-1 animate-pulse">
                <div className="flex items-baseline gap-2">
                  <span className="text-zinc-400 text-sm line-through font-mono">₹8,000</span>
                  <span className="text-4xl font-display font-extrabold text-[#e21b22]">₹4,999</span>
                  <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">Special Offer</span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Lock in your special masterclass enrollment rate today. Register below to claim your seats and bonuses instantly. 
                </p>
              </div>

              {/* Scarcity Countdown Interactive */}
              <div className="bg-zinc-50 rounded-2xl p-4.5 border border-zinc-200/50 space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span className="flex items-center gap-1 font-semibold"><Clock className="w-4 h-4 text-[#e21b22]" /> Offer Closes In:</span>
                  <span className="font-bold text-zinc-800 uppercase font-mono">LAST CHANCE RUN</span>
                </div>
                {/* Visual Time boxes */}
                <div className="grid grid-cols-3 gap-2.5 text-center pt-1 font-mono">
                  <div className="bg-zinc-900 text-white rounded-lg p-2">
                    <span className="text-lg font-bold block leading-none">{String(timeLeft.hours).padStart(2, "0")}</span>
                    <span className="text-[9px] uppercase text-zinc-400 font-semibold">Hours</span>
                  </div>
                  <div className="bg-zinc-900 text-white rounded-lg p-2">
                    <span className="text-lg font-bold block leading-none">{String(timeLeft.minutes).padStart(2, "0")}</span>
                    <span className="text-[9px] uppercase text-zinc-400 font-semibold">Mins</span>
                  </div>
                  <div className="bg-zinc-900 text-white rounded-lg p-2">
                    <span className="text-lg font-bold block leading-none text-rose-500">{String(timeLeft.seconds).padStart(2, "0")}</span>
                    <span className="text-[9px] uppercase text-zinc-400 font-semibold">Secs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enroll CTA */}
            <div className="space-y-4 pt-6 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenCheckout}
                className="w-full bg-[#e21b22] text-white font-bold text-base px-6 py-4 rounded-xl hover:bg-neutral-900 hover:text-white transition-colors flex items-center justify-center gap-2 shadow-lg shadow-rose-200 cursor-pointer"
              >
                Enroll Now for ₹4,999 <ArrowRight className="w-4.5 h-4.5" />
              </motion.button>

              <div className="flex items-center justify-center gap-2 text-xs text-zinc-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Risk Free Verification</span>
              </div>
            </div>
          </div>

        </div>

        {/* Trust Seal details */}
        <div className="max-w-4xl mx-auto bg-zinc-900/30 border border-zinc-800/50 p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-4 mt-16 text-center sm:text-left justify-between">
          <div className="space-y-1">
            <h4 className="text-white font-bold font-display text-sm">Need corporate custom quotes?</h4>
            <p className="text-zinc-400 text-xs">📞 Call / WhatsApp: +91 9600 60 65 70 | 🌐 Website: www.hexel1.in</p>
          </div>
          <a href="mailto:hexelone.dm@gmail.com" className="text-rose-400 hover:text-rose-300 text-xs font-bold font-mono uppercase bg-rose-500/5 px-4 py-2 rounded-lg border border-rose-500/20">
            CONTACT TEAM
          </a>
        </div>

      </div>
    </section>
  );
}
