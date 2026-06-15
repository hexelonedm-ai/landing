import React from "react";
import { Gift, CheckCircle2 } from "lucide-react";

export default function BonusStack() {
  const bonuses = [
    {
      id: "bonus-1",
      title: "50+ AI Ad Copy Prompts",
      emoji: "🤖",
      description: "Proven ChatGPT prompts to write high-converting ad copy in minutes."
    },
    {
      id: "bonus-2",
      title: "Ready-to-Use Campaign Templates",
      emoji: "📋",
      description: "Plug-and-play campaign structures for local businesses and service providers."
    },
    {
      id: "bonus-[#e21b22]-3",
      title: "WhatsApp Funnel Templates",
      emoji: "💬",
      description: "Pre-built message sequences to nurture leads from ad click to closed deal."
    },
    {
      id: "bonus-[#e21b22]-4",
      title: "Audience Research Framework",
      emoji: "🎯",
      description: "Step-by-step method to find and validate your ideal audience before spending a rupee."
    },
    {
      id: "bonus-[#e21b22]-5",
      title: "Lifetime Community Access",
      emoji: "🏆",
      description: "Join a growing community of business owners running ads — get feedback and support forever."
    },
    {
      id: "bonus-6",
      title: "Completion Certificate",
      emoji: "📜",
      description: "Official certificate to add to your LinkedIn profile and build credibility with clients."
    }
  ];

  return (
    <section id="bonuses" className="py-24 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#f95e16] uppercase block">
            EXCLUSIVE BONUSES
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-zinc-950 tracking-tight leading-tight uppercase">
            Bonuses Worth ₹25,000+ — <br className="hidden sm:inline" /> Yours Free
          </h2>
        </div>

        {/* Bonuses Cards Grid - styled to align exactly with mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bonuses.map((bonus) => (
            <div 
              key={bonus.id} 
              id={bonus.id}
              className="bg-[#fffbf9] border border-[#fddfd3] rounded-3xl p-6 sm:p-8 flex items-start gap-4 hover:shadow-md transition-all duration-300"
            >
              {/* Left Emoji */}
              <span className="text-3xl sm:text-4xl select-none shrink-0" role="img" aria-label={bonus.title}>
                {bonus.emoji}
              </span>

              {/* Right content info */}
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-display font-bold text-zinc-950 leading-tight">
                  {bonus.title}
                </h3>
                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                  {bonus.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Value Claim Statement */}
        <div className="mt-16 bg-[#fffbf9] border border-[#fddfd3] rounded-3xl p-6 text-center max-w-3xl mx-auto">
          <p className="text-zinc-800 text-sm sm:text-base font-semibold flex items-center justify-center gap-2.5 flex-wrap">
            <CheckCircle2 className="w-5 h-5 text-[#e21b22] shrink-0" />
            Total Extra Value Added: <span className="text-[#e21b22] font-black font-display text-lg">₹25,495</span> — Yours 100% free with the bootcamp today!
          </p>
        </div>

      </div>
    </section>
  );
}

