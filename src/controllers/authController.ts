import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const signupController = async (req: Request, res: Response) => {
  try {
    console.log("incoming request")
    const { email, password } = req.body;
    const result = await authService.signup({email, password});
    res.status(201).json({ message: 'Signup successful', data: result });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({email, password});
    res.status(200).json({ message: 'Login successful', data: result });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
