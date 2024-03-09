import { ObjectId } from "mongoose";

export interface IEnquiry {
  createdBy: ObjectId;
  teams: [string];
}
export interface IEnquiryResponse extends IEnquiry {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
