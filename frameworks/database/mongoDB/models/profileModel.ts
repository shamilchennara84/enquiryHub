import { IProfile } from "@interfaces/profileInterface";
import mongoose, { Document, Schema } from "mongoose";

export interface IProfileDocument extends IProfile, Document {}

const ProfileSchema: Schema = new Schema<IProfileDocument>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    profile_info: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const ProfileModel = mongoose.model<IProfileDocument>("Profile", ProfileSchema);
