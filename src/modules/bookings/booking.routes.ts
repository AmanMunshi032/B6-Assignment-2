import express from "express"
import { bookingcontroller } from "./booking.controller";

const router = express.Router()

router.post("/",bookingcontroller.creatabooking)
// router.get("/", bookingcontroller.getBookings);
// router.put("/:bookingId", bookingcontroller.updateBooking);

export const bookingRouter = router