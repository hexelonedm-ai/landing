import React, { useState, useEffect } from "react";
import { 
  Database, 
  FileText, 
  Check, 
  RefreshCw, 
  ExternalLink, 
  Sparkles, 
  AlertCircle, 
  User, 
  LogOut,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  googleSignIn, 
  logoutGoogle, 
  createLeadsSpreadsheet, 
  appendLeadRow,
  getAccessToken 
} from "../lib/googleSheets";

export default function GoogleSheetsSync() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isCreatingSheet, setIsCreatingSheet] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Connection states
  const [user, setUser] = useState<any>(null);
  const [sheetId, setSheetId] = useState<string | null>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check URL params or hash for admin mode
  useEffect(() => {
    const checkAdmin = () => {
      const params = new URLSearchParams(window.location.search);
      const hasAdminQuery = params.has("admin") || params.has("sheet") || params.has("sheets");
      const hasAdminHash = window.location.hash.includes("admin") || window.location.hash.includes("sheet");
      setIsAdmin(hasAdminQuery || hasAdminHash);
    };
    checkAdmin();
    window.addEventListener("hashchange", checkAdmin);
    return () => window.removeEventListener("hashchange", checkAdmin);
  }, []);

  // Poll leads from localStorage and verify tokens on load and interval
  useEffect(() => {
    if (!isAdmin) return;
    loadStatus();
    const interval = setInterval(loadStatus, 2500);
    return () => clearInterval(interval);
  }, [isAdmin]);

  const loadStatus = () => {
    // 1. Fetch leads from localStorage
    const savedLeads = JSON.parse(localStorage.getItem("hexel_leads_list") || "[]");
    setLeads(savedLeads);

    // 2. Load configured spreadsheet ID
    const savedSheetId = localStorage.getItem("google_spreadsheet_id");
    setSheetId(savedSheetId);

    // 3. Keep token state checked
    const token = localStorage.getItem("google_sheets_token");
    const tokenExpiry = Number(localStorage.getItem("google_sheets_token_expiry") || "0");
    
    if (token && Date.now() < tokenExpiry) {
      // Just mock user object or display as active connection
      setUser({ name: "Google Sheets Active" });
    } else {
      setUser(null);
    }
  };

  const handleConnectGoogle = async () => {
    setIsLoggingIn(true);
    setErrorMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        loadStatus();
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Authentication aborted by user or timeout.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleCreateNewSheet = async () => {
    const token = await getAccessToken();
    if (!token) {
      setErrorMessage("Session expired. Please sign in with Google again.");
      setUser(null);
      return;
    }

    setIsCreatingSheet(true);
    setErrorMessage(null);
    try {
      const id = await createLeadsSpreadsheet(token, "Hexel One Bootcamp Leads");
      localStorage.setItem("google_spreadsheet_id", id);
      setSheetId(id);
      loadStatus();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to create Google Spreadsheet.");
    } finally {
      setIsCreatingSheet(false);
    }
  };

  const handleBulkSync = async () => {
    const token = await getAccessToken();
    if (!token) {
      setErrorMessage("Session expired. Connect inside Google to sync leads.");
      setUser(null);
      return;
    }

    if (!sheetId) {
      setErrorMessage("Establish a spreadsheet connection first!");
      return;
    }

    setIsSyncingAll(true);
    setErrorMessage(null);
    try {
      const unsyncedLeads = leads.filter(l => !l.synced);
      
      for (const lead of unsyncedLeads) {
        await appendLeadRow(token, sheetId, [
          lead.timestamp || new Date().toLocaleString(),
          lead.name || "",
          lead.phone || "",
          lead.whatsapp || "",
          lead.profile === "student" ? "Student" : lead.profile === "working" ? "Working Professional" : "Looking for a Job",
          lead.city || "",
          lead.ticketNo || ""
        ]);
        
        // Mark as synced locally
        lead.synced = true;
      }

      // Update local storage
      localStorage.setItem("hexel_leads_list", JSON.stringify(leads));
      loadStatus();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed sync batch.");
    } finally {
      setIsSyncingAll(false);
    }
  };

  const handleDisconnect = async () => {
    logoutGoogle();
    setUser(null);
    setSheetId(null);
    setErrorMessage(null);
    loadStatus();
  };

  const unsyncedCount = leads.filter(l => !l.synced).length;
  const sheetLink = sheetId ? `https://docs.google.com/spreadsheets/d/${sheetId}/edit` : null;

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans max-w-sm sm:max-w-md w-full">
      {/* Floating Toggle Pin */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-3 px-4 py-3.5 rounded-full shadow-xl cursor-pointer border transition-all duration-300 ${
          isOpen 
            ? "bg-zinc-950 text-white border-zinc-800" 
            : sheetId && user
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-[#e21b22] text-white border-rose-600 hover:bg-zinc-900"
        }`}
      >
        <div className="flex items-center gap-2">
          <Database className={`w-4 h-4 ${sheetId && user ? "text-emerald-500" : "animate-pulse"}`} />
          <span className="text-xs font-bold tracking-wide">
            {sheetId && user 
              ? "Google Sheet Synced!"
              : `G-Sheets Integration (${unsyncedCount} offline)`}
          </span>
        </div>
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </button>

      {/* Expanded config Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 left-0 right-0 max-w-sm sm:max-w-md bg-white border border-zinc-150 rounded-2xl shadow-2xl p-5 overflow-hidden space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-emerald-50 rounded-lg text-emerald-600">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-zinc-900 uppercase tracking-widest font-mono">Google Sheets Config</h4>
                  <p className="text-[10px] text-zinc-400">Sync lead database in 1-click</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-xs text-zinc-400 hover:text-zinc-600 font-bold"
              >
                Hide
              </button>
            </div>

            {/* Error alerts */}
            {errorMessage && (
              <div className="bg-rose-50 border border-rose-100/50 rounded-xl p-3 text-[10px] text-rose-600 flex items-start gap-1.5 leading-relaxed">
                <AlertCircle className="w-3.5 h-3.5 text-[#e21b22] shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Configuration Status Options */}
            <div className="space-y-3">
              {/* Step 1: Account Login */}
              <div className="flex items-center justify-between py-2.5 px-3 bg-zinc-50 border border-zinc-150 rounded-xl text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider font-mono">1. Google Authorization</span>
                  <span className="font-semibold text-zinc-700">
                    {user ? "Authenticated Securely" : "Not connected"}
                  </span>
                </div>
                
                {user ? (
                  <button 
                    onClick={handleDisconnect}
                    className="flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                  >
                    <LogOut className="w-3 h-3" /> Disconnect
                  </button>
                ) : (
                  <button
                    onClick={handleConnectGoogle}
                    disabled={isLoggingIn}
                    className="bg-zinc-950 text-white hover:bg-[#e21b22] text-[11px] font-bold py-1.5 px-3 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isLoggingIn ? "Signing In..." : "Sign In"}
                  </button>
                )}
              </div>

              {/* Step 2: Spreadsheet Connection */}
              <div className="flex items-center justify-between py-2.5 px-3 bg-zinc-50 border border-zinc-150 rounded-xl text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider font-mono">2. Setup Sheet Linked</span>
                  <span className="font-semibold text-zinc-700">
                    {sheetId ? "Active Spreadsheet Linked" : "No sheet created yet"}
                  </span>
                </div>

                {sheetId ? (
                  <a
                    href={sheetLink || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold py-1.5 px-3 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                  >
                    View Sheet <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <button
                    onClick={handleCreateNewSheet}
                    disabled={!user || isCreatingSheet}
                    className="bg-emerald-600 text-white hover:bg-emerald-700 text-[11px] font-bold py-1.5 px-3 rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isCreatingSheet ? "Creating..." : "Create Sheet"}
                  </button>
                )}
              </div>
            </div>

            {/* Offline Leads Count & Batch Controls */}
            <div className="bg-zinc-50 border border-zinc-150 rounded-xl p-3.5 space-y-2.5">
              <div className="flex justify-between items-center text-xs">
                <div>
                  <span className="font-medium text-zinc-500">Collected Local Leads:</span>
                  <p className="text-sm font-black text-rose-600 block">{leads.length} submissions</p>
                </div>
                <div className="text-right">
                  <span className="font-medium text-zinc-500">Pending Sync:</span>
                  <span className={`block text-sm font-black ${unsyncedCount > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                    {unsyncedCount} leads
                  </span>
                </div>
              </div>

              {unsyncedCount > 0 && sheetId && user && (
                <button
                  onClick={handleBulkSync}
                  disabled={isSyncingAll}
                  className="w-full bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingAll ? "animate-spin" : ""}`} />
                  Sync {unsyncedCount} Leads to Google Sheet Now
                </button>
              )}
            </div>

            {/* Simulated Live Feed preview */}
            <div className="space-y-1.5 text-left">
              <span className="text-[9px] uppercase font-mono font-bold text-zinc-400 block tracking-wider">Live Leads Stream (Latest 2)</span>
              {leads.length === 0 ? (
                <p className="text-[10px] text-zinc-400 italic">No registrations processed yet. Submit form to lock lead.</p>
              ) : (
                <div className="space-y-1">
                  {leads.slice(-2).reverse().map((lead, i) => (
                    <div key={i} className="flex items-center justify-between p-1.5 bg-zinc-50 rounded border border-zinc-100 text-[10px]">
                      <div className="truncate text-zinc-700 font-medium">
                        <strong>{lead.name}</strong> • {lead.city} ({lead.profile})
                      </div>
                      <span className={`text-[9px] font-bold px-1.5 rounded-full ${lead.synced ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                        {lead.synced ? "synced" : "offline"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
