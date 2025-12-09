// import { pool } from "../../config/db";

// interface BookingInput {
//   vehicle_id: number;
//   rent_start_date: string;
//   rent_end_date: string;
// }
// const createBooking = async (data: any, customerId: number) => {
//   const { vehicle_id, rent_start_date, rent_end_date } = data;

//   // 1. Get vehicle info
//   const vehicleRes = await pool.query(
//     `SELECT * FROM vehicles WHERE id = $1`,
//     [vehicle_id]
//   );

//   if (vehicleRes.rows.length === 0) {
//     throw new Error("Vehicle not found");
//   }

//   const vehicle = vehicleRes.rows[0];

//   if (vehicle.availability_status !== "available") {
//     throw new Error("Vehicle is not available for booking");
//   }

//   // 2. Validate dates
//   const start = new Date(rent_start_date);
//   const end = new Date(rent_end_date);

//   if (end <= start) {
//     throw new Error("End date must be after start date");
//   }

//   const days =
//     (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

//   const total_price = days * vehicle.daily_rent_price;

//   // 3. Create booking
//   const bookingRes = await pool.query(
//     `INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
//      VALUES ($1,$2,$3,$4,$5,'active')
//      RETURNING *`,
//     [customerId, vehicle_id, rent_start_date, rent_end_date, total_price]
//   );

//   // 4. Update vehicle to booked
//   await pool.query(
//     `UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`,
//     [vehicle_id]
//   );

//   return bookingRes.rows[0];
// };

// const getBookings = async (role: string, userId: number) => {
//   if (role === "admin") {
//     const result = await pool.query(`SELECT * FROM bookings`);
//     return result.rows;
//   }

//   // Customer → own bookings only
//   const result = await pool.query(
//     `SELECT * FROM bookings WHERE customer_id = $1`,
//     [userId]
//   );

//   return result.rows;
// };

// const updateBooking = async (bookingId: number, role: string, userId: number) => {
//   const bookingRes = await pool.query(
//     `SELECT * FROM bookings WHERE id = $1`,
//     [bookingId]
//   );

//   if (bookingRes.rows.length === 0) {
//     throw new Error("Booking not found");
//   }

//   const booking = bookingRes.rows[0];

//   // CUSTOMER → Cancel booking (before start date)
//   if (role === "customer") {
//     if (booking.customer_id !== userId) {
//       throw new Error("You are not allowed to update this booking");
//     }

//     const today = new Date();
//     const start = new Date(booking.rent_start_date);

//     if (today >= start) {
//       throw new Error("Cannot cancel booking after start date");
//     }

//     const result = await pool.query(
//       `UPDATE bookings SET status = 'cancelled' WHERE id = $1 RETURNING *`,
//       [bookingId]
//     );

//     return result.rows[0];
//   }

//   // ADMIN → Mark as returned
//   if (role === "admin") {
//     const result = await pool.query(
//       `UPDATE bookings SET status = 'returned' WHERE id = $1 RETURNING *`,
//       [bookingId]
//     );

//     // Update vehicle to available again
//     await pool.query(
//       `UPDATE vehicles SET availability_status = 'available' 
//        WHERE id = $1`,
//       [booking.vehicle_id]
//     );

//     return result.rows[0];
//   }
// };

// export const bookingService = {
//   createBooking,
//   getBookings,
//   updateBooking,
// };


import dayjs from "dayjs";
import { pool } from "../../config/db";

 const bookingservice = {
  createBooking: async (payload: any, customerId: string) => {
    const { vehicleId, startDate, endDate } = payload;

    // Validate dates
    if (!vehicleId || !startDate || !endDate) {
      throw new Error("vehicleId, startDate and endDate are required");
    }

    // 1️⃣ Check vehicle availability
    const vehicleRes = await pool.query(
      `SELECT * FROM vehicles WHERE id = $1`,
      [vehicleId]
    );

    if (vehicleRes.rows.length === 0) {
      throw new Error("Vehicle not found");
    }

    const vehicle = vehicleRes.rows[0];

    if (vehicle.availability_status !== "available") {
      throw new Error("Vehicle is not available");
    }

    // 2️⃣ Calculate total days
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    const days = end.diff(start, "day");

    if (days <= 0) {
      throw new Error("endDate must be after startDate");
    }

    // 3️⃣ Calculate total price
    const totalPrice = days * vehicle.daily_rent_price;

    // 4️⃣ Create booking
    const bookingRes = await pool.query(
      `INSERT INTO bookings
       (customer_id, vehicle_id, start_date, end_date, total_price, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [customerId, vehicleId, startDate, endDate, totalPrice, "booked"]
    );

    // 5️⃣ Update vehicle status to booked
    await pool.query(
      `UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`,
      [vehicleId]
    );

    return bookingRes.rows[0];
  },
};
export  default  bookingservice