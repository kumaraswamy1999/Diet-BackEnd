import express from "express";
import { createBMI, getBMIByUserAndType } from "../modules/bmi/bmi.controller";


const router = express.Router();

router.post("/createBMI", createBMI);
//router.get("/getBMI/:goalId", getBMIByGoalId);
router.get("/getBMI/:userId/:type", getBMIByUserAndType);

export default router;
