import { createContext, useContext,useEffect,useState } from "react";

const FinancialRecordContext = createContext({
  records: [], // array of records
  addRecord: () => {}, // function placeholder
  updateRecord: () => {}, // function placeholder
});

export default FinancialRecordContext;

export const FinancialRecordProvider = ({ children }) => {
  const [records, setRecords] = useState([]);

  const fetchRecords=async()=>
  {
    const response=await fetch(`http://localhost:5000/api/financial-records/user/:${userId}`);
    if(response.ok)
    {
      const records=await response.json();
      setRecords(records);
    }
  }

  useEffect(()=>{
    fetchRecords();
  },[])

  const addRecord = async (record) => {
    const response= await fetch("http://localhost:5000/api/financial-records",
      {method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record)})


  
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