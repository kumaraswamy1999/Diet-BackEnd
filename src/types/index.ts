export interface IUser {
  userId: string;
  name: string;
  dob: string;
  email: string;
  role: 'user' | 'dietician' | 'admin';
  gender: string;
  password: string;
  experience?: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

