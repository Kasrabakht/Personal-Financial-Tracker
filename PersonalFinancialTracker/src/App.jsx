import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Styles/App.css'
import { Route,Routes,Navigate } from 'react-router-dom'
import LoginPage from "./Pages/LoginPage"
import DashboardPage from "./Pages/DashboardPage"
import RequireAuth from "./RequireAuth"
import { AuthProvider} from "./AuthContext"
import { FinancialRecordProvider } from './Context/financialrecord-context'

function App(props) 
{
 return(
  < AuthProvider>
    <Routes>
     <Route path='/signin' element={<LoginPage />} />

  <Route
   path='/dashboard' 
   element={
    <RequireAuth>
      <FinancialRecordProvider>
        <DashboardPage />
        </FinancialRecordProvider>
    </RequireAuth>
    } />


  <Route path='/' element={<Navigate to='/signin' replace />} />
  <Route path='*' element={<Navigate to='/signin' replace />} />
</Routes>
  </ AuthProvider>
 )
}

export default App
