import { ObjectId } from "mongoose";

export interface IUser {
  type: "user" | "admin";
  first_name: string;
  last_name: string;
  email: string;
  profile_id: ObjectId;
}

export interface IUserResponse extends IUser {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
