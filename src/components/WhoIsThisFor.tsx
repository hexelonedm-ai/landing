import React from "react";
import { Briefcase, GraduationCap, Laptop, Home, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function WhoIsThisFor() {
  const targets = [
    {
      icon: <Briefcase className="w-8 h-8 text-[#e21b22]" />,
      title: "Business Owners",
      description: "Generate more leads, inquiries, and sales using proven Meta Ads strategies.",
      tag: "👨‍💼 Scale Your Business",
      features: [
        "Create consistent lead pipelines",
        "Stop burning money on agency fees",
        "Automate raw customer inquiries via WhatsApp"
      ]
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-[#e21b22]" />,
      title: "Students",
      description: "Learn in-demand digital marketing skills and build a future-ready career.",
      tag: "🎓 High-Income Skill",
      features: [
        "Add certified mastery to your resume",
        "Stand out in placements and agency hirings",
        "Work on live campaigns before graduating"
      ]
    },
    {
      icon: <Laptop className="w-8 h-8 text-[#e21b22]" />,
      title: "Freelancers",
      description: "Offer Meta Ads and AI content services to clients and increase your income.",
      tag: "💼 Grow Your Client List",
      features: [
        "Charge premium retainers for ad campaigns",
        "Deliver daily leads with confidence",
        "Master AI copywriting for rapid turnarounds"
      ]
    },
    {
      icon: <Home className="w-8 h-8 text-[#e21b22]" />,
      title: "Housewives",
      description: "Start a flexible work-from-home career with practical digital marketing skills.",
      tag: "👩‍💻 Work From Home",
      features: [
        "Gain professional flexibility with online work",
        "Earn income on your own schedule",
        "Start a digital agency or e-commerce side-hustle"
      ]
    }
  ];

  return (
    <section id="who-is-this-for" className="py-20 bg-zinc-50 relative overflow-hidden">
      {/* Visual Accent Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-zinc-100 rounded-full blur-3xl opacity-80"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-[#e21b22] text-xs font-semibold tracking-wider uppercase font-mono">
            Is This You?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-zinc-950">
            Who Is This Program For?
          </h2>
          <p className="text-zinc-600 text-lg max-w-2xl mx-auto leading-relaxed">
            This intensive 7-day masterclass is specifically structured to help action-takers drive serious results, regardless of technical background.
          </p>
        </div>

        {/* 2x2 Clean Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {targets.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-zinc-200/80 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-rose-100 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-6">
                {/* Heading Block */}
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-rose-50/50 rounded-2xl group-hover:bg-[#e21b22]/5 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#e21b22] bg-rose-50 px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-display font-black text-zinc-950">
                    {item.title}
                  </h3>
                  <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bullets */}
                <div className="border-t border-zinc-100 pt-5 space-y-3">
                  {item.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-zinc-700 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#e21b22] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
