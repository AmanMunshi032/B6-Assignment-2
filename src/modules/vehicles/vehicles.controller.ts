import { Request, Response } from "express";
import { vehiclesservice } from "./vehicles.service";

const  createvehicles = async( req:Request,res:Response)=>{
    const {vehicle_name,type,registration_number,daily_rent_price,availability_status}=req.body;
 try {
     const result = await vehiclesservice.createvehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status)
    //  console.log(result.rows[0]);
     res.status(201).json({
       success: true,
       message: "Vehicle created successfully",
       data: result.rows[0],
     });
   } catch (err:any) {
     res.status(500).json({
       success: false,
       message: err.message,
     });
   }
 
}

const getvehicles = async (req:Request,res:Response)=>{
 try{
    const result = await vehiclesservice.getvehicles()
  res.status(200).json({
    success:true,
    message:"Vehicles retrieved successfully",
    data:result.rows
  })
  }catch(err:any){
  res.status(500).json({
    success:false,
    message:err.message
  })
  }
}

const getSinglevehicles = async (req: Request, res: Response) => {

  try {
    const result = await vehiclesservice.getSinglvehicles(req.params.vehicleId as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "vehicles not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle retrieved successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const updatevehicles = async (req:Request, res:Response) => {

  try {
    const result = await vehiclesservice.updatevehicles(req.body,req.params.vehicleId as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "vehicles not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "vehicles updated successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

 const deletevehicles = async (req:Request, res:Response) => {
  try {
  
    const result = await vehiclesservice.deletevehicles(req.params.vehicleId as string);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    return res.json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to delete vehicle",
    });
  }
};



export const vehiclescontroller = {
    createvehicles,
    getvehicles,
    getSinglevehicles,
    updatevehicles,
    deletevehicles
}