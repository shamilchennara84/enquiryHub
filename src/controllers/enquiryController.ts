import { Request, Response } from "express";
import EnquiryModel from "../../src/database/models/enquiryModel";
import { decodeToken } from "../../utils/jwt";

const enquiryController = {
  createEnquiry: async (req: Request, res: Response) => {
    try {
      const { question, teams } = req.body;
      const token = req.headers["authorization"];
      if (!token) {
        return res.status(401).json({ error: "Authorization token is missing" });
      }
      const decoded = await decodeToken(token.slice(7));
      const newEnquiry = new EnquiryModel({
        createdBy: decoded.userId,
        teams,
        question,
      });
      const enquiry = await newEnquiry.save();
      res.status(201).json({ message: "Enquiry created successfully", enquiry });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  removeTeam: async (req: Request, res: Response) => {
    try {
      const enquiryId = req.params.enquiryId;
      const teamId = req.params.teamId;

      const enquiry = await EnquiryModel.findById(enquiryId);
      if (!enquiry) {
        return res.status(404).json({ error: "Enquiry not found" });
      }
      const teamIndex = enquiry.teams.indexOf(teamId);
      if (teamIndex === -1) {
        return res.status(404).json({ error: "Team not found in the enquiry" });
      }
      enquiry.teams.splice(teamIndex, 1);
      await enquiry.save();
      res.status(200).json({ message: "Team removed successfully from the enquiry", enquiry });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  addTeam: async (req: Request, res: Response) => {
    try {
      const enquiryId = req.params.enquiryId;
      const teamId = req.params.teamId;
      const enquiry = await EnquiryModel.findById(enquiryId);
      if (!enquiry) {
        return res.status(404).json({ error: "Enquiry not found" });
      }
      const teamIndex = enquiry.teams.indexOf(teamId);
      if (teamIndex !== -1) {
        return res.status(400).json({ error: "Team already exists in the enquiry" });
      }
      enquiry.teams.push(teamId);
      await enquiry.save();
      res.status(200).json({ message: "Team added successfully to the enquiry", enquiry });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getUserEnquiries: async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;
      const enquiries = await EnquiryModel.find({ createdBy: userId });
      if (!enquiries) {
        return res.status(404).json({ error: "No enquiries found for the user" });
      }
      res.status(200).json({ enquiries });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteEnquiry: async (req: Request, res: Response) => {
    try {
      const enquiryId = req.params.enquiryId;
      const token = req.headers["authorization"];
      if (!token) {
        return res.status(401).json({ error: "Authorization token is missing" });
      }
      const decoded = await decodeToken(token.slice(7)); 
      const userId = decoded.userId;

      const enquiry = await EnquiryModel.findById(enquiryId);
      if (!enquiry) {
        return res.status(404).json({ error: "Enquiry not found" });
      }
      if (enquiry.createdBy.toString() !== userId) {
        return res.status(403).json({ error: "You do not have permission to delete this enquiry" });
      }

      await EnquiryModel.findByIdAndDelete(enquiryId);
      res.status(200).json({ message: "Enquiry deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default enquiryController;
