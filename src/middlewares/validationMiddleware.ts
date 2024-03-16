import { Request, Response, NextFunction } from "express";
import UserModel from "../database/models/userModel";
import { compare } from "../../utils/bcrypt";
import TeamModel from "../../src/database/models/teamModel";

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
        return res.status(400).json({ error: "Invalid email or password" });
      }

      req.body.user = user;
      next();
    } catch (error) {
      console.error("Error during login validation:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }

// Validate admin login data
  export const validateAdminLoginData = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    try {
      const admin = await UserModel.findOne({ type:'admin',email });
      if (!admin) {
        return res.status(400).json({ error: "admin not found" });
      }

      const isMatch = await compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
       req.body.admin = admin;
      next();
    } catch (error) {
      console.error("Error during login validation:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
 
  // Validate profile data
  export const validateProfileData = async(req: Request, res: Response, next: NextFunction) => {
    const { profile_info } = req.body;

    if (typeof profile_info !== "string") {
      return res.status(400).json({ error: "profile_info must be a string" });
    }

    next();
  };
  // Validate team data
  export const validateTeamData = async (req: Request, res: Response, next: NextFunction) => {
    const { teamName } = req.body;

    if (typeof teamName !== "string") {
      return res.status(400).json({ error: "teamName must be a string" });
    }

    try {
      const existingTeam = await TeamModel.findOne({ teamName });
      if (existingTeam) {
        return res.status(400).json({ error: "Team already exists" });
      }
      next();
    } catch (error) {
      console.error("Error while checking team existence:", error);
      return res.status(500).json({ error: "Server error" });
    }
  };

// Validate team and user data
  export const validateTeamUser = async (req: Request, res: Response, next: NextFunction) => {
 const { teamId, userId } = req.params;

 try {
    const team = await TeamModel.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
   
    next();
 } catch (error) {
    console.error("Error during team and user validation:", error);
    return res.status(500).json({ error: "Server error" });
 }
}

// Validate enquiry data
export const validateEnquiryData = async (req: Request, res: Response, next: NextFunction) => {
  const { question, teams } = req.body;

  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "Question must be a string" });
  }

if (!teams || !Array.isArray(teams) || teams.length === 0) {
  return res.status(400).json({ error: "Teams must be a array" });
}


  for (const teamId of teams) {
    if (typeof teamId !== "string") {
      return res.status(400).json({ error: "Each team ID in the array must be a string" });
    }
     const team = await TeamModel.findById(teamId);
     if (!team) {
       return res.status(400).json({ error: `Team with ID ${teamId} does not exist` });
     }
  }

  next();
};



   
  

