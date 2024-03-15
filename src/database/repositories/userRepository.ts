import { IUserData, UserRow } from "../../interfaces/schemaInterfaces/userInterface";
import UserModel from "../models/userModel";
import TeamModel from "../models/teamModel";
import EnquiryModel from "../../../src/database/models/enquiryModel";
import { EnquiryDetails } from "../../../src/interfaces/schemaInterfaces/enquiryInterface";
import { ITeamResponse } from "../../../src/interfaces/schemaInterfaces/teamInterface";

export class UserRepository {
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

  async getEnquiryDetails(): Promise<EnquiryDetails[]> {
    const enquiryDetails = await EnquiryModel.aggregate([
      {
        $lookup: {
          from: "users", 
          localField: "createdBy",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: "$creator" }, 
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
      // {
      //   $unwind: "$team", 
      // },
      // {
      //   $group: {
      //     _id: "$_id", 
      //     creatorName: { $first: "$creator.name" },
      //     question: { $first: "$question" }, 
      //     teams: { $push: "$team.name" }, 
      //     isExpired: { $first: "$isExpired" },  
      //   },
      // },
      // {
      //   $project: {
      //     _id: 0, 
      //     creatorName: 1, 
      //     question: 1, 
      //     teams: 1, 
      //     isExpired: 1,
      //   },
      // },
    ]);

    console.log(enquiryDetails);
    return enquiryDetails;
  }

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

  async createTeam(teamName: string): Promise<ITeamResponse> {
    const team = new TeamModel({ teamName });
    return await team.save();
  }
}
