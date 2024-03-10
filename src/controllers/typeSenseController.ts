import { Request, Response } from "express";



const typeSenseController = {
  createUser: async (req: Request, res: Response) => {
    try {
      
      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  
};
export default typeSenseController;
