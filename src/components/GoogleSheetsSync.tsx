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
  ChevronDown,
  Copy,
  Link,
  HelpCircle,
  Code
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
  const [activeTab, setActiveTab] = useState<"webhook" | "oauth">("webhook");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isCreatingSheet, setIsCreatingSheet] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // Connection states
  const [user, setUser] = useState<any>(null);
  const [sheetId, setSheetId] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrlState] = useState("");
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

    // 3. Load Webhook URL
    const savedWebhook = localStorage.getItem("google_sheets_webhook_url") || "https://script.google.com/macros/s/AKfycbzhadONgJ0RLwyjZW5fJAL7iKgXvgA0goO0VjO-Zschzk7hNNuFwT_g2SNWvaFBWitmIw/exec";
    setWebhookUrlState(savedWebhook);

    // 4. Keep token state checked
    const token = localStorage.getItem("google_sheets_token");
    const tokenExpiry = Number(localStorage.getItem("google_sheets_token_expiry") || "0");
    
    if (token && Date.now() < tokenExpiry) {
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
      setErrorMessage(err.message || "Authentication aborted or domain not authorized.");
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

  const handleUpdateWebhook = (val: string) => {
    localStorage.setItem("google_sheets_webhook_url", val.trim());
    setWebhookUrlState(val.trim());
  };

  const handleBulkSync = async () => {
    setIsSyncingAll(true);
    setErrorMessage(null);

    // Dynamic split: Webhook vs OAuth bulk sync
    if (activeTab === "webhook") {
      if (!webhookUrl) {
        setErrorMessage("Please paste your Google Apps Script URL first!");
        setIsSyncingAll(false);
        return;
      }

      try {
        const unsyncedLeads = leads.filter(l => !l.synced);
        for (const lead of unsyncedLeads) {
          await fetch(webhookUrl, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "text/plain",
            },
            body: JSON.stringify(lead)
          });
          lead.synced = true;
        }
        localStorage.setItem("hexel_leads_list", JSON.stringify(leads));
        loadStatus();
      } catch (err: any) {
        console.error(err);
        setErrorMessage("Bulk sync failed: " + (err.message || err.toString()));
      } finally {
        setIsSyncingAll(false);
      }
    } else {
      const token = await getAccessToken();
      if (!token) {
        setErrorMessage("Session expired. Connect using Google Sign-In again.");
        setUser(null);
        setIsSyncingAll(false);
        return;
      }

      if (!sheetId) {
        setErrorMessage("Establish a spreadsheet connection first!");
        setIsSyncingAll(false);
        return;
      }

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
          lead.synced = true;
        }
        localStorage.setItem("hexel_leads_list", JSON.stringify(leads));
        loadStatus();
      } catch (err: any) {
        console.error(err);
        setErrorMessage(err.message || "Failed sync batch.");
      } finally {
        setIsSyncingAll(false);
      }
    }
  };

  const handleDisconnect = async () => {
    logoutGoogle();
    setUser(null);
    setSheetId(null);
    setErrorMessage(null);
    loadStatus();
  };

  const copyScriptCode = () => {
    const script = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", 
        "Full Name", 
        "Phone Number", 
        "WhatsApp", 
        "Current Profile", 
        "City", 
        "Ticket Code"
      ]);
    }
    
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.name || "",
      data.phone || "",
      data.whatsapp || "",
      data.profile === "student" ? "Student" : data.profile === "working" ? "Working Professional" : "Looking for a Job",
      data.city || "",
      data.ticketNo || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "error": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;
    navigator.clipboard.writeText(script);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const unsyncedCount = leads.filter(l => !l.synced).length;
  const sheetLink = sheetId ? `https://docs.google.com/spreadsheets/d/${sheetId}/edit` : null;

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans max-w-sm sm:max-w-md w-full">
      {/* Floating Toggle Pin */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-3 px-4 py-3.5 rounded-full shadow-2xl cursor-pointer border transition-all duration-300 ${
          isOpen 
            ? "bg-zinc-950 text-white border-zinc-800" 
            : webhookUrl || (sheetId && user)
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-[#e21b22] text-white border-rose-600 hover:bg-zinc-900"
        }`}
      >
        <div className="flex items-center gap-2">
          <Database className={`w-4 h-4 ${webhookUrl || (sheetId && user) ? "text-emerald-500" : "animate-pulse"}`} />
          <span className="text-xs font-bold tracking-wide">
            {webhookUrl 
              ? "Direct Google Sheet Active!"
              : sheetId && user 
                ? "Google Sheet Synced!"
                : `Connect Google Sheet (${unsyncedCount} offline)`}
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
            className="absolute bottom-16 left-0 right-0 max-w-sm sm:max-w-md bg-white border border-zinc-200 rounded-2xl shadow-2xl p-5 overflow-hidden flex flex-col space-y-3.5 max-h-[82vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <div className="text-left">
                  <h4 className="text-[11px] font-black text-zinc-950 uppercase tracking-widest font-mono">Google Sheets Config</h4>
                  <p className="text-[10px] text-zinc-500">Capture form submissions automatically</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-[11px] text-zinc-400 hover:text-zinc-600 font-bold"
              >
                Hide
              </button>
            </div>

            {/* Selection Custom Tabs */}
            <div className="grid grid-cols-2 p-1 bg-zinc-100 rounded-xl text-[11px] font-bold">
              <button
                onClick={() => { setActiveTab("webhook"); setErrorMessage(null); }}
                className={`py-2 rounded-lg transition-all cursor-pointer ${activeTab === "webhook" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-500 hover:text-zinc-800"}`}
              >
                🚀 Direct Webhook (No-Code, Best)
              </button>
              <button
                onClick={() => { setActiveTab("oauth"); setErrorMessage(null); }}
                className={`py-2 rounded-lg transition-all cursor-pointer ${activeTab === "oauth" ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-500 hover:text-zinc-800"}`}
              >
                🔒 Google Sign-In Sync
              </button>
            </div>

            {/* Error alerts */}
            {errorMessage && (
              <div className="bg-rose-50 border border-rose-100/50 rounded-xl p-3 text-[10px] text-rose-600 flex items-start gap-1.5 leading-relaxed text-left">
                <AlertCircle className="w-3.5 h-3.5 text-[#e21b22] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Setup Error:</span>
                  <span>{errorMessage}</span>
                  {errorMessage.includes("unauthorized-domain") && (
                    <span className="block mt-1 font-semibold text-[#e21b22]">
                      👉 Please switch to the "Direct Webhook" tab above! It takes 1 minute and works perfectly anywhere.
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Tab 1: Webhook - Step-By-Step Direct Link */}
            {activeTab === "webhook" && (
              <div className="space-y-3.5 text-left">
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 text-[11px] text-emerald-850 space-y-1">
                  <span className="font-bold text-emerald-800 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                    Recommended For Production
                  </span>
                  <p className="text-zinc-650 leading-relaxed">
                    Connecting directly via Apps Script works perfectly on Vercel, GitHub, and custom domains, with no authorization problems.
                  </p>
                </div>

                <div className="space-y-2 text-xs text-zinc-700">
                  <span className="font-bold uppercase tracking-wider font-mono text-[10px] text-zinc-400 block">EASY Setup Process (1 Minute):</span>
                  
                  <div className="space-y-2">
                    <p className="leading-snug">
                      <strong>1.</strong> Open your Google Sheet, click <strong>Extensions &gt; Apps Script</strong>.
                    </p>
                    
                    <div className="bg-zinc-50 border border-zinc-150 rounded-lg p-2 flex.col space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                          <Code className="w-3 h-3 text-zinc-400" /> Webhook Script Code
                        </span>
                        <button
                          onClick={copyScriptCode}
                          className="text-[10px] font-bold text-[#e21b22] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          {isCopied ? "Copied!" : "Copy Code"}
                        </button>
                      </div>
                      <p className="text-[9px] font-mono text-zinc-400 italic">Clear existing code, paste copy, save.</p>
                    </div>

                    <p className="leading-snug">
                      <strong>2.</strong> Click <strong>Deploy &gt; New deployment</strong>.
                    </p>
                    <p className="leading-snug pl-3 border-l border-zinc-100 text-[11px] text-zinc-500">
                      • Click gear icon next to "Select type", choose <strong>Web app</strong>.<br />
                      • Execute as: <strong>Me</strong>.<br />
                      • Who has access: <strong className="text-rose-600">Anyone</strong>.<br />
                      • Click <strong>Deploy</strong> and Copy the <strong>Web App URL</strong>.
                    </p>

                    <p className="leading-snug">
                      <strong>3.</strong> Paste your Deployment Web App URL here:
                    </p>
                  </div>

                  <div className="relative mt-2">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Link className="h-3.5 w-3.5 text-zinc-400" />
                    </div>
                    <input
                      type="url"
                      placeholder="https://script.google.com/macros/s/.../exec"
                      value={webhookUrl}
                      onChange={(e) => handleUpdateWebhook(e.target.value)}
                      className="block w-full pl-9 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs placeholder-zinc-400 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono transition-all"
                    />
                  </div>

                  {webhookUrl && (
                    <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50 p-2 rounded-lg">
                      <Check className="w-3.5 h-3.5" /> Webhook active! Direct link connected.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: OAuth Sync */}
            {activeTab === "oauth" && (
              <div className="space-y-3">
                <div className="space-y-3">
                  {/* Step 1: Account Login */}
                  <div className="flex items-center justify-between py-2.5 px-3 bg-zinc-50 border border-zinc-150 rounded-xl text-xs text-left">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider font-mono">1. Google Authorization</span>
                      <span className="font-semibold text-zinc-750">
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
                  <div className="flex items-center justify-between py-2.5 px-3 bg-zinc-50 border border-zinc-150 rounded-xl text-xs text-left">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-zinc-400 font-bold block uppercase tracking-wider font-mono">2. Setup Sheet Linked</span>
                      <span className="font-semibold text-zinc-750">
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

                <p className="text-[10px] text-zinc-450 leading-relaxed text-left">
                  ⚠️ Google OAuth popup will only succeed on domains authorized in your Firebase developer dashboard. Direct Webhook sync bypasses this completely!
                </p>
              </div>
            )}

            {/* Offline Leads Count & Batch Controls */}
            <div className="bg-zinc-50 border border-zinc-150 rounded-xl p-3.5 space-y-2.5 text-left">
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

              {unsyncedCount > 0 && ((activeTab === "webhook" && webhookUrl) || (activeTab === "oauth" && sheetId && user)) && (
                <button
                  onClick={handleBulkSync}
                  disabled={isSyncingAll}
                  className="w-full bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingAll ? "animate-spin" : ""}`} />
                  Sync {unsyncedCount} Leads to Google Sheet Now
                </button>
              )}
            </div>

            {/* Simulated Live Feed preview */}
            <div className="space-y-1.5 text-left pb-1">
              <span className="text-[9px] uppercase font-mono font-bold text-zinc-400 block tracking-wider">Live Leads Stream (Latest 2)</span>
              {leads.length === 0 ? (
                <p className="text-[10px] text-zinc-400 italic">No registrations processed yet. Submit form to lock lead.</p>
              ) : (
                <div className="space-y-11">
                  {leads.slice(-2).reverse().map((lead, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-zinc-50 border border-zinc-150 rounded-lg text-[10px]">
                      <div className="truncate text-zinc-700 font-medium max-w-[210px] sm:max-w-xs">
                        <strong>{lead.name}</strong> • {lead.city} ({lead.profile})
                      </div>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${lead.synced ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
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
