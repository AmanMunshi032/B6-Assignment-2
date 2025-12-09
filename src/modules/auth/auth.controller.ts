import { Request, Response } from "express";
import { authservice } from "./auth.service";

const signup= async (req:Request,res:Response)=>{   
try {
    const result = await authservice.signupuser(req.body)
    console.log(result.rows[0]);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }

}

const Login = async (req:Request,res:Response)=>{
   try {
     const {email,password}=req.body;
     console.log(email,)
     const result = await authservice.Loginauthuser(email,password);
     res.status(201).json({
      success: true,
      message: "Login successfully",
      data: result,
    }); 
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
  }
export const authcontroller = {
    signup,
    Login
    
}