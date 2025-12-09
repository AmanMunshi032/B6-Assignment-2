import { pool } from "../../config/db";


const getuser = async ()=>{
    const result = await pool.query(`SELECT * FROM users`);
    return result
}
const updateuser = async (payload: Record<string, unknown>, userId: string) => {
  const {name,email,phone,role} = payload;

  const result = await pool.query(
    `UPDATE users
     SET name = $1, 
         email = $2, 
         phone = $3, 
         role = $4
     WHERE id = $5
     RETURNING *`,
    [ name,email, phone,role,userId]
  );

  return result;
};
const deleteuser = async (userId: string) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [userId]
  );
  return result
}   
export const userServices ={
    getuser,
    updateuser,
    deleteuser
}  