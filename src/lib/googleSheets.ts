import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, User, signOut } from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/spreadsheets");
provider.addScope("https://www.googleapis.com/auth/drive.file");

let cachedAccessToken: string | null = localStorage.getItem("google_sheets_token");
let cachedExpiry: number = Number(localStorage.getItem("google_sheets_token_expiry") || "0");

export const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("Failed to extract access token from Google Credentials");
    }
    cachedAccessToken = credential.accessToken;
    // Cache for 1 hour
    cachedExpiry = Date.now() + 3500 * 1000;
    localStorage.setItem("google_sheets_token", cachedAccessToken);
    localStorage.setItem("google_sheets_token_expiry", String(cachedExpiry));
    
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error("Google Authentication error:", error);
    throw error;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  if (cachedAccessToken && Date.now() < cachedExpiry) {
    return cachedAccessToken;
  }
  cachedAccessToken = null;
  localStorage.removeItem("google_sheets_token");
  localStorage.removeItem("google_sheets_token_expiry");
  return null;
};

export const logoutGoogle = async () => {
  await signOut(auth);
  cachedAccessToken = null;
  localStorage.removeItem("google_sheets_token");
  localStorage.removeItem("google_sheets_token_expiry");
  localStorage.removeItem("google_spreadsheet_id");
};

/**
 * Creates a brand new Google Spreadsheet targeting the authenticated user's Drive folder
 */
export const createLeadsSpreadsheet = async (accessToken: string, name: string = "Hexel One Bootcamp Leads"): Promise<string> => {
  const response = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        title: name,
      },
      sheets: [
        {
          properties: {
            title: "Leads",
            gridProperties: {
              columnCount: 10,
              rowCount: 1000,
            },
          },
        },
      ],
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || "Failed to create Google Spreadsheet");
  }

  const data = await response.json();
  const spreadsheetId = data.spreadsheetId;
  
  // Pre-seed column headers immediately
  await appendLeadRow(accessToken, spreadsheetId, [
    "Timestamp",
    "Full Name",
    "Phone Number",
    "WhatsApp Number",
    "Current Profile",
    "City",
    "Registration Passcode"
  ]);

  return spreadsheetId;
};

/**
 * Appends a row of lead data to Google Sheets Leads sheet
 */
export const appendLeadRow = async (
  accessToken: string,
  spreadsheetId: string,
  row: string[],
  range: string = "Leads!A:G"
) => {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [row],
      }),
    }
  );

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || "Failed to append record to Google Sheets");
  }

  return response.json();
};
