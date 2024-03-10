import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "../../interfaces/schemaInterfaces/userInterface";

export interface IUserDocument extends IUser, Document {}

const UserSchema: Schema = new Schema<IUserDocument>(
  {
    type: {
      type: String,
      enum: ["user", "admin"],
      default: "user", 
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
    password: {
      type: String,
      required: true, 
    },
    profile_id: {
      type: Schema.Types.ObjectId,
      ref: "Profiles",
      
    },
  },
  { timestamps: true },
);

const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>("User", UserSchema);

export default UserModel;
