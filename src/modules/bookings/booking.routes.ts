import express from "express"
import { bookingcontroller } from "./booking.controller";
import auth from "../../middlewares/auth";

const router = express.Router()

router.post("/",auth("admin","customer"),bookingcontroller.creatabooking)
router.get("/",auth("admin","customer") ,bookingcontroller.getbooking);
router.put("/:bookingId", auth("admin","customer"), bookingcontroller.updateBooking);

export const bookingRouter = router