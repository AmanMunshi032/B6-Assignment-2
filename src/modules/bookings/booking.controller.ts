// import { Request, Response } from "express";
// import { bookingService } from "./booking.service";


// const createBooking = async (req: Request, res: Response) => {
//   try {
//     const user = (req as any).user;
//     const booking = await bookingService.createBooking (req.body, user.id);

//     res.status(201).json({
//       message: "Booking created successfully",
//       booking,
//     });
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // const getBookings = async (req: Request, res: Response) => {
// //   try {
// //     const user = (req as any).user;

// //     const bookings = await bookingService.getBookings(user);
// //     res.json(bookings);
// //   } catch (error: any) {
// //     res.status(400).json({ message: error.message });
// //   }
// // };

// //  const updateBooking = async (req: Request, res: Response) => {
// //   try {
// //     const user = (req as any).user;
// //     const bookingId = parseInt(req.params.bookingId);

// //     const result = await bookingService.updateBooking(
// //       bookingId,
// //       req.body.status,
// //       user
// //     );

// //     res.json({ message: "Booking updated", result });
// //   } catch (error: any) {
// //     res.status(400).json({ message: error.message });
// //   }
// // };
// export const bookingcontroller ={
//  createBooking,
// //  getBookings,
// //  updateBooking
// }

import { Request, Response } from "express";
import bookingservice from "./booking.service";
// import { bookingservice } from "./booking.service";

 const creatabooking = async (req: Request, res: Response) => {
  try {
    const customerId = req.user?.id; // coming from auth middleware

    const booking = await bookingservice.createBooking(req.body, customerId);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
export const bookingcontroller={
creatabooking
}