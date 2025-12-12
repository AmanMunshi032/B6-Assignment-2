
import { Request, Response } from "express";
import { bookingservice } from "./booking.service";

 const creatabooking = async (req: Request, res: Response) => {
  try {
      const customerId = req.user?.id; // coming from auth middleware

    const booking = await bookingservice.createBooking(req.body,customerId);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message ,
    });
  }
};

const getbooking = async (req: Request, res: Response) => {
  try {
      //  const bookingId = Number(req.params.bookingId);
       const user= req.user // admin / customer
      
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: user not found in request",
      });
    }

    const result = await bookingservice.getbooking(user,req.params.userId as string);

    res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

 const updateBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = Number(req.params.bookingId);
    const role = req.user?.role; // admin / customer
    const userId = req.user?.id;
    const { status } = req.body; // "cancelled" | "returned"

    const result = await bookingservice.updateBooking(
      bookingId,
      role,
      userId,
      status
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        status === "cancelled"
          ? "Booking cancelled successfully"
          : "Booking marked as returned successfully",
      data: result, // full returned data
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
export const bookingcontroller={
creatabooking,
getbooking,
updateBooking 
}