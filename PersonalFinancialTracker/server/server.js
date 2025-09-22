import express from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-router.js"
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth-router.js";
import requireAuth from "./middlewer/requireAuth.js";


dotenv.config();

const app =express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

const mongooseUrl=process.env.MONGO_URI;
mongoose.connect(mongooseUrl).then(()=>console.log("CONNECTED TO MONGODB"))
.catch((err)=>console.error("Failed to Connect",err));

app.use("/api/auth",authRouter);
app.get("/api/auth/me", requireAuth, async (req, res) => {
  // req.user has { id, email } from token
  // you could fetch more if needed
  res.json({ id: req.user.id, email: req.user.email });
});


app.use("/api/financial-records",financialRecordRouter);
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

