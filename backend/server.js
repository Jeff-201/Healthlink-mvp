import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import patientRoutes from "./routes/patientRoutes.js";
import triageRoutes from "./routes/triageRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

// ---------------------
// CORS CONFIG
// ---------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",                // local development
      "https://healthlink-gold.vercel.app",  // your deployed frontend
    ],
    credentials: true,
  })
);

// For JSON body parsing
app.use(express.json());

// ---------------------
// DATABASE CONNECTION
// ---------------------
connectDB();

// ---------------------
// TEST ROUTE
// ---------------------
app.get("/", (req, res) => {
  res.send("HealthLink API is running successfully 🚀");
});

// ---------------------
// API ROUTES
// ---------------------
app.use("/api/patients", patientRoutes);
app.use("/api/triage", triageRoutes);

// ---------------------
// START SERVER
// ---------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(✅ Server running on port ${PORT})
);