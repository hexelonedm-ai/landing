import React, { useState, useEffect } from "react";
import { X, ShieldCheck, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { appendLeadRow } from "../lib/googleSheets";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    profile: "working", // "student", "working", "looking"
    city: ""
  });

  const [step, setStep] = useState<"fill" | "submitting" | "success">("fill");
  const [loadingText, setLoadingText] = useState("Securing connection...");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passportNo, setPassportNo] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      // Keep state initialized cleanly on open
      setStep("fill");
      setErrors({});
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      newErrors.phone = "Provide a valid active mobile number";
    }
    if (!formData.whatsapp.trim() || formData.whatsapp.length < 10) {
      newErrors.whatsapp = "Provide a active WhatsApp number";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLeadSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStep("submitting");
    const simulationSteps = [
      "Accessing active registration database...",
      "Validating dynamic WhatsApp channels...",
      "Reserving priority seat allocation...",
      "Generating unique entry passcode..."
    ];

    let currentStepIdx = 0;
    setLoadingText(simulationSteps[currentStepIdx]);

    const interval = setInterval(() => {
      currentStepIdx++;
      if (currentStepIdx < simulationSteps.length) {
        setLoadingText(simulationSteps[currentStepIdx]);
      } else {
        clearInterval(interval);
        const generatedPass = `HEX-VIP-${Math.floor(Math.random() * 89999) + 10000}`;
        setPassportNo(generatedPass);

        const newBooking = {
          name: formData.name,
          ticketNo: generatedPass,
          bookingDate: new Date().toLocaleDateString(),
          whatsapp: formData.whatsapp,
          profile: formData.profile,
          city: formData.city
        };

        // Store to local storage so App.tsx header status highlights "PASSPORT: RESERVED"
        localStorage.setItem("hexel_booking", JSON.stringify(newBooking));

        // Connect lead record
        const timestamp = new Date().toLocaleString();
        const leadRecord = {
          timestamp,
          name: formData.name,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          profile: formData.profile,
          city: formData.city,
          ticketNo: generatedPass,
          synced: false
        };

        const existingLeads = JSON.parse(localStorage.getItem("hexel_leads_list") || "[]");

        // Google Sheet Live Sync Append check
        const webhookUrl = localStorage.getItem("google_sheets_webhook_url") || "https://script.google.com/macros/s/AKfycbzhadONgJ0RLwyjZW5fJAL7iKgXvgA0goO0VjO-Zschzk7hNNuFwT_g2SNWvaFBWitmIw/exec";
        const spreadsheetId = localStorage.getItem("google_spreadsheet_id");
        const token = localStorage.getItem("google_sheets_token");
        const tokenExpiry = Number(localStorage.getItem("google_sheets_token_expiry") || "0");

        if (webhookUrl) {
          // Direct Webhook Sync (Safe from Auth Domain issues, CORS-safe with no-cors or basic POST)
          fetch(webhookUrl, {
            method: "POST",
            mode: "no-cors", // guaranteed to bypass any cross-origin restrictions of Google Apps Script redirections
            headers: {
              "Content-Type": "text/plain",
            },
            body: JSON.stringify(leadRecord)
          }).then(() => {
            leadRecord.synced = true;
            existingLeads.push(leadRecord);
            localStorage.setItem("hexel_leads_list", JSON.stringify(existingLeads));
          }).catch(err => {
            console.error("Direct webhook submission failed:", err);
            existingLeads.push(leadRecord);
            localStorage.setItem("hexel_leads_list", JSON.stringify(existingLeads));
          });
        } else if (spreadsheetId && token && Date.now() < tokenExpiry) {
          appendLeadRow(token, spreadsheetId, [
            timestamp,
            formData.name,
            formData.phone,
            formData.whatsapp,
            formData.profile === "student" ? "Student" : formData.profile === "working" ? "Working Professional" : "Looking for a Job",
            formData.city,
            generatedPass
          ]).then(() => {
            leadRecord.synced = true;
            existingLeads.push(leadRecord);
            localStorage.setItem("hexel_leads_list", JSON.stringify(existingLeads));
          }).catch(err => {
            console.error("Background sheets sync append failed:", err);
            existingLeads.push(leadRecord);
            localStorage.setItem("hexel_leads_list", JSON.stringify(existingLeads));
          });
        } else {
          existingLeads.push(leadRecord);
          localStorage.setItem("hexel_leads_list", JSON.stringify(existingLeads));
        }

        setStep("success");
      }
    }, 850);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-zinc-100 max-h-[95vh] flex flex-col animate-in fade-in-50"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-zinc-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#e21b22] rounded-full inline-block animate-pulse"></span>
              <span className="font-display font-extrabold text-sm sm:text-base text-zinc-950">
                {step === "success" ? "Seat Pre-Reserved!" : "Reserve Your Seat Now"}
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-zinc-100 rounded-full text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-5 flex-1">
            {step === "fill" && (
              <form onSubmit={handleLeadSubmission} className="space-y-4">
                
                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-xs text-zinc-700 leading-relaxed space-y-1">
                  <span className="font-bold text-[#e21b22] uppercase font-mono block tracking-wide">
                     BATCH PRE-REGISTRATION OPEN
                  </span>
                  <p>✔ Access 7-Day Live Meta Ads Training</p>
                  <p>✔ Get All 6 Exclusive Bonuses (worth ₹25,000+)</p>
                  <p>✔ Priority entry credentials sent directly over WhatsApp</p>
                </div>

                {/* Form Fields */}
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Verma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm transition-all"
                    />
                    {errors.name && <p className="text-[11px] text-[#e21b22] mt-1 font-semibold">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 9600606570"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm transition-all"
                      />
                      {errors.phone && <p className="text-[11px] text-[#e21b22] mt-1 font-semibold">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 9600606570"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm transition-all"
                      />
                      {errors.whatsapp && <p className="text-[11px] text-[#e21b22] mt-1 font-semibold">{errors.whatsapp}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                        Current Profile
                      </label>
                      <select
                        value={formData.profile}
                        onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                        className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm transition-all cursor-pointer"
                      >
                        <option value="student">Student</option>
                        <option value="working">Working Professional</option>
                        <option value="looking">Looking for a Job</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Delhi, Chennai"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm transition-all"
                      />
                      {errors.city && <p className="text-[11px] text-[#e21b22] mt-1 font-semibold">{errors.city}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 py-2 text-[10px] text-zinc-500 border-t border-zinc-100 mt-4">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>We value your privacy. Your information is purely secured for bootcamp entry admissions.</span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-[#e21b22] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl hover:bg-neutral-900 transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer mt-2"
                >
                  Reserve My Seat Now <ArrowRight className="w-5 h-5" />
                </motion.button>
              </form>
            )}

            {/* Loading Gate State */}
            {step === "submitting" && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-zinc-100 border-t-[#e21b22] animate-spin"></div>
                  <Sparkles className="w-6 h-6 text-[#e21b22] absolute inset-0 m-auto animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-zinc-900">Processing Registration</h3>
                  <p className="text-sm text-zinc-500 font-mono italic max-w-xs">{loadingText}</p>
                </div>
              </div>
            )}

            {/* Success Celebration state */}
            {step === "success" && (
              <div className="py-4 flex flex-col items-center justify-center text-center space-y-5 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 relative">
                  <CheckCircle2 className="w-10 h-10" />
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full animate-ping"></span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-black text-[#e21b22]">Seat Reserved, {formData.name}!</h3>
                  <p className="text-sm text-zinc-600">
                    Your spot is registered! We have processed your priority admission pass. Here is your temporary reservation pass code:
                  </p>
                </div>

                {/* Digital Ticket Pass */}
                <div className="bg-zinc-950 text-white rounded-2xl p-5 w-full text-left font-mono text-xs border border-zinc-900 relative shadow-lg">
                  <div className="absolute top-0 right-4 h-3 bg-[#e21b22] w-12 rounded-b"></div>
                  <div className="flex justify-between items-center border-b border-zinc-800 pb-2.5 mb-2.5">
                    <span className="font-semibold text-rose-400 text-[10px]">BOOTCAMP VIP PASS</span>
                    <span className="font-bold text-white bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded px-1.5 py-0.5 text-[10px]">RESERVED</span>
                  </div>

                  <div className="space-y-2.5 text-zinc-300">
                    <div>
                      <span className="text-[9px] text-zinc-500 block">NAME:</span>
                      <span className="text-white font-bold">{formData.name}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[9px] text-zinc-500 block">PASSCODE:</span>
                        <span className="text-emerald-400 font-bold block">{passportNo}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-500 block">BATCH DATE:</span>
                        <span className="text-white font-bold block">Monday, Jun 15</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[9px] text-zinc-500 block">WHATSAPP:</span>
                        <span className="text-white block">{formData.whatsapp}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-500 block">CITY/PROFILE:</span>
                        <span className="text-white block truncate">{formData.city} ({formData.profile})</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-xs text-zinc-650 leading-relaxed text-left space-y-1.5 w-full">
                  <span className="font-bold text-zinc-900 block font-display">What happens next?</span>
                  <p>📱 A verified admission coordinator will contact you on <strong>{formData.whatsapp}</strong> shortly.</p>
                  <p>🎁 Your 6 Exclusive Bonuses Worth ₹25,000+ will be dispatched over WhatsApp / Email once verified.</p>
                </div>

                <div className="w-full">
                  <button
                    onClick={onClose}
                    className="w-full bg-zinc-950 hover:bg-[#e21b22] text-white font-bold text-sm py-3 rounded-xl transition-all cursor-pointer"
                  >
                    Return to Homepage
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
