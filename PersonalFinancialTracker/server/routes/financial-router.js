import express, { response } from "express";
import FinancialRecordModel from "../models/financial-record.js"
import auth from "../middlewer/requireAuth.js";

const router = express.Router();

router.get("/mine", auth, async (req, res) => {
  try {
    const records = await FinancialRecordModel
      .find({ userId: req.userId })
      .sort({ createdAt: -1 });
    res.status(200).json(records);         // [] if none
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});


router.post("/", auth, async (req, res) => {
  const { amount, date, category, description, paymentMethod } = req.body;
  const doc = await FinancialRecordModel.create({
    userId: req.userId,   // 👈 server sets it
    amount, date, category, description, paymentMethod,
  });
  return res.status(201).json(doc);
});


router.put("/:id",async(request,response)=>
{
    try{
        const {id}=request.params;
        const updated = await FinancialRecordModel.findByIdAndUpdate(id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return response.status(404).json({ message: "Record not found." });
    return response.status(200).json(updated);
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: err.message });
  }
})

router.delete("/:id",async(request,response)=>
{
    try
    {

    const {id}=request.params;
    const deleted = await FinancialRecordModel.findByIdAndDelete(id);
    if (!deleted) return response.status(404).json({ message: "Record not found." });
    return response.status(200).json(deleted);
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: err.message });
  }
})



export default router; 