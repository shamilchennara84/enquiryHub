import config from "../config/config";
import { IUserResponse } from "../src/interfaces/schemaInterfaces/userInterface";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function generateAccessToken(user: IUserResponse): Promise<string> {
  const KEY = config.jwtSecretKey;
  if (KEY !== undefined) {
    const exp = Math.floor(Date.now() / 1000) + 3 * 60 * 60;
    return jwt.sign({ userId: user._id, role: user.type, exp, iat: Date.now() / 1000 }, KEY);
  }
  throw new Error("JWT Key is not defined");
}

export async function decodeToken(token: string): Promise<jwt.JwtPayload> {
  const decoded = jwt.verify(token, config.jwtSecretKey as string) as JwtPayload;
  const currentTime = Math.floor(Date.now() / 1000);
  if (decoded.exp && decoded.exp < currentTime) {
    throw new Error("Access Denied: Token Expired");
  }
  return decoded;
}
