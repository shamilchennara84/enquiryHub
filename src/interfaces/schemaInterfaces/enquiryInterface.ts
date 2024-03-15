import { ObjectId } from "mongoose";

export interface IEnquiry {
  createdBy: ObjectId;
  teams: [ObjectId];
  question: string;
  isExpired:boolean
}
export interface IEnquiryResponse extends IEnquiry {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserEmail {
  user: {
    email: string;
  };
}

export interface TeamDetail {
  name: string;

  // Include other fields as needed
}

export interface EnquiryDetails {
  creatorName: string;
  question: string;
  teams: TeamDetail[];
  isExpired: boolean;
}
