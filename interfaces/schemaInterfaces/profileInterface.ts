import { ObjectId } from "mongoose";

export interface IProfile {
  user_id: ObjectId;
  profile_info: string;
}
export interface IProfileResponse extends IProfile {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
