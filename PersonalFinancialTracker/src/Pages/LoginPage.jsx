import React, { useState } from "react";
import email_icon from "../assets/email.jpg"
import "../Styles/Login.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { email } from "zod";
import { login, signup } from "../Context/logIn.jsx"; 






function loginPage()
{
  const [mode,setMode]=useState("Login");
  const [form,setForm]=useState({username:"",email:"",password:""});

  const isLogin=mode==='Login'
  const navigate=useNavigate();
  const location=useLocation();
  const {signIn}=useAuth();

  const from=location.state?.form?.pathname|| "/dashboard";

   

  function handleChanges(e)
  {
    const{name,value}=e.target;
    setForm((f)=>({...f, [name]:value}));
  }

  async function handleSubmit(e)
  {
    e.preventDefault();

    
    if (!form.email.trim() || !form.password.trim()) return;
    if (!isLogin && !form.username.trim()) return;

    try{
      const{user,token}=isLogin ? (await login({email:form.email, password:form.password})):
      (await signup({username: form.username, email:form.email,password:form.password}))

      localStorage.setItem("token",token);
      localStorage.setItem("user", JSON.stringify(user));
      signIn(user);
      navigate(form,{replace:true});
  

    }
    catch(err)
      {
    // on failure, ensure you're NOT authenticated
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert(err.message || "Invalid credentials");  // do NOT navigate
      }

    if(isLogin)
    {
      console.log("LOGIN →", { email: form.email, password: form.password })
    }
    else
    {
        console.log("SIGNUP →", form);
        signIn({username:form.username,email:form.email})

    }
    navigate(from, { replace: true });
  }

  return(
   <div className="container">
     <div className="header"><h1 className="header-title">{isLogin ? "Login":"Sign Up"}</h1>
        <form className="submit" onSubmit={handleSubmit}>
         {!isLogin && (
          <div className="username">
           <input
           type="text"
           value={form.username}
           name="username"
           placeholder="username"
           onChange={handleChanges}
           atouCompelet="username"
           requierd
           />
           </div>)}

         <div className="email">
          <input type="email"
          onChange={handleChanges}
          name="email"
          value={form.email}
          placeholder="Email"
          atouCompelet="email"
          requierd/>

         </div>

         <div className="password">
          <input type="password"
          onChange={handleChanges}
          name="password"
          value={form.password}
          placeholder="Password"
           autoComplete={isLogin ? "current-password" : "new-password"}
          requierd/>
         </div>


         {isLogin && (<div className="forget-password">
           Forgot Password? <a href="#reset">Click Here!</a></div> )}

            <button className="Submit" type="submit">
              {isLogin ? "Log In" : "Creat Accout"}

            </button>
        </form>

      <div className="no-account">
       {isLogin ? (
       <>
       <span>Don’t have an account?</span>
      <button
        type="button"
        className="linklike"
        onClick={() => setMode("signup")}
        >
        Sign up!
      </button>
    </>
  ) : (
    <>
      <span>Already have an account?</span>
      <button
        type="button"
        className="linklike"
        onClick={() => setMode("Login")}
      >
        Login
      </button>
    </>
  )}
  </div>

    </div>

  </div>

)
}
export default loginPage;