import mongoose, { Schema, Document } from "mongoose";

interface PersonalInfo {
  name?: string;
  age?: number;
  gender?: string;
  [key: string]: any;
}

export interface IBMIReport extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'self' | 'other';
  height: number;
  weight: number;
  BMI: number;
  category: 'underweight' | 'normal' | 'overweight' | 'obese';
  personalInfo: PersonalInfo;
  createdAt: Date;
  updatedAt: Date;
}

const BMIReportSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ['self', 'other'], required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    BMI: { type: Number, required: true },
    category: { type: String, enum: ['underweight', 'normal', 'overweight', 'obese'], required: true },
    personalInfo: { type: Object, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model<IBMIReport>("BMIReport", BMIReportSchema);