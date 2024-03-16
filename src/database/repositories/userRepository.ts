import { IUserData, UserRow } from "../../interfaces/schemaInterfaces/userInterface";
import UserModel from "../models/userModel";
import TeamModel from "../models/teamModel";
import EnquiryModel from "../../../src/database/models/enquiryModel";
import { EnquiryDetails } from "../../../src/interfaces/schemaInterfaces/enquiryInterface";
import { ITeamResponse } from "../../../src/interfaces/schemaInterfaces/teamInterface";

// Repository class for handling database operations related to users
export class UserRepository {
  // Method to retrieve user data with profile information
  async UserDataSheet(): Promise<UserRow[]> {
    return await UserModel.aggregate([
      {
        $lookup: {
          from: "profiles",
          localField: "profile_id",
          foreignField: "_id",
          as: "profileData",
        },
      },
      {
        $project: {
          First_Name: "$first_name",
          Last_Name: "$last_name",
          Email: "$email",
          Info: "$profileData.profile_info",
          _id: 0,
        },
      },
    ]);
  }
  // Method to retrieve enquiry details including user and team information
  async getEnquiryDetails(): Promise<EnquiryDetails[]> {
    const enquiryDetails = await EnquiryModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "raisedBy",
        },
      },
      { $unwind: "$raisedBy" },
      {
        $unwind: "$teams",
      },
      {
        $lookup: {
          from: "teams",
          localField: "teams",
          foreignField: "_id",
          as: "team",
        },
      },
      {
        $unwind: "$team",
      },
      {
        $project: {
          _id: 1,
          "raisedBy.first_name": 1,
          "team.teamName": 1,
          question: 1,
          isExpired: 1,
          createdAt: 1,
        },
      },
      {
        $addFields: {
          Raised_By: "$raisedBy.first_name",
          Team_Tagged: "$team.teamName",
          Enquiry: "$question",
          Status: "$isExpired",
        },
      },
      {
        $project: {
          _id: 1,
          Raised_By: 1,
          Team_Tagged: 1,
          Enquiry: 1,
          Status: 1,
          createdAt: 1,
        },
      },
      {
        $group: {
          _id: "$_id",
          Raised_By: { $first: "$Raised_By" },
          Team_Tagged: { $push: "$Team_Tagged" },
          Enquiry: { $first: "$Enquiry" },
          Status: { $first: "$Status" },
          CreatedAt: { $first: "$createdAt" },
        },
      },
    ]);

    return enquiryDetails;
  }
  // Method to fetch all user data with associated profile information
  async fetchAllUserDataWithProfile(): Promise<IUserData[]> {
    return await UserModel.aggregate([
      {
        $lookup: {
          from: "profiles",
          localField: "profile_id",
          foreignField: "_id",
          as: "profileData",
        },
      },
    ]);
  }

  // Method to create a new team
  async createTeam(teamName: string): Promise<ITeamResponse> {
    const team = new TeamModel({ teamName });
    return await team.save();
  }
}
