import config from "../config/config";
import { IUserResponse } from "../src/interfaces/schemaInterfaces/userInterface";
import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Generates an access token for the given user.
 * @param user - The user object for whom the token is generated.
 * @returns The generated access token.
 * @throws Error if JWT secret key is not defined.
 */
export async function generateAccessToken(user: IUserResponse): Promise<string> {
  const KEY = config.jwtSecretKey;
  if (KEY !== undefined) {
    const exp = Math.floor(Date.now() / 1000) + 3 * 60 * 60;
    return jwt.sign({ userId: user._id, role: user.type, exp, iat: Date.now() / 1000 }, KEY);
  }
  throw new Error("JWT Key is not defined");
}

/**
 * Decodes the given token and verifies its validity.
 * @param token - The token to decode and verify.
 * @returns The decoded token payload.
 * @throws Error if token is invalid or expired.
 */
export async function decodeToken(token: string): Promise<jwt.JwtPayload> {
  const decoded = jwt.verify(token, config.jwtSecretKey as string) as JwtPayload;
  const currentTime = Math.floor(Date.now() / 1000);
  if (decoded.exp && decoded.exp < currentTime) {
    throw new Error("Access Denied: Token Expired");
  }
  return decoded;
}
