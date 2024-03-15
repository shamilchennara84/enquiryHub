import { Request, Response, NextFunction } from "express";
import UserModel from "../database/models/userModel";
import { decodeToken } from "../../utils/jwt";

const adminAuthLogin = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }
  try {
    const decoded = await decodeToken(token.slice(7)); // Use the decodeToken function here
    const userData = await UserModel.findById(decoded.userId);

    if (!userData) {
      throw new Error("User not found");
    }
      if (decoded.role !== "admin") {
        return res.status(403).json({ message: "Access Denied: Admin Access Required" });
      }

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

export default adminAuthLogin;
