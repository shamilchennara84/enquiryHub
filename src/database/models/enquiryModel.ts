import { IEnquiry } from "../../interfaces/schemaInterfaces/enquiryInterface";
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
      type: [Schema.Types.ObjectId], 
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    isExpired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const EnquiryModel = mongoose.model<IEnquiryDocument>("Enquiry", EnquirySchema);

export default EnquiryModel;