import React, { useState } from "react";
import { Award, CheckCircle, Share2, Linkedin, Download, Sparkles, User, RefreshCw } from "lucide-react";
import { motion } from "motion/react";
import Logo from "./Logo";

export default function CertificateShowcase() {
  const [userName, setUserName] = useState("Your Name");
  const [isCopied, setIsCopied] = useState(false);

  // Generate perfect starburst rosette path dynamically to ensure mathematical proportion
  const points = 36;
  const cx = 50;
  const cy = 52;
  const rOuter = 31;
  const rInner = 28;
  let starPath = "";
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const r = i % 2 === 0 ? rOuter : rInner;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    starPath += `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  starPath += "Z";

  const handleShare = () => {
    setIsCopied(true);
    navigator.clipboard.writeText("https://hexel-one.com/bootcamp-certification");
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="certification" className="py-20 bg-zinc-50 border-y border-zinc-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest">
            <Award className="w-4.5 h-4.5 text-rose-600 shrink-0" /> Verified Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-zinc-950">
            Earn a Career-Defining Credentials
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            Upon successfully completing the 7-Day Bootcamp, you will receive an official **Hexel One Certificate of Appreciation** to showcase your expertise in planning, targeting, and optimizing high-ROI Meta Ads campaigns.
          </p>
        </div>

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Inputs & Perks (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-md space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest font-mono flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-rose-500" /> Personalized Certificate Preview
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value || "Your Name")}
                    maxLength={32}
                    className="w-full px-4 py-3 bg-zinc-50 text-zinc-800 border border-zinc-250 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none font-sans text-sm font-semibold transition-all"
                    placeholder="Enter your full name..."
                  />
                  {userName !== "Your Name" && (
                    <button
                      onClick={() => setUserName("Your Name")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-1 rounded-full text-[10px] font-mono hover:bg-zinc-100 flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" /> Reset
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-zinc-400 italic">
                  Type your name to see how it renders instantly on the official certificate!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  disabled
                  className="flex-1 bg-zinc-950 text-white font-bold text-xs py-3 rounded-xl disabled:opacity-40 flex items-center justify-center gap-1.5"
                  title="Unlock after bootcamp completion"
                >
                  <Download className="w-3.5 h-3.5" /> Claim Digital PDF
                </button>
                <button
                  onClick={handleShare}
                  type="button"
                  className="flex-1 bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-700 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" /> 
                  {isCopied ? "Link Copied!" : "Share Verification"}
                </button>
              </div>
            </div>

            {/* Verification Benefits Cards */}
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="p-2 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900">Add to LinkedIn Profile</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed mt-0.5">
                    Embed your achievement right to your LinkedIn Licenses & Certifications directory. Boost profile visibility by 6x to potential agency partners or employers.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 bg-[#b2181b]/5 border border-[#b2181b]/10 rounded-xl text-[#b2181b] shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900">Globally Verifiable QR Code</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed mt-0.5">
                    Each generated certificate comes with a unique identification number that can be publicly verified on the Hexel One registry, preventing forgery.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-2 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900">Resume & Portfolio Multiplier</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed mt-0.5">
                    Demonstrate continuous learning and proven knowledge in performance marketing with an industry-recognized syllabus stamp.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Certificate Visual (7 Columns) */}
          <div className="lg:col-span-7 flex justify-center">
            
            {/* The Certificate Frame with standard certificate A4 aspect ratio */}
            <div className="w-full max-w-2xl bg-white border border-zinc-200 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden aspect-[1.414/1] text-zinc-900 select-none transform hover:scale-[1.01] transition-transform duration-300">
              
              {/* Precise Vector SVG Background matching the custom red/gray polygonal layout */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 707" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Subtle luxurious red gradient */}
                  <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a31518" />
                    <stop offset="100%" stopColor="#c52427" />
                  </linearGradient>
                  {/* Gold metallic shine gradient */}
                  <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffe785" />
                    <stop offset="50%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                  {/* Dark grey corner styling */}
                  <linearGradient id="darkSlate" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2c2c2d" />
                    <stop offset="100%" stopColor="#1a1a1b" />
                  </linearGradient>
                  {/* Elegant soft drop-shadow for boundaries */}
                  <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="4" dy="0" stdDeviation="5" floodColor="#000000" floodOpacity="0.25" />
                  </filter>
                </defs>

                {/* Left Crimson/Red Angled Shield Area */}
                <path d="M0 0 H275 L155 707 H0 V0Z" fill="url(#redGrad)" filter="url(#shadowFilter)" />

                {/* Deep Dark Gray Bottom Left Wedged Triangle with diagonal slash */}
                <path d="M0 500 L166 707 H0 V500Z" fill="url(#darkSlate)" />

                {/* Separation highlight strokes to match physical paper depth */}
                <line x1="275" y1="0" x2="155" y2="707" stroke="#ffffff" strokeWidth="2.5" opacity="0.15" />
                <line x1="0" y1="500" x2="166" y2="707" stroke="#ffffff" strokeWidth="2" opacity="0.25" />
              </svg>

              {/* Verified Golden Rosette Stamp / Medal placed precisely in red region with strict 1:1.2 aspect constraints */}
              <div className="absolute top-[8%] left-[5%] sm:top-[12%] sm:left-[6%] z-10 w-14 sm:w-20 md:w-24 aspect-[1/1.2]">
                <svg viewBox="0 0 100 120" preserveAspectRatio="xMidYMid meet" fill="none" className="w-full h-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="clearGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFDD0" />
                      <stop offset="30%" stopColor="#FDE047" />
                      <stop offset="70%" stopColor="#CA8A04" />
                      <stop offset="100%" stopColor="#854D00" />
                    </linearGradient>
                    <linearGradient id="ribbonLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#EAB308" />
                      <stop offset="100%" stopColor="#A16207" />
                    </linearGradient>
                    <linearGradient id="ribbonRight" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#CA8A04" />
                      <stop offset="100%" stopColor="#713F12" />
                    </linearGradient>
                    <radialGradient id="goldInnerSphere" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FEF08A" />
                      <stop offset="60%" stopColor="#EAB308" />
                      <stop offset="100%" stopColor="#854D0E" />
                    </radialGradient>
                  </defs>

                  {/* Symmetrical hanging ribbons that join perfectly under the central medallion */}
                  <path d="M 45 52 L 20 112 L 38 100 L 50 68 Z" fill="url(#ribbonLeft)" stroke="#502F0C" strokeWidth="1" strokeLinejoin="round" />
                  <path d="M 55 52 L 80 112 L 62 100 L 50 68 Z" fill="url(#ribbonRight)" stroke="#502F0C" strokeWidth="1" strokeLinejoin="round" />

                  {/* Perfect dynamic high-contrast starburst (zero rotated squares, fully circular & symmetrical) */}
                  <path d={starPath} fill="url(#clearGold)" stroke="#854D0E" strokeWidth="1.2" strokeLinejoin="round" />

                  {/* Golden outer bevel ring */}
                  <circle cx="50" cy="52" r="26" fill="none" stroke="#854D0E" strokeWidth="1.2" />

                  {/* Concentric clean 3D gold layers for premium glossy seal look */}
                  <circle cx="50" cy="52" r="23.5" fill="url(#goldInnerSphere)" stroke="#854D0E" strokeWidth="1" />
                  <circle cx="50" cy="52" r="19" fill="none" stroke="#FEF9C3" strokeWidth="1" opacity="0.9" />
                  <circle cx="50" cy="52" r="17" fill="url(#clearGold)" stroke="#854D0E" strokeWidth="0.8" />
                  <circle cx="50" cy="52" r="14" fill="url(#goldInnerSphere)" />

                  {/* Glamorous interior metallic reflection line */}
                  <path d="M 36.5 45 C 39.5 35.5, 50.5 33.5, 60.5 36.5 C 50.5 36.5, 41.5 39.5, 36.5 45" fill="#FFFFFF" opacity="0.45" />

                  {/* Decorative luxury dotted concentric boundary with zero symbols */}
                  <circle cx="50" cy="52" r="11.2" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="1.5 1.5" opacity="0.8" />
                </svg>
              </div>

              {/* Top Right Brand Logo Area */}
              <div className="absolute top-3 right-3 sm:top-5 sm:right-5 md:top-6 md:right-6 z-10 scale-[0.6] sm:scale-[0.8] origin-top-right">
                <Logo className="flex flex-col items-end" />
              </div>

              {/* Clean White Main Text Content (Nicely aligned inside white portion; beautifully centered vertically with no date/signature) */}
              <div className="relative z-10 h-full flex flex-col justify-center py-2 space-y-3 sm:space-y-4 md:space-y-5 pl-[33%] sm:pl-[27%] pr-1 sm:pr-2">
                
                {/* Header Text Block */}
                <div className="text-center space-y-0.5 sm:space-y-1">
                  <h3 className="font-display font-medium text-lg sm:text-2xl md:text-[32px] tracking-[0.22em] text-zinc-900 leading-none">
                    CERTIFICATE
                  </h3>
                  <p className="font-display text-[8px] sm:text-[10px] md:text-xs tracking-[0.35em] text-zinc-500 uppercase font-semibold">
                    OF APPRECIATION
                  </p>
                </div>

                {/* Presented Badge */}
                <div className="text-center">
                  <span className="bg-[#b3191c] text-white text-[7px] sm:text-[9px] md:text-[10px] tracking-wider font-extrabold uppercase font-sans px-3.5 py-1.5 rounded-none leading-none inline-block">
                    PROUDLY PRESENTED TO
                  </span>
                </div>

                {/* Recipient Name in gorgeous script font */}
                <div className="text-center py-1 leading-none">
                  <span className="font-script text-2xl sm:text-3xl md:text-5xl text-zinc-950 block leading-none px-2 tracking-wide truncate">
                    {userName}
                  </span>
                  {/* Sharp brand-line representing the official separation */}
                  <div className="mt-1 w-2/3 mx-auto h-[1.5px] bg-[#b3191c]/80" />
                </div>

                {/* Program Description */}
                <div className="text-center px-1 sm:px-2 md:px-4">
                  <p className="text-[7.5px] sm:text-[9px] md:text-[10.5px] leading-relaxed text-zinc-600 max-w-sm sm:max-w-md mx-auto">
                    has successfully completed the <strong className="text-zinc-950 font-extrabold">7-Day Meta Ads Mastery Program</strong> conducted by <strong className="text-zinc-950 font-extrabold">Hexel One</strong> and demonstrated strong skills in Meta Ads planning, targeting, optimization, and performance tracking.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
