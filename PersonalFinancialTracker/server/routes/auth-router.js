import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


const router = express.Router();

// Helper: create JWT
function signToken(user) {
  return jwt.sign(
    { id: user._id.toString(), email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

router.post("/signup",async (req,res)=>
{
    try{
        const {username,email,password}=req.body;
        if (!username?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existing= await User.findOne({email});
    if(existing) return res.status(409).json({ error: "Email already in use" });

    const passwordHash=await bcrypt.hash(password,12);
    const user = await User.create({ username, email, passwordHash });
    const token = signToken(user);

    res.status(201).json({
      user: { _id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
});

router.post("/login",async (req,res)=>
{
    try{
        const {email,password}=req.body;

        const user=await User.findOne({email});
        if(!user) return res.status(401).json({error:"Invalid credentials"});

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return res.status(401).json({ error: "Invalid credentials" });

        const token=signToken(user);
        res.json({
            user:{_id:user._id,username:user.username,email:user.email},
            token,
        })
    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Login failed" });

    }
})
export default router;
