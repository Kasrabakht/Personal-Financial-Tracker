import React from "react";
import { FinancialRecordForm } from "./Finacial-Record-Form";
import { FinancialRecordList } from "./Financial-Record-List";
import { useAuth } from "../AuthContext";
import { FinancialRecordProvider } from "../Context/financialrecord-context";
import { getRecords } from "../Context/logIn";
import { useState,useEffect } from "react";

function DashboardPage()
{
    const { user, signOut } = useAuth();
    const[records,setRecords]=useState([]);

    useEffect(()=>
    {
      if(user?.id) return;
      getRecords(user.id).then(setRecords).catch((e)=>console.error(e))
    },[user?.id]);
    return(
         <FinancialRecordProvider>
      <div className="dashboard-container">
        <h1>Welcome {user.username || "User"}</h1>
        <FinancialRecordForm />
        <FinancialRecordList />
      </div>
    </FinancialRecordProvider>
    );
}

export default DashboardPage;