import React from "react";

export default function Logo({ className = "" }: { className?: string }) {
  const alignClass = className.includes("items-") ? "" : "items-center";
  return (
    <div id="hexel-logo" className={`flex flex-col select-none ${alignClass} ${className}`}>
      {/* Serif "- Hexel -" tag - matching exact casing from logo */}
      <div className="font-serif text-[10px] sm:text-[11px] tracking-[0.22em] text-zinc-900 font-medium mb-1 text-center whitespace-nowrap">
        - Hexel -
      </div>
      {/* "one" typography using rich red #e11b18 and tight geometric tracking */}
      <div className="flex items-center justify-center leading-none select-none font-sans font-black text-[2.25rem] sm:text-[2.85rem] tracking-tight antialiased">
        <span className="text-[#e11b18] font-black select-none">o</span>
        <span className="text-zinc-950 font-black -ml-[0.03em] select-none">n</span>
        <span className="text-[#e11b18] font-black -ml-[0.03em] select-none">e</span>
      </div>
    </div>
  );
}
