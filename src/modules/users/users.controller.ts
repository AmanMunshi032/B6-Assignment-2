import { Request, Response } from "express";
import { userServices } from "./users.service";

const getuser = async (req:Request,res:Response)=>{
  try{
    const result = await userServices.getuser()
  res.status(200).json({
    success:true,
    message:"Users retrieved successfully",
    data:result.rows
  })
  }catch(err:any){
  res.status(500).json({
    success:false,
    message:err.message
  })
  }

}
const updateuser = async (req:Request, res:Response) => {

  try {
    const result = await userServices.updateuser(req.body,req.params.userId as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteuser = async (req:Request, res:Response) => {
  try {
  
  const result = await userServices.deleteuser(req.params.userId as unknown as number);

    if (!result.success) {
      res.status(404).json(result);
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
       
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to delete user",
    });
  }
};

export const usercontroller = {
    getuser,
    updateuser,
    deleteuser
}