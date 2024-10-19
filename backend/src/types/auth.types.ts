// src/types/auth.types.ts
import { Request } from 'express';
import { JwtPayload as JwtPayloadBase } from 'jsonwebtoken';

export interface RegisterUserInput {
  email: string;
  password: string;
  name: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface CustomJwtPayload extends JwtPayloadBase {
  userId: number;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: CustomJwtPayload;
}

export interface UserProfile {
    id: number;
    email: string;
    name: string;
    address?: string;
    photoUrl?: string;
  }