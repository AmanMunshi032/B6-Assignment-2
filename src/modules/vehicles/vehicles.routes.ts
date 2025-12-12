import express from "express";
import { vehiclescontroller } from "./vehicles.controller";
import auth from "../../middlewares/auth";
const router = express.Router()
router.post("/",auth("admin"),vehiclescontroller.createvehicles)
router.get ("/",vehiclescontroller.getvehicles)
router.get("/:vehicleId",vehiclescontroller.getSinglevehicles)
router.put("/:vehicleId",auth("admin") ,vehiclescontroller.updatevehicles)
router.delete("/:vehicleId",auth("admin"),vehiclescontroller.deletevehicles)

export const vehiclesrouter= router;