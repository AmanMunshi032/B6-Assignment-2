import express, { Request, Response } from "express"
import initDB from "./config/db"
import config from "./config"
import { authrouter } from "./modules/auth/auth.routes"
import { vehiclesrouter } from "./modules/vehicles/vehicles.routes"
import { userRouter } from "./modules/users/users.routes"
import { bookingRouter } from "./modules/bookings/booking.routes"

const app = express()
const port =config.port

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//parse 
// app.use(express.json())
//auth router
app.use("/api/v1/auth",authrouter)
//vehicles router 
app.use("/api/v1/vehicles",vehiclesrouter)
//user router
app.use("/api/v1/users",userRouter)
//booking router
app.use("/v1/bookings",bookingRouter)

//initilazing DB
 initDB()

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
