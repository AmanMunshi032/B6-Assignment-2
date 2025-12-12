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
const deletevehicles = async (req: Request, res: Response) => {
  try {
    const vehicleId = Number(req.params.vehicleId );
    const role = req.user?.role;
    if (isNaN(vehicleId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid vehicle ID",
      });
    }

    // Check admin role
    if (role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can delete vehicles",
      });
    }

    const result = await vehiclesservice.deletevehicles(vehicleId);
    if ( !result.success ) {
      res.status(404).json(result);
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle deleted successfully",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
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