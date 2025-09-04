import mongoose from "mongoose"


const financialRecordSchema=mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true },
  description: {type:String,required:true},
  paymentMethod:{type:String,requied:true}
})

const FinancialRecord = mongoose.model("FinancialRecord", financialRecordSchema);

export default FinancialRecord;