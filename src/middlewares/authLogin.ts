import { Request, Response, NextFunction } from "express";
import UserModel from "../database/models/userModel";
import { decodeToken } from "../../utils/jwt";

/**
 * Middleware function for user authentication.
 * Verifies the presence of a valid token in the request headers.
 * Decodes the token to extract user information.
 * Checks if the decoded user ID exists in the database.
 * @param req Express Request object
 * @param res Express Response object
 * @param next Express NextFunction
 */
const authLogin = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }
  try {
       const decoded =await decodeToken(token.slice(7)); // Use the decodeToken function here
       const userData = await UserModel.findById(decoded.userId);
    
    if (!userData) {
      throw new Error("User not found");
    }
  
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

export default authLogin;
