


import { Request, Response } from "express";
import BMIReport from '../../models/bmi';

// Utility to calculate BMI and category
const calculateBMI = (weight: number, height: number) => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  let category: 'underweight' | 'normal' | 'overweight' | 'obese';

  if (bmi < 18.5) category = 'underweight';
  else if (bmi < 25) category = 'normal';
  else if (bmi < 30) category = 'overweight';
  else category = 'obese';

  return { bmi: parseFloat(bmi.toFixed(2)), category };
};

// POST /api/bmi/createBMI
export const createBMI = async (req: Request, res: Response) => {
  try {
    const { userId, type, height, weight, personalInfo } = req.body;
    const { bmi, category } = calculateBMI(weight, height);

    const newReport = new BMIReport({
      userId,
      type,
      height,
      weight,
      BMI: bmi,
      category,
      personalInfo,
    });

    const saved = await newReport.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to create BMI report", error });
  }
};

// GET /api/bmi/getBMI/:goalId
export const getBMIByGoalId = async (req: Request, res: Response) => {
  try {
    const report = await BMIReport.findById(req.params.goalId);
    if (!report) return res.status(404).json({ message: "BMI report not found" });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error fetching BMI report", error });
  }
};

// GET /api/bmi/getBMI/:userId/:type
export const getBMIByUserAndType = async (req: Request, res: Response) => {
  try {
    const { userId, type } = req.params;
    const reports = await BMIReport.find({ userId, type });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching BMI reports", error });
  }
};
