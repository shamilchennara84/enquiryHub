import {  IUserResponse } from "../src/interfaces/schemaInterfaces/userInterface";
import jwt, { JwtPayload } from "jsonwebtoken";


  export async function generateAccessToken(user:IUserResponse): Promise<string> {
    const KEY = process.env.JWT_SECRET_KEY;
    if (KEY !== undefined) {
      const exp = Math.floor(Date.now() / 1000) + 3 * 60 * 60; // 3 hrs
      return jwt.sign({ userId:user._id, exp, iat: Date.now() / 1000 }, KEY);
    }
    throw new Error("JWT Key is not defined");
  }

  export async function decodeToken(token: string): Promise<jwt.JwtPayload> {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      throw new Error("Access Denied: Token Expired");
    }
    return decoded;
  }

 