import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import PainPoints from "./components/PainPoints";
import Transformation from "./components/Transformation";
import Curriculum from "./components/Curriculum";
import CertificateShowcase from "./components/CertificateShowcase";
import BonusStack from "./components/BonusStack";
import ROIWidget from "./components/ROIWidget";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import CheckoutModal from "./components/CheckoutModal";
import GoogleSheetsSync from "./components/GoogleSheetsSync";
import Logo from "./components/Logo";
import { ArrowRight, Flame, ShieldCheck, Mail, MapPin, Zap, Star, LayoutGrid, Users2, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    // Check if user has already booked a seat locally
    const stored = localStorage.getItem("hexel_booking");
    if (stored) {
      try {
        setBooking(JSON.parse(stored));
      } catch (e) {
        console.error("Error reading stored seat booking", e);
      }
    }
  }, [isCheckoutOpen]);

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleClearBooking = () => {
    localStorage.removeItem("hexel_booking");
    setBooking(null);
  };

  return (
    <div className="bg-white min-h-screen font-sans text-zinc-900 scroll-smooth">
      
      {/* Dynamic Header Announcement Bar */}
      <div className="bg-zinc-950 text-white text-xs text-center py-2.5 px-4 font-mono font-medium border-b border-zinc-900 flex flex-wrap justify-center items-center gap-x-4 gap-y-1 z-50 relative">
        <span className="flex items-center gap-1.5 text-rose-400">
          <Flame className="w-3.5 h-3.5 animate-pulse" /> NEXT BATCH: MON, JUNE 15, 2026
        </span>
        <span className="h-3 w-px bg-zinc-800 hidden sm:inline"></span>
        <span>Only 3 Seats Remaining at ₹8,000 Special Offer</span>
        {booking && (
          <span className="ml-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-bold animate-bounce">
            PASSPORT: {booking.ticketNo} RESERVED
          </span>
        )}
      </div>

      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-zinc-100 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo Left */}
            <div className="flex items-center gap-3">
              <a href="#" className="flex items-center gap-2">
                <Logo className="scale-75 origin-left" />
              </a>
            </div>

            {/* Quick Links Middle */}
            <div className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold text-zinc-600">
              <a href="#challenges" className="hover:text-rose-600 transition-colors">Challenges</a>
              <a href="#curriculum" className="hover:text-rose-600 transition-colors">Syllabus</a>
              <a href="#certification" className="hover:text-rose-600 transition-colors">Certificate</a>
              <a href="#bonuses" className="hover:text-rose-600 transition-colors">Bonuses</a>
              <a href="#roi-calculator" className="hover:text-rose-600 transition-colors font-sans">ROI Predictor</a>
              <a href="#testimonials" className="hover:text-rose-600 transition-colors">Reviews</a>
              <a href="#faq" className="hover:text-rose-600 transition-colors font-sans">FAQ</a>
            </div>

            {/* CTA Option Right */}
            <div className="flex items-center gap-3">
              {booking ? (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleOpenCheckout}
                    className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-bold text-xs px-3.5 py-2.5 rounded-xl transition-all cursor-pointer"
                  >
                    Ticket: {booking.ticketNo}
                  </button>
                  <button 
                    onClick={handleClearBooking} 
                    className="text-zinc-400 hover:text-zinc-600 text-[10px] font-mono hover:underline font-medium"
                    title="Reset your session to test booking again"
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleOpenCheckout}
                  className="bg-zinc-950 text-white hover:bg-[#e21b22] hover:text-white transition-colors duration-200 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl inline-flex items-center gap-1.5 cursor-pointer shadow-sm shadow-zinc-200"
                >
                  Reserve Seat <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Layout */}
      <main>
        
        {/* 1. Hero Section */}
        <Hero onOpenCheckout={handleOpenCheckout} />

        {/* 2. Interactive ROI / Spend Calculator Widget */}
        <section className="py-12 bg-white relative -mt-8 sm:-mt-14 z-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <ROIWidget onOpenCheckout={handleOpenCheckout} />
          </div>
        </section>

        {/* 3. Pain Points - Challenges */}
        <PainPoints />

        {/* 4. Course Transformation comparisons */}
        <Transformation />

        {/* 5. Course Syllabus / Module curriculum details */}
        <Curriculum />

        {/* 5.5 Professional Certification Showcase */}
        <CertificateShowcase />

        {/* 6. Free Bonuses List */}
        <BonusStack />

        {/* 7. Success Stories grids */}
        <Testimonials />

        {/* 9. Special Pricing package & timer */}
        <Pricing onOpenCheckout={handleOpenCheckout} />

        {/* 10. Q&A Search Accordion */}
        <FAQ />

        {/* 11. Final Urgency CTA Box */}
        <section className="bg-zinc-950 text-white py-20 relative overflow-hidden border-t border-zinc-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-rose-950/20 via-zinc-950 to-zinc-950"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full text-xs font-mono font-bold uppercase tracking-widest">
              SECURE DEFEAT OF AD BUDGET BURNING
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight leading-tight">
              Stop Guessing. Start Growing.
            </h2>
            
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Every single day you continue running ads without a proper conversion system is costing your business potential clients and revenue. Plug the leakage. Take complete command of Meta Ads.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOpenCheckout}
                className="w-full sm:w-auto bg-[#e21b22] text-white font-bold text-base px-8 py-4 rounded-xl hover:bg-neutral-100 hover:text-black transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                Book Your Seat Now <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <a href="#faq" className="text-xs text-zinc-500 font-mono underline hover:text-zinc-300 py-2.5">
                Have inquiries? Read FAQ
              </a>
            </div>

            <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest pt-4">
              Batch starts Monday, June 15 at 7:00 PM IST  •  25 Students Cap
            </p>
          </div>
        </section>

      </main>

      {/* Modern High-Quality Footer */}
      <footer className="bg-zinc-950 text-zinc-500 text-xs py-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 border-b border-zinc-900 pb-8">
            <div className="flex flex-wrap justify-center gap-6 text-zinc-400 font-semibold">
              <a href="#challenges" className="hover:text-white transition-colors">Challenges</a>
              <a href="#curriculum" className="hover:text-white transition-colors">Syllabus</a>
              <a href="#certification" className="hover:text-white transition-colors">Certificate</a>
              <a href="#bonuses" className="hover:text-white transition-colors">Bonuses</a>
              <a href="#pricing" className="hover:text-white transition-colors">Enroll Today</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-[10px] text-zinc-600 font-mono">
            <span>© 2026 Hexel One Inc. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#privacy" className="hover:underline">Privacy Policy</a>
              <span>•</span>
              <a href="#terms" className="hover:underline">Terms of Service</a>
              <span>•</span>
              <a href="#refund" className="hover:underline">Refund Guidelines</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Registration / Reservation checkout overlay */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />

      {/* Floating Google Sheets Lead Synchronizer */}
      <GoogleSheetsSync />

    </div>
  );
}
