import { Request, Response } from "express";
import { UserRepository } from "../../src/database/repositories/userRepository";
import { generateAccessToken } from "../../utils/jwt";
import TeamModel from "../../src/database/models/teamModel";

const userRepository = new UserRepository();

const adminController = {
  //Handles the login process for an admin user by generating a JWT token.
  loginAdmin: async (req: Request, res: Response) => {
    try {
      const admin = req.body.admin;
      const JWTtoken = await generateAccessToken(admin);
      res.status(200).json({ message: "Admin Login Successful", user: admin, token: JWTtoken });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  //Retrieves details of all users from the database.
  fetchAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await userRepository.fetchAllUserDataWithProfile();
      res.status(200).json({ message: "All Users Details Retrieved Successful", users });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  //Creates a new team in the database.
  createTeam: async (req: Request, res: Response) => {
    try {
      const { teamName } = req.body;
      const team = await userRepository.createTeam(teamName);
      res.status(200).json({ message: "Team Create Successful ", team });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  //Retrieves details of a specific team by its ID.
  getTeam: async (req: Request, res: Response) => {
    try {
      const teamId = req.params.teamId;
      const team = await TeamModel.findById(teamId);
      if (!team) {
        throw new Error("Team not found");
      }
      res.status(200).json({ message: "Team Data Fetched Successful ", team });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  //Retrieves details of all teams from the database.
  getAllTeams: async (req: Request, res: Response) => {
    try {
      const teams = await TeamModel.find({});
      if (!teams || teams.length === 0) {
        throw new Error("No teams found");
      }
      res.status(200).json({ message: "All Teams Data Fetched Successfully", teams });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  //Updates the name of a team.
  editTeamName: async (req: Request, res: Response) => {
    try {
      const teamId = req.params.teamId;
      const { teamName } = req.body;
      if (!teamId || !teamName) {
        return res.status(400).json({ error: "Team ID and new team name are required" });
      }

      const team = await TeamModel.findById(teamId);
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }

      team.teamName = teamName;
      await team.save();

      res.status(200).json({ message: "Team name updated successfully", team });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  //Adds a new member to a team.
  addNewMember: async (req: Request, res: Response) => {
    try {
      const { teamId, userId } = req.params;

      const team = await TeamModel.findById(teamId);
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }
      if (team.members.includes(userId)) {
        return res.status(400).json({ error: "User is already a member of the team" });
      }
      team.members.push(userId);
      await team.save();

      res.status(200).json({ message: "User added to the team successfully", team });
    } catch (error) {
      console.error("Error adding user to the team:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  //Removes a member from a team.
  removeTeamMember: async (req: Request, res: Response) => {
    try {
      const { teamId, userId } = req.params;

      const team = await TeamModel.findById(teamId);
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }
      const memberIndex = team.members.indexOf(userId);
      if (memberIndex === -1) {
        return res.status(400).json({ error: "User is not a member of the team" });
      }
      team.members.splice(memberIndex, 1);
      await team.save();

      res.status(200).json({ message: "User removed from the team successfully", team });
    } catch (error) {
      console.error("Error removing user from the team:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default adminController;
