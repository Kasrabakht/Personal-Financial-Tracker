import { createContext, useContext,useEffect,useState } from "react";

const FinancialRecordContext = createContext({
  records: [], // array of records
  addRecord: () => {}, // function placeholder
  updateRecord: () => {}, // function placeholder
});

export default FinancialRecordContext;

export const FinancialRecordProvider = ({ children }) => {
  const [records, setRecords] = useState([]);

  const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const fetchRecords = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  console.log("BASE =", BASE); // sanity check
  const res = await fetch(`${BASE}/api/financial-records/mine`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GET /mine -> ${res.status}: ${text}`);
  }
  setRecords(await res.json());
};

  useEffect(()=>{
    fetchRecords();
  },[])


  const addRecord = async (record) => 
    {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please log in again.");
    const response= await fetch("http://localhost:5000/api/financial-records",
      {method: "POST",
       headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,   // ← required
    },
    body: JSON.stringify(record),   });


  
  try {
  if (response.ok) {
    const newRecord = await response.json();
    setRecords((prev) => [...prev, newRecord]);
  }
   } catch (err) {
  console.log(err);
    }
};

  const updateRecord = (id, updatedRecord) => {
    setRecords((prev) =>
      prev.map((rec) => (rec.id === id ? updatedRecord : rec))
    );
  };

  return (
    <FinancialRecordContext.Provider
      value={{ records, addRecord, updateRecord }}
    >
      {children}
    </FinancialRecordContext.Provider>
  );
}

export const useFinancialRecords=()=>
{
  const context=useContext(FinancialRecordContext);
  if(!context)
  {
    throw new Error
      (
      "useFinancialRecords must be used within a FinancialRecordProvider"
    );
  }

  return context;
}