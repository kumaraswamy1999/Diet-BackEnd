import { Request, Response, NextFunction } from 'express';
import { registerUserService, loginUserService } from './user.service';
import { ApiError } from '../../utils/apiError';
import User from '../../models/Users';

export const AuthLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await loginUserService(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error instanceof Error ? error : new ApiError(500, 'Unknown error'));
  }
};

export const RegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await registerUserService(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error instanceof Error ? error : new ApiError(500, 'Unknown error'));
  }
};


export const getDietician = async(req:Request,res:Response,next:NextFunction)=>{
  try{
  const dieticians = await User.find({ role: "dietician" });
  res.json(dieticians);

  }catch(error){
    next(error instanceof Error ? error : new ApiError(500, 'Unknown error'));
  }
}