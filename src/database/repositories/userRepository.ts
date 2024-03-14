import { UserRow } from "../../interfaces/schemaInterfaces/userInterface";
import UserModel from "../models/userModel";

export class UserRepository {
  async UserDataSheet(): Promise<UserRow[]> {
    return await UserModel.aggregate([
      {
        $lookup: {
          from: "profiles",
          localField: "profile_id",
          foreignField: "_id",
          as: "profiledata",
        },
      },
      {
        $project: {
          First_Name: "$first_name",
          Last_Name: "$last_name",
          Email: "$email",
          Info: "$profiledata.profile_info",
          _id: 0,
        },
      },
    ]);
  }
}
