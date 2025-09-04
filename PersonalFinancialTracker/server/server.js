import express from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-router.js"
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

const app =express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

const mongooseUrl=process.env.MONGO_URI;
mongoose.connect(mongooseUrl).then(()=>console.log("CONNECTED TO MONGODB"))
.catch((err)=>console.error("Failed to Connect",err));

app.use("/api/financial-records",financialRecordRouter);
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

