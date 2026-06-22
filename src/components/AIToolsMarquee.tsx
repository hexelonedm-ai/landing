import React from "react";
import { motion } from "motion/react";
import { Sparkles, MessageSquare, Image, Video, PenTool, Radio, Cpu, Workflow } from "lucide-react";

export default function AIToolsMarquee() {
  const tools = [
    {
      name: "Gemini",
      category: "AI Engine",
      icon: <Sparkles className="w-5 h-5 text-blue-400" />,
      color: "from-blue-500/10 to-indigo-500/10 border-blue-500/20",
      glow: "group-hover:shadow-blue-500/10"
    },
    {
      name: "Higgsfield",
      category: "AI Video & Motion",
      icon: <Video className="w-5 h-5 text-pink-500" />,
      color: "from-pink-500/10 to-rose-500/10 border-pink-500/20",
      glow: "group-hover:shadow-pink-500/10"
    },
    {
      name: "Heygen",
      category: "AI Avatars & Presenters",
      icon: <Workflow className="w-5 h-5 text-teal-400" />,
      color: "from-teal-500/10 to-cyan-500/10 border-teal-500/20",
      glow: "group-hover:shadow-teal-500/10"
    },
    {
      name: "Manus",
      category: "AI Marketing Agent",
      icon: <Cpu className="w-5 h-5 text-orange-500" />,
      color: "from-orange-500/10 to-amber-500/10 border-orange-500/20",
      glow: "group-hover:shadow-orange-500/10"
    },
    {
      name: "ChatGPT",
      category: "Ad Copywriting",
      icon: <MessageSquare className="w-5 h-5 text-emerald-500" />,
      color: "from-emerald-500/10 to-teal-500/10 border-emerald-500/20",
      glow: "group-hover:shadow-emerald-500/10"
    },
    {
      name: "Claude",
      category: "Reel Scripting",
      icon: <PenTool className="w-5 h-5 text-amber-500" />,
      color: "from-amber-500/10 to-yellow-600/10 border-amber-500/20",
      glow: "group-hover:shadow-amber-500/10"
    },
    {
      name: "Scripai",
      category: "AI Creative Prompts",
      icon: <Radio className="w-5 h-5 text-indigo-400" />,
      color: "from-purple-500/10 to-indigo-500/10 border-purple-500/20",
      glow: "group-hover:shadow-purple-500/10"
    }
  ];

  // Double the list to have a seamless wrap-around infinite track
  const doubledTools = [...tools, ...tools, ...tools];

  return (
    <div className="py-8 bg-zinc-950 border-y border-zinc-900 relative overflow-hidden">
      {/* Decorative gradient corners on both sides for seamless visual blend */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 text-center mb-5">
        <h4 className="text-[10px] md:text-[11px] font-mono font-bold tracking-[0.25em] text-[#e21b22] uppercase">
          ⚡ AI Tools You'll Master
        </h4>
      </div>

      {/* Overflow slider container */}
      <div className="flex w-full overflow-hidden relative py-2">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
          className="flex gap-4 sm:gap-6 shrink-0"
        >
          {doubledTools.map((tool, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 px-5 py-3.5 bg-gradient-to-br ${tool.color} border rounded-2xl shrink-0 w-[240px] sm:w-[280px] shadow-sm hover:border-[#e21b22]/30 transition-all duration-300 group ${tool.glow}`}
            >
              <div className="p-2 bg-zinc-900 rounded-xl border border-zinc-800">
                {tool.icon}
              </div>
              <div className="text-left">
                <span className="text-zinc-400 text-[10px] font-semibold uppercase tracking-wider block font-mono">
                  {tool.category}
                </span>
                <span className="text-white font-bold text-sm sm:text-base tracking-tight block">
                  {tool.name}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <p className="text-[11px] text-zinc-500 font-sans mt-3 text-center">
        Learn how to craft stunning copy, generate professional videos, and automate lead routers in real-time.
      </p>
    </div>
  );
}
