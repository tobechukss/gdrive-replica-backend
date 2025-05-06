import { User, IUser } from "../models/userModel";
import jwt from 'jsonwebtoken';
import { generateToken } from "../utils/generateToken";

interface RegisterUserParams {
  email: string;
  password: string;
}

interface LoginUserParams {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}


export const signup = async ({
  email,
  password,
}: RegisterUserParams): Promise<{user: Partial<IUser>, token: string}> => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists with this email.');
  }

  const user = new User({
    email,
    password
  });

  await user.save();

  const token = generateToken(user._id.toString());
  return {
    token,
    user: {
      _id: user._id,
      email: user.email,
    },
  };
};

export const login= async ({
  email,
  password,
}: LoginUserParams): Promise<AuthResponse> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password.');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password.');
  }


  const token = generateToken(user._id.toString());

  return {
    token,
    user: {
      id: user._id.toString(),
      email: user.email,
    },
  };
};