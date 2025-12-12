import { pool } from "../../config/db";

const getuser = async ()=>{
    const result = await pool.query(`SELECT id, name, email, phone, role FROM users `);
  
    return result
}
const updateuser = async (payload: Record<string, unknown>, userId: string) => {
  const {name,email,phone,role} = payload;

  const result = await pool.query(
    `UPDATE users SET name = $1, email = $2,phone = $3,role = $4 WHERE id = $5
     RETURNING *`,
    [ name,email,phone,role,userId]
  );

  return result;
};
const deleteuser = async (userId:number) => {
   try{
    //  Check if vehicle exists
    const user = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [userId]
    );

    if (user.rowCount === 0) {
      return { success: false, message: "user not found" };
    }

    // Check active bookings
    const activeBookings = await pool.query(
      `SELECT * FROM bookings 
       WHERE customer_id = $1 AND status = 'active'`,
      [userId]
    );

    if (activeBookings.rows.length > 0 ) {
      return {
        success: false,
        message: "Cannot delete user. Active bookings exist.",
      };
    }
      await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [userId]
  );
  
  return {success:true};
  }catch(err:any){
    throw err.message
  }

 
}   
export const userServices ={
    getuser,
    updateuser,
    deleteuser,
}  