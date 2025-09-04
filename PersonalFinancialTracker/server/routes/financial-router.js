import express, { response } from "express";
import FinancialRecordModel from "../models/financial-record.js"

const router = express.Router();

router.get("/user/:userId",async(request,response)=>
{
    try{
        const {userId}=request.params;
        const records=await FinancialRecordModel.find({userId});

        if(!records || records.length === 0)
        {
            return response.status(404).json({message: "No records found for the user."})

        }
        return response.status(200).json(records);

    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({ error: err.message });

    }
})

router.post("/",async(request,response)=>
{
    try{
        const newRecord=await FinancialRecordModel.create(request.body);

       return response.status(201).json(newRecord);

    }
    catch(err)
    {
         console.error(err);
        return res.status(500).json({ error: err.message });

    }
})

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