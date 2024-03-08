import { IEnquiry } from "@interfaces/enquiryInterface";
import mongoose, { Document, Schema} from "mongoose";

export interface IEnquiryDocument extends IEnquiry, Document {}

const EnquirySchema: Schema = new Schema<IEnquiryDocument>(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    teams: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

export const EnquiryModel = mongoose.model<IEnquiryDocument>("Enquiry", EnquirySchema);
