import React, { useState } from "react";
import { ChevronDown, Search, HelpCircle, MessageCircle } from "lucide-react";

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Do I need marketing experience?",
      answer: "No, absolutely not. The training is structured from the fundamental ground-up. We teach everything from launching your very first Campaign to setting up advanced API integrations."
    },
    {
      question: "Will I run real campaigns?",
      answer: "Yes. This is a practical implementation bootcamp. You will draft campaigns, look up audiences, write copy using AI frameworks, and can push campaigns live together with the tutor."
    },
    {
      question: "Is this suitable for local businesses?",
      answer: "Absolutely. The strategy guidelines work beautifully for local services, clinics, dental centers, gyms, cafes, real estate brokers, and independent professional coaches."
    },
    {
      question: "Will I receive a certificate?",
      answer: "Yes. Once you pass the Day 7 campaign performance verification checklist, a verified Hexel One Meta & AI marketing digital certificate is generated for you."
    },
    {
      question: "What is the daily ad budget required to practice?",
      answer: "You can start practicing with as low as ₹100 to ₹300 per day. Meta allows micro-budgets during evaluation stages. Running a live budget is recommended but not mandatory."
    },
    {
      question: "Do you offer a refund policy?",
      answer: "Yes, we stand behind our bootcamp with a 100% Risk-Free Refund Guarantee. If after Day 2 you feel this program doesn't add value, simply mail support and get a full refund instantly."
    }
  ];

  const filteredFaqs = faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 bg-zinc-50 border-b border-zinc-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-[#e21b22] border border-rose-100 uppercase font-mono">
            GET ALL ANSWERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-zinc-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base">
            Can’t find what you are looking for? Reach out to support list 24/7.
          </p>
        </div>

        {/* Interactive Search Bar FAQ */}
        <div className="relative mb-8 max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search questions (e.g. Budget, Certificate, Refund)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-xl text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 shadow-sm text-sm transition-all"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  id={`faq-${index}`}
                  className="bg-white border border-zinc-200 rounded-xl overflow-hidden hover:border-zinc-300 transition-colors"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-zinc-900 select-none outline-none cursor-pointer"
                  >
                    <span className="font-display pr-4 text-sm sm:text-base">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform shrink-0 ${isOpen ? "rotate-180 text-[#e21b22]" : ""}`} />
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[300px] border-t border-zinc-100" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <p className="p-5 text-zinc-600 text-xs sm:text-sm leading-relaxed bg-zinc-50/50">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 bg-white border border-zinc-250 rounded-xl space-y-2">
              <HelpCircle className="w-8 h-8 text-zinc-300 mx-auto" />
              <p className="text-zinc-500 text-sm">No Match Found. Try searching 'experience' or 'leads'.</p>
            </div>
          )}
        </div>

        {/* Dynamic Help Trigger box */}
        <div className="mt-12 bg-white rounded-2xl border border-zinc-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3 text-center sm:text-left flex-col sm:flex-row">
            <div className="p-3 bg-rose-50 text-[#e21b22] rounded-xl">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-zinc-900">Still have custom queries?</h4>
              <p className="text-zinc-500 text-xs">📞 Call / WhatsApp: +91 9600 60 65 70 | 🌐 Website: www.hexel1.in</p>
            </div>
          </div>
          <button 
            onClick={() => window.open("mailto:hexelone.dm@gmail.com")}
            className="w-full sm:w-auto bg-zinc-900 hover:bg-[#e21b22] text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer text-center"
          >
            Email Us
          </button>
        </div>

      </div>
    </section>
  );
}
