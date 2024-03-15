import { ObjectId } from "mongoose";
import { IProfileResponse } from "./profileInterface";

export interface IUser {
  type: "user" | "admin";
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  profile_id?: ObjectId;
}

export interface IUserResponse extends IUser {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRow {
  First_Name: string;
  Last_Name: string;
  Email: string;
  Info: string;
}

export interface IUserData extends IUserResponse {
  profileData: IProfileResponse;
}
