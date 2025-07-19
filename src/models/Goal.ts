import mongoose, { Schema, Document } from "mongoose";

export interface IGoalRequest extends Document {
  userId: mongoose.Types.ObjectId;
  dieticianId: mongoose.Types.ObjectId;
  height: number;
  currentWeight: number;
  targetedWeight: number;
  bmiReport: mongoose.Types.ObjectId;
  healthDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

const GoalSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    dieticianId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    height: { type: Number, required: true },
    currentWeight: { type: Number, required: true },
    targetedWeight: { type: Number, required: true },
    bmiReport: { type: Schema.Types.ObjectId, ref: "BMIReport", required: true },
    healthDescription: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IGoalRequest>("GoalSchema", GoalSchema);
