import { Request, Response, NextFunction } from "express";
import UserModel from "../database/models/userModel";
import { compare } from "../../utils/bcrypt";

// Validate user registration data
export const validateRegisterData = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  const requiredFields = ["first_name", "last_name", "email", "password"];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `The following fields are required: ${missingFields.join(", ")}` });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    next();
  } catch (error) {
    console.error("Error while checking user existence:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
  // validate login data
  export const validateLoginData = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid password" });
      }

      req.body.user = user;
      next();
    } catch (error) {
      console.error("Error during login validation:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
 
  export const validateProfileData = async(req: Request, res: Response, next: NextFunction) => {
    const { profile_info } = req.body;

    if (typeof profile_info !== "string") {
      return res.status(400).json({ error: "profile_info must be a string" });
    }

    next();
  };
   
  

