# Hexel One Landing Page & Leads Manager

This is a high-performance, modern landing page for **Hexel One Bootcamp** built with React, Vite, TypeScript, and Tailwind CSS. It features a responsive layout, conversion-optimized sections, and an integrated, secure Google Sheets Lead Synchronization system.

---

## 🛠️ Tech Stack
- **Frontend Framework:** React 19 / TypeScript
- **Styling:** Tailwind CSS ( v4 with modern CSS variables)
- **Animations:** Motion (`motion/react`)
- **Icons:** Lucide React
- **Build System:** Vite 6

---

## 📦 How to Export from AI Studio
You don't need to manually copy-paste code files! You can download the entire workspace directly from Google AI Studio:

1. **Option A: Export directly to GitHub**
   * Click on the **Settings** or **Project Menu** in the top-right corner of the Google AI Studio build workspace.
   * Select **Export to GitHub** (or **Sync to GitHub**).
   * Follow the prompts to authorize your GitHub account and create a brand new repository instantly.

2. **Option B: Download as ZIP**
   * Click on the **Settings** or **Project Menu** in the top-right corner.
   * Select **Download as ZIP** (or **Export Workspace as ZIP**).
   * Extract the ZIP file on your local computer.

---

## 🚀 How to Deploy on Vercel (Recommended)
Vercel is the easiest and most powerful platform to host React/Vite SPAs.

### Step 1: Push your project to GitHub
If you downloaded the workspace as a `.zip`, initialize a local git repository and push it to GitHub:
```bash
git init
git add .
git commit -m "Initialize Hexel One Landing Page"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

### Step 2: Import into Vercel
1. Go to [vercel.com](https://vercel.com) and sign in using your GitHub account.
2. Click **Add New** > **Project**.
3. Select your `hexel-one-landing-page` repository from your list of imported GitHub projects and click **Import**.

### Step 3: Configure Build & Output Settings
Vercel automatically detects Vite, but make sure the following settings match:
- **Framework Preset:** `Vite`
- **Build Command:** `vite build`
- **Output Directory:** `dist`

Click **Deploy**! Your landing page will be alive on a secure `https://xxx.vercel.app` URL in less than a minute.

---

## 🌐 Connecting a Custom Domain on Vercel
To use your own professional web address (e.g., `www.yourdomain.com`):

1. Inside your Vercel Dashboard, select your project.
2. Navigate to **Settings** > **Domains**.
3. Type in your custom domain and click **Add**.
4. Vercel will show your custom DNS records. Simply log into your domain provider (GoDaddy, Namecheap, Google Domains, etc.) and add the pointed values:
   * For apex domains (e.g. `yourdomain.com`), configure an **A Record** pointing to Vercel's IP (`76.76.21.21`).
   * For subdomains (e.g. `bootcamp.yourdomain.com`), configure a **CNAME Record** pointing to `cname.vercel-dns.com`.

---

## 🎛️ Google Sheets Sync Administration
The Google Sheets Integration tool is embedded securely inside the application but is hidden from regular visitors:

1. To open the **Google Sheets Sync Console**, open your live website and append `#admin` or `?admin=true` to your URL.
   * Example: `https://your-custom-domain.com/#admin`
2. This reveals the floating panel in the bottom-left corner.
3. Sign in using your Google account to grant sheets creation permissions.
4. Click **Create Sheet** to configure a structured sheets template in your Google Drive folder.
5. All offline submissions captured in the local lead cache can be batched-synced directly with one click!
