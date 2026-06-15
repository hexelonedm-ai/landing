import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import Razorpay from "razorpay";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = 3000;

app.use(express.json());

// Razorpay Config Check
const keyId = process.env.VITE_RAZORPAY_KEY_ID || "";
const keySecret = process.env.RAZORPAY_KEY_SECRET || "";
const isRazorpayConfigured = !!(keyId && keySecret);

// Lazy initialization of Razorpay to protect startup
let razorpayInstance: Razorpay | null = null;
function getRazorpayInstance() {
  if (!isRazorpayConfigured) return null;
  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }
  return razorpayInstance;
}

// 1. API: Check Razorpay configuration status
app.get("/api/razorpay/config", (req, res) => {
  res.json({
    configured: isRazorpayConfigured,
    keyId: isRazorpayConfigured ? keyId : "rzp_test_mock_unauthorized5810",
  });
});

// 2. API: Create Razorpay Order
app.post("/api/razorpay/create-order", async (req, res) => {
  const { amount } = req.body;
  const targetAmount = Number(amount) || 8000;

  try {
    const rp = getRazorpayInstance();
    if (!rp) {
      // Return a simulated mock order for development and verification purposes
      console.log("Razorpay not configured. Returning mock order details.");
      return res.json({
        configured: false,
        orderId: `order_mock_${Math.random().toString(36).substr(2, 9)}`,
        amount: targetAmount,
        currency: "INR",
        keyId: "rzp_test_mock_unauthorized5810"
      });
    }

    // Call actual Razorpay API
    const order = await rp.orders.create({
      amount: targetAmount * 100, // Razorpay amount in paise (1 INR = 100 paise)
      currency: "INR",
      receipt: `receipt_bootcamp_${Date.now()}`,
    });

    return res.json({
      configured: true,
      orderId: order.id,
      amount: Number(order.amount) / 100,
      currency: order.currency,
      keyId: keyId,
    });
  } catch (error: any) {
    console.error("Razorpay order creation failed:", error);
    return res.status(500).json({
      error: "Failed to create order on Razorpay",
      message: error?.message || String(error)
    });
  }
});

// 3. Setup Vite Middleware or Static Production Build
async function configureServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server fully running on http://localhost:${PORT}`);
  });
}

configureServer().catch((err) => {
  console.error("Failure starting full stack server:", err);
});
