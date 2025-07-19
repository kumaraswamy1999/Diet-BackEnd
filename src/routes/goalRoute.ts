import express from "express";
import { createGoal, getGoalById } from "../modules/goals/goals.controller";


const router = express.Router();

router.post("/", createGoal);
router.get("/:userId", getGoalById);

export default router;
