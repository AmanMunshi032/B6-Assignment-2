
import { pool } from "../../config/db";

// ================================
// Create Booking
// ================================
const createBooking = async (data: any, customerId: number) => {
  const {customer_id, vehicle_id, rent_start_date, rent_end_date } = data;

  // Validate input
  if (!vehicle_id || !rent_start_date || !rent_end_date) {
    throw new Error("vehicle_id, rent_start_date and rent_end_date are required");
  }

  // Date check
  if (new Date(rent_end_date) <= new Date(rent_start_date)) {
    throw new Error("End date must be after start date");
  }

  // Get vehicle info
  const vehicleResult = await pool.query(
    `SELECT id, vehicle_name, daily_rent_price, availability_status FROM vehicles WHERE id = $1`,
    [vehicle_id]
  );

  if (vehicleResult.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const vehicle = vehicleResult.rows[0];

  if (vehicle.availability_status !== "available") {
    throw new Error("Vehicle is not available");
  }

  // Check booking conflicts
  const checkBooking = await pool.query(
    `SELECT * FROM bookings
     WHERE vehicle_id = $1 
     AND status = 'active'
     AND (
       rent_start_date <= $3 AND rent_end_date >= $2
     )`,
    [vehicle_id, rent_start_date, rent_end_date]
  );

  if (checkBooking.rows.length > 0) {
    throw new Error("Vehicle is already booked for these dates");
  }

  // Calculate total price
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);
  const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));

  const totalPrice = vehicle.daily_rent_price * diffDays;

  // Insert booking
  const booking = await pool.query(
    `INSERT INTO bookings
      (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES ($1, $2, $3, $4, $5, 'active')
     RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, totalPrice]
  );

  // Update vehicle status → booked
  await pool.query(
    `UPDATE vehicles SET availability_status= 'booked' WHERE id = $1`,
    [vehicle_id]
  );

  return {
    ...booking.rows[0],
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };
};

// ================================
// Get Bookings (Admin OR Customer)
// ================================
const getbooking = async (user: any,userId:string) => {
  if (user.role === "admin") {
    const result = await pool.query(`SELECT * FROM bookings`);
    return result;
  }

  const result = await pool.query(
    `SELECT * FROM bookings WHERE customer_id = $1`,
    [userId]
  );
  return result;
};

const updateBooking = async (bookingId: number,role:string,userId:number,
  status: string
) => {
  // Fetch booking
  const bookingResult = await pool.query(
    `SELECT * FROM bookings WHERE id = $1`,
    [bookingId]
  );

  if (bookingResult.rowCount === 0) return null;

  const booking = bookingResult.rows[0];

  // Customer rules
if (role === "customer" && status !=="cancelled") {
  throw new Error("Customer can only cancel booking");
}
  // Admin rules
  if (role === "admin" && status !== "returned") {
    throw new Error("Admin must set status to returned");
  }

  // Update booking
  const updatedBooking = await pool.query(
    ` UPDATE bookings  SET status = $1  WHERE id = $2  RETURNING *
    `,
    [status, bookingId]
  );

  // Make vehicle available
  await pool.query(
    `UPDATE vehicles SET availability_status = 'available' WHERE id = $1`,
    [booking.vehicle_id]
  );

  return updatedBooking.rows[0];
};


export const bookingservice = {
  createBooking,
  getbooking,
  updateBooking,
};
