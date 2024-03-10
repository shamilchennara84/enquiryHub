
import { IProfile } from "../../interfaces/schemaInterfaces/profileInterface";
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProfileDocument extends IProfile, Document {}

const ProfileSchema: Schema = new Schema<IProfileDocument>(
  {
    user_Id: {
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
 const ProfileModel: Model<IProfileDocument> = mongoose.model<IProfileDocument>("Profile", ProfileSchema);

export default ProfileModel;
