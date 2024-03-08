import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "@interfaces/userInterface";

export interface IUserDocument extends IUser, Document {}

const UserSchema: Schema = new Schema<IUserDocument>(
  {
    type: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profile_id: {
      type: Schema.Types.ObjectId,
      ref: "Profiles",
      required: true,
    },
  },
  { timestamps: true },
);


export const UserModel = mongoose.model<IUserDocument>("User", UserSchema);
