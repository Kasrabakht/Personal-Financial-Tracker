import React from "react";
import { useState } from "react";
import {useFinancialRecords} from "../Context/financialrecord-context.jsx"


export const FinancialRecordForm= () =>
{
    const [description,setDescription]=useState();
    const [amount,setAmount]=useState();
    const [category,setCategory]=useState();
    const [paymentMethod,setPaymentMethod]=useState();
    const {addRecord}=useFinancialRecords();

    const handleSubmit=(e)=>
    {
        e.preventDefault();
        const newRecoard={
        userId:"Username",
        date: new Date(),
        description:description,
        amount:parseFloat(amount),
        category:category,
        paymentMethod:paymentMethod
        }

         
        addRecord(newRecoard);

        setDescription("");
        setAmount("");
        setCategory("");
        setPaymentMethod("");


    }
    return (
    <div className="form-container">
        <form className="financial-form" onSubmit={handleSubmit}>

            <div className="form-input">
                <label>Description:</label>
                <input type="text" required className="input" value={description} onChange={(e)=>setDescription(e.target.value)}></input>
            </div>

            <div className="form-input">
              <label>Amount</label>
              <input type="number" required className="input" value={amount} onChange={(e)=>setAmount(e.target.value)}></input>
            </div>

            <div className="form-input">
                <label>Category</label>
                <select required className="input" value={category} onChange={(e)=>setCategory(e.target.value)}>
                    <option value="">Select a Category</option>
                    <option value="Food">Food</option>
                    <option value="Rent">Rent</option>
                    <option value="Salary">Salary</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>

                </select>

            </div>

            <div className="form-input">
                <lable>Method of Payment </lable>
                <select value={paymentMethod} onChange={(e)=>setPaymentMethod(e.target.value)}>Select Method of Payment
                  <option value="Visa">Visa</option>
                  <option value="Cash">Cash</option>
                  <option value="BanckTransfer">BankTransfer</option>
                </select>

            </div>

            <button className="submit" type="submit">Add Record</button>

            

        </form>
    </div>
)

}