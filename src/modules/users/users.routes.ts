import express, { Router } from "express"
import { usercontroller } from "./users.controller"
import auth from "../../middlewares/auth"
const router = express.Router()

router.get("/",auth("admin") ,usercontroller.getuser)
router.put("/:userId",auth("admin","customer"),usercontroller.updateuser)
router.delete("/:userId",auth("admin"),usercontroller.deleteuser)

export const userRouter = router