import { Request, Response } from "express";
import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
 import jwt from 'jsonwebtoken';
import config from "../../config";
// import config from "../../config";
const signupuser = async (payload:Record<string, unknown>)=>{
   const {name,email,password,phone,role}=payload;
    const haspassword = await bcrypt.hash(password as string ,10)
    const result = await pool.query(`INSERT INTO users (name,email,password,phone,role)VALUES($1,$2,$3,$4,$5) RETURNING id, name, email, phone, role`,[name,email,haspassword,phone,role]);
    return result
}

const Loginauthuser = async (email:string,password:string) => {
  // check user
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

  if (result.rows.length === 0) {
    return null; // user not found
  }
  const user = result.rows[0];
  
  const match = await bcrypt.compare(password,user.password);
 
  if (!match) {
    return false; // wrong password
  }

  const token = jwt.sign({name:user.name,email:user.email,role:user.role},config.jwt_secret,{
    expiresIn:"7d"
    
  })
 delete user.password;
  // MUST return user on success!
  return {token,user};
};


 
export const authservice = {
   signupuser,
  Loginauthuser
}

