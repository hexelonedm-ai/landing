import React from "react";
import { Star, ArrowRight, Quote, Sparkles, TrendingUp } from "lucide-react";

export default function Testimonials() {
  const stories = [
    {
      id: "story-1",
      name: "Amit Jadav",
      role: "Founder, Jadav Home Decor",
      niche: "E-commerce & Retail",
      before: "CPL was ₹280, making e-com sales negative.",
      after: "CPL dropped to ₹84. AI-tailored hooks increased CTR by 2.5x.",
      metric: "₹4.8 Lakhs in Sales",
      rating: 5,
      achievement: "3.5x ROAS Growth",
      comment: "The Audience Research Framework from Day 3 completely changed how I find buyers online. No more throwing budget at generic interests!"
    },
    {
      id: "story-2",
      name: "Dr. Neha Sharma",
      role: "Lead Dentist, Align Smile Clinic",
      niche: "Local Service Clinic",
      before: "Paying ₹12,000/mo to a lazy marketing agency with zero bookings.",
      after: "Launched automated local campaigns. Direct WhatsApp messages booked 14 patients in week 1.",
      metric: "14 High-Value Bookings",
      rating: 5,
      achievement: "Zero Agency Costs",
      comment: "I absolute recommend this for local clinics. Setting up a WhatsApp funnel stopped lead drop-offs. People book appointments directly inside our app."
    },
    {
      id: "story-3",
      name: "Rajesh Singhania",
      role: "Real Estate Consultant, Apex Estates",
      niche: "High-Ticket Real Estate",
      before: "Struggling with fake numbers on generic Meta lead forms.",
      after: "Applying the pre-qualification Lead Form layout from Day 5.",
      metric: "88 Cr Lead Pipeline",
      rating: 5,
      achievement: "94% Verified Numbers",
      comment: "Day 5 pre-qualification systems filter out spam completely. I only dial developers or buyers who are verified & answered our questions."
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-[#e21b22] uppercase bg-rose-50 px-3 py-1 rounded-full border border-rose-100 inline-block">
            STUDENT SUCCESS STORIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-zinc-950 tracking-tight">
            Proven Results From Real Graduates
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base max-w-xl mx-auto">
            From local family clinics to scaled e-commerce brands—hear how our students transformed their marketing pipelines with our 7-day system.
          </p>
        </div>

        {/* Testimonials Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {stories.map((story) => (
            <div 
              key={story.id} 
              id={story.id}
              className="bg-zinc-50 border border-zinc-150 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              {/* Highlight bubble */}
              <div className="absolute top-4 right-4 bg-[#e21b22]/10 text-[#e21b22] text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-rose-400/20 uppercase">
                {story.achievement}
              </div>

              <div className="space-y-6">
                {/* Stars & Niche */}
                <div className="space-y-1">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-xs text-zinc-400 font-mono font-bold block uppercase">{story.niche}</span>
                </div>

                {/* Main Quote comment */}
                <p className="text-zinc-700 text-sm italic relative leading-relaxed font-medium">
                  "{story.comment}"
                </p>

                {/* Before vs After Table */}
                <div className="bg-white rounded-2xl p-4 border border-zinc-100 space-y-2.5 text-xs">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider text-[9px] shrink-0">Before:</span>
                    <span className="text-zinc-500 text-right font-medium">{story.before}</span>
                  </div>
                  <div className="h-px bg-zinc-100"></div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-[#e21b22] font-bold uppercase tracking-wider text-[9px] shrink-0">After Hexel:</span>
                    <span className="text-zinc-900 font-bold text-right">{story.after}</span>
                  </div>
                </div>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-zinc-200/60 flex justify-between items-center">
                <div>
                  <h4 className="font-display font-bold text-sm text-zinc-900">{story.name}</h4>
                  <p className="text-[11px] text-zinc-400">{story.role}</p>
                </div>
                
                <div className="text-right">
                  <span className="text-emerald-600 font-display font-black text-sm block">{story.metric}</span>
                  <span className="text-[9px] font-mono uppercase text-zinc-400 font-bold block">verified growth</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA callback note */}
        <div className="mt-12 text-center text-xs sm:text-sm text-zinc-500 font-mono flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-rose-500 animate-pulse" />
          <span>Results vary by industry, but we help you customize your target framework for optimal returns.</span>
        </div>

      </div>
    </section>
  );
}
