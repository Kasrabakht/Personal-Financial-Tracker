import React from "react";
import { FinancialRecordForm } from "./Finacial-Record-Form";
import { FinancialRecordList } from "./Financial-Record-List";
import { useAuth } from "../AuthContext";
import { FinancialRecordProvider } from "../Context/financialrecord-context";

function DashboardPage()
{
    const { user, signOut } = useAuth();
    return(
         <FinancialRecordProvider>
      <div className="dashboard-container">
        <h1>Welcome {user?.username || "User"}</h1>
        <FinancialRecordForm />
        <FinancialRecordList />
      </div>
    </FinancialRecordProvider>
    );
}

export default DashboardPage;