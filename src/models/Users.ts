
import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types';


const UserSchema: Schema<IUser> = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dob: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ['user', 'dietician', 'admin'],
      default: 'user',
      required: true,
    },
    gender: { type: String, required: true,enum:['male','female','other'] },
    password: { type: String, required: true },
    experience: { type: Number,default:null },
    description: { type: String,default:null },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
