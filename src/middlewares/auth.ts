import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config"

const auth =(...roles:string[])=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
          const authHeader= req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "You are not allowed!!" });       
      }
      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "You are not allowed!!" });
      }
      try{
      const decoded = jwt.verify(token, config.jwt_secret) as JwtPayload;
      // console.log({decoded})
      (req as any).user = decoded ;
         //["admin"]
      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(500).json({
          error: "unauthorized!!!",
        });
      }
        next()

      }catch(err:any){
         return res.status(500).json({
            success:false,
            message:err.message

         })
      }
    }
}
export default auth