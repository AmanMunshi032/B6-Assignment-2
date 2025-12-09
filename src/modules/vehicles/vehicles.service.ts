import { pool } from "../../config/db"

const  createvehicles = async(vehicle_name:string,type:string,registration_number:number,daily_rent_price:number,availability_status:string)=>{
    const result = await pool.query(`INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *`,[vehicle_name,type,registration_number,daily_rent_price,availability_status])
  return result;  
}

const getvehicles = async ()=>{
    const result = await pool.query(`SELECT * FROM vehicles`);
    return result
}
const getSinglvehicles = async (vehicleId: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id= $1`, [vehicleId]);

  return result;
};
const updatevehicles = async (payload: Record<string, unknown>, vehicleId: string) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = await pool.query(
    `UPDATE vehicles 
     SET vehicle_name = $1, 
         type = $2, 
         registration_number = $3, 
         daily_rent_price = $4, 
         availability_status = $5 
     WHERE id = $6 
     RETURNING *`,
    [vehicle_name, type, registration_number, daily_rent_price, availability_status, vehicleId]
  );

  return result;
};
const deletevehicles = async (vehicleId: string) => {
  const result = await pool.query(
    "DELETE FROM vehicles WHERE id = $1 RETURNING *",
    [vehicleId]
  );

  return result;
};




export const vehiclesservice = {
    createvehicles,
    getvehicles,
    getSinglvehicles,
    updatevehicles,
    deletevehicles
}