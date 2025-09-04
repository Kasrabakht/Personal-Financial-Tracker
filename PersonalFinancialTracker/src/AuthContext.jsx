import { createContext,useContext,useEffect,useState } from "react";
import { json } from "zod";
const AuthContext=createContext(null);

export function  AuthProvider({children})
{
    const [user,setUser]=useState(()=>
    {
    try
    {
        const saved=localStorage.getItem("user");
        return saved ? JSON.parse(saved):null 

    }
    catch
    {
        return null
    }})


useEffect(()=>{
    if (user) localStorage.setItem("user",JSON.stringify(user));
    else localStorage.removeItem("user")
},[user]);

const signIn=({username,email})=>setUser({username,email});
const signOut=()=>setUser(null);

return(
    <AuthContext.Provider value={{user,signIn,signOut}}>
        {children}
    </AuthContext.Provider>
);
}
export function useAuth()
{
    return useContext(AuthContext)
}