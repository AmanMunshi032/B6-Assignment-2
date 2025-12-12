import express, { Request, Response } from "express"
import initDB from "./config/db"
import { authrouter } from "./modules/auth/auth.routes"
import { vehiclesrouter } from "./modules/vehicles/vehicles.routes"
import { userRouter } from "./modules/users/users.routes"
import { bookingRouter } from "./modules/bookings/booking.routes"

const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//auth router
app.use("/api/v1/auth",authrouter)
//vehicles router 
app.use("/api/v1/vehicles",vehiclesrouter)
//user router
app.use("/api/v1/users",userRouter)
//booking router
app.use("/api/v1/bookings",bookingRouter)

//initilazing DB
 initDB()

 app.use((req,res)=>{
    res.status(404).json({
        success:true,
        messaaage:"Route not found ",
        path:req.path
    })
 })
export default app ;