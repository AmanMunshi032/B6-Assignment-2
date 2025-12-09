import express from "express";
import { vehiclescontroller } from "./vehicles.controller";
import auth from "../../middlewares/auth";
const router = express.Router()
router.post("/",vehiclescontroller.createvehicles)
router.get ("/",auth("admin","customer"),vehiclescontroller.getvehicles)
router.get("/:vehicleId",vehiclescontroller.getSinglevehicles)
router.put("/:vehicleId",vehiclescontroller.updatevehicles)
router.delete("/:vehicleId",vehiclescontroller.deletevehicles)

export const vehiclesrouter= router;