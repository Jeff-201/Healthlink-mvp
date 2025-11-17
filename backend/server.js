import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import patientRoutes from './routes/patientRoutes.js';
import triageRoutes from './routes/triageRoutes.js';
import { connectDB } from './config/db.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB using the centralized function
connectDB();

// Example route
app.get("/", (req, res) => {
  res.send("HealthLink API is running successfully 🚀");
});

app.use('/api/patients', patientRoutes);
app.use('/api/triage', triageRoutes);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));