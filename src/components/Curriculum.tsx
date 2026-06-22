import React, { useState } from "react";
import { ChevronDown, Calendar, Award, BookOpen, Clock, Settings, Users, Sparkles, MessageSquare, Zap, Target } from "lucide-react";

export default function Curriculum() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [expandedModule, setExpandedModule] = useState<number | null>(1);

  const modules = [
    {
      day: 1,
      title: "AI-Powered Creative Creation",
      subtitle: "Day 1 Agenda",
      icon: <Sparkles className="w-5 h-5 text-rose-500" />,
      tagline: "Learn to produce high-converting ad creative scripts and assets in seconds using AI engines.",
      bullets: [
        "Ad Copy Creation",
        "Text-to-Image Generation",
        "Text-to-Video Creation",
        "Reel Script Writing"
      ],
      deliverable: "AI copy generator framework + 10x Hooks Swipe File"
    },
    {
      day: 2,
      title: "Meta Ecosystem Setup",
      subtitle: "Day 2 Agenda",
      icon: <Settings className="w-5 h-5 text-rose-500" />,
      tagline: "Avoid restricted accounts. Setup your business assets securely inside Meta Business Suite.",
      bullets: [
        "Facebook Page Setup",
        "Ad Account Setup",
        "Instagram Integration",
        "WhatsApp Integration"
      ],
      deliverable: "Meta Ecosystem Integration checklist & restriction preventer map"
    },
    {
      day: 3,
      title: "Launch Your First Ads",
      subtitle: "Day 3 Agenda",
      icon: <BookOpen className="w-5 h-5 text-rose-500" />,
      tagline: "Build a structured model inside Ads Manager from draft to published campaign.",
      bullets: [
        "Campaign Objectives",
        "Audience Research",
        "Interest Targeting",
        "Budget Allocation"
      ],
      deliverable: "Campaign Budget Optimization (CBO) template & targeting worksheet"
    },
    {
      day: 4,
      title: "Generate Calls & Leads",
      subtitle: "Day 4 Agenda",
      icon: <Users className="w-5 h-5 text-rose-500" />,
      tagline: "Construct call funnels and lead forms that screen out tire-kickers and low-intent clicks.",
      bullets: [
        "Call Campaigns",
        "Instant Forms",
        "Lead Qualification",
        "Follow-Up Strategy"
      ],
      deliverable: "Pre-qualified Lead Forms Swipe File"
    },
    {
      day: 5,
      title: "Track Performance & Scale",
      subtitle: "Day 5 Agenda",
      icon: <Zap className="w-5 h-5 text-rose-500" />,
      tagline: "Master scaling budgets safely without degrading your lead quality or ROI.",
      bullets: [
        "ROAS Optimization",
        "Industry Benchmarks",
        "Campaign Optimization",
        "Scaling Strategies"
      ],
      deliverable: "Standard Performance KPIs sheet & Auto-scaling rulebook"
    },
    {
      day: 6,
      title: "Meta Pixel & Retargeting",
      subtitle: "Day 6 Agenda",
      icon: <Target className="w-5 h-5 text-rose-500" />,
      tagline: "Generate lookalikes and customized custom audiences to target active buyers.",
      bullets: [
        "Meta Pixel Setup",
        "Event Tracking",
        "Conversion Tracking",
        "Custom Audiences",
        "Lookalike Audiences",
        "Retargeting Campaigns"
      ],
      deliverable: "Conversion tracking event guide & active retargeting blueprints"
    },
    {
      day: 7,
      title: "Funnels & Real-Time Optimization",
      subtitle: "Day 7 Agenda",
      icon: <MessageSquare className="w-5 h-5 text-rose-500" />,
      tagline: "Integrate high-converting lead/sales landing pages for real-time customer acquisition.",
      bullets: [
        "Lead Funnels",
        "Sales Funnels",
        "Landing Pages",
        "Conversion Optimization"
      ],
      deliverable: "Plug-and-play landing page frame + live deployment funnel setup"
    }
  ];

  const handleToggle = (day: number) => {
    setExpandedModule(expandedModule === day ? null : day);
  };

  return (
    <section id="curriculum" className="py-20 bg-zinc-50 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-[#e21b22] uppercase bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            THE CURRICULUM
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-zinc-950 tracking-tight">
            What You'll Learn in 7 Days
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base max-w-xl mx-auto">
            A practical, day-by-day implementation program where you build a real, high-converting Meta campaign alongside us.
          </p>
        </div>

        {/* Tab & Mobile view */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Day Picker Tabs (Left 4 cols, hidden/inactive on simple/smaller view, great for desktop desktop-first) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col space-y-2">
            <span className="text-xs font-mono uppercase font-bold text-zinc-400 tracking-wider pl-4 mb-2">DAY-WISE SYLLABUS</span>
            {modules.map((m) => (
              <button
                key={m.day}
                onClick={() => {
                  setActiveTab(m.day);
                  setExpandedModule(m.day);
                }}
                className={`flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-xl transition-all border outline-none cursor-pointer ${
                  activeTab === m.day
                    ? "bg-[#e21b22] text-white border-rose-500 shadow-md font-bold"
                    : "bg-white text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 border-zinc-200/60 font-medium"
                }`}
              >
                <span className={`text-xs font-mono px-2 py-0.5 rounded font-bold ${activeTab === m.day ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-500"}`}>
                  Day {m.day}
                </span>
                <span className="text-sm truncate">{m.title}</span>
              </button>
            ))}
          </div>

          {/* Module detail view (Right 8 cols, or standard full list layout on mobile) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Desktop detailed View of active tab, else lists all as accordion expandables */}
            <div className="space-y-4">
              {modules.map((m) => {
                const isOpen = expandedModule === m.day;
                
                return (
                  <div 
                    key={m.day} 
                    id={`module-${m.day}`}
                    className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                      isOpen ? "border-rose-400 shadow-md" : "border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    {/* Header trigger */}
                    <button
                      onClick={() => handleToggle(m.day)}
                      className="w-full flex items-center justify-between p-5 text-left font-display cursor-pointer outline-none select-none"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="flex-none text-xs font-mono font-bold px-2.5 py-1 bg-zinc-100 text-zinc-800 rounded-lg">
                          DAY {m.day}
                        </span>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-zinc-900">{m.title}</h3>
                          <span className="text-xs text-rose-500 font-mono font-semibold block sm:hidden">Click to expand curriculum agenda</span>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-rose-500" : ""}`} />
                    </button>

                    {/* Expandable item body */}
                    <div 
                      className={`transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-[800px] border-t border-zinc-100" : "max-h-0 opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="p-6 space-y-5 bg-zinc-50/50">
                        <p className="text-sm text-zinc-600 font-medium italic">
                          " {m.tagline} "
                        </p>

                        <div className="space-y-2.5">
                          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest font-mono">What we will cover together:</h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {m.bullets.map((bullet, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-zinc-700">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Deliverable tag */}
                        <div className="bg-rose-50/50 border border-rose-100/30 rounded-xl p-3.5 flex items-center gap-3 mt-4">
                          <div className="p-2 bg-rose-500 text-white rounded-lg shrink-0">
                            <Award className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono font-bold text-rose-600 uppercase block">Day {m.day} Action Bonus Checklist:</span>
                            <span className="text-xs text-zinc-800 font-bold block">{m.deliverable}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Certificate Promo */}
        <div className="mt-16 bg-zinc-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 justify-between border border-zinc-900">
          <div className="flex items-center gap-4 text-center md:text-left flex-col sm:flex-row">
            <div className="w-16 h-16 bg-rose-500/10 text-rose-400 rounded-full flex items-center justify-center border border-rose-500/20">
              <Award className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold font-display">Get Hexel One Certified</h4>
              <p className="text-zinc-400 text-sm max-w-md">Pass the campaign performance verification test on Day 7 to receive your official Meta & AI Ads completion certificate.</p>
            </div>
          </div>
          <div className="w-full md:w-auto text-center shrink-0">
            <span className="text-xs text-zinc-500 font-mono block mb-1">RECOGNIZED IN THE METAVERSES</span>
            <span className="text-lg font-mono font-semibold border border-rose-500/30 text-rose-400 bg-rose-500/10 px-4 py-1.5 rounded-full inline-block">100% VERIFIED BADGE</span>
          </div>
        </div>

      </div>
    </section>
  );
}
