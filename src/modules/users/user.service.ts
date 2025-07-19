import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../../types';
import Users from '../../models/Users';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const registerUserService = async (payload: IUser) => {
  const existingUser = await Users.findOne({ email: payload.email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const userId = Math.floor(10000000 + Math.random() * 90000000);

  const newUser = new Users({
    ...payload,
    userId:userId,
    password: hashedPassword,
  });

  await newUser.save();

  return {
    message:"user created successfully",
    user: newUser,
  };
};

export const loginUserService = async (userData: {
  email: string;
  password: string;
}) => {
  const { email, password } = userData;

  const user = await Users.findOne({ email }).lean();
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: '1h',
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user;

  return { token, user: userWithoutPassword };
};
