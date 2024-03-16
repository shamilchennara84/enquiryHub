import { ObjectId } from "mongoose";

export interface IEnquiry {
  createdBy: ObjectId;
  teams: [ObjectId];
  question: string;
  isExpired: boolean;
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
  _id: ObjectId;
  Raised_By: string;
  Team_Tagged: [string];
  Enquiry: string;
  Status: string;
  CreatedAt: Date,
}
