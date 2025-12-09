import { Router } from "express";
import { authcontroller } from "./auth.controller";
const router = Router();

router.post("/signup",authcontroller.signup)
router.post("/signin",authcontroller.Login)

export const authrouter = router;