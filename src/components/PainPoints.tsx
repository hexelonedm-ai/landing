import React from "react";
import { AlertCircle, HelpCircle, Ban, TrendingDown, RefreshCw, Landmark } from "lucide-react";

export default function PainPoints() {
  const challenges = [
    {
      id: "challenge-1",
      icon: <TrendingDown className="w-6 h-6 text-rose-600" />,
      title: "Burning Budget blindly?",
      description: "Spending money on Facebook & Instagram ads daily with absolutely no measurable sales, leaves, or trackable conversions."
    },
    {
      id: "challenge-2",
      icon: <HelpCircle className="w-6 h-6 text-rose-600" />,
      title: "Complexity Overwhelm?",
      description: "Overwhelmed by pixels, custom events, targeting hierarchies, and CBOs, leaving you unsure how ads actually work."
    },
    {
      id: "challenge-3",
      icon: <Landmark className="w-6 h-6 text-rose-600" />,
      title: "Agency Dependency?",
      description: "Depending on costly agencies or freelancers who keep you in the dark, without ever detailing campaign structures."
    },
    {
      id: "challenge-4",
      icon: <Ban className="w-6 h-6 text-rose-600" />,
      title: "Inconsistent Lead Flow?",
      description: "Struggling to find predictable, qualified clients daily, resulting in unpredictable cash flow month-after-month."
    }
  ];

  return (
    <section id="challenges" className="py-20 bg-zinc-50 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-[#e21b22] uppercase bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            THE HARD REALITY
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-zinc-950 tracking-tight">
            Are You Facing These Advertising Challenges?
          </h2>
          <p className="text-zinc-600 text-base sm:text-lg">
            Let’s be honest. Most business owners waste thousands on meta ads because they copy generic tutorials instead of applying a custom psychology framework.
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {challenges.map((item) => (
            <div 
              key={item.id} 
              id={item.id}
              className="bg-white border border-zinc-100 p-6 rounded-2xl shadow-sm hover:translate-y-[-4px] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-zinc-900 font-display">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Crucial Insight Callback */}
        <div className="mt-12 bg-zinc-950 text-white rounded-3xl p-8 lg:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-zinc-900 via-transparent to-transparent opacity-80"></div>
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs text-rose-400 font-mono font-bold uppercase">
              <AlertCircle className="w-4 h-4 text-rose-500" /> Why 90% of Facebook Ads Fail
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display">It's Not The Algorithm. It's Your Lead Leakage Funnel.</h3>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              When someone clicks your ad, sending them to a slow landing page or hoping they fill a contact form is a recipe for silent drop-offs. In 2026, you need to capture interest instantenously using <strong>AI Copywriting</strong> and bridge them straight to a fully-automated <strong>WhatsApp Conversation Funnel</strong>. 
            </p>
            <div className="pt-2 text-zinc-400 text-xs font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              You will learn how to plug these gaps on Day 5 & 7.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
