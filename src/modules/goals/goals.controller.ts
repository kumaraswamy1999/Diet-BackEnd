import { Request, Response } from "express";
import Goal from '../../models/Goal';

export const createGoal = async (req: Request, res: Response) => {
  try {
    const newRequest = new Goal(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({ message: "Failed to create diet request", error });
  }
};

export const getGoalById = async (req: Request, res: Response) => {
  try {
    const requests = await Goal.find({ userId: req.params.userId }).populate("dieticianId bmiReport");
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch diet requests", error });
  }
};
