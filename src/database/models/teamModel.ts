import mongoose, { Document, Model, Schema } from "mongoose";
import { ITeam } from "src/interfaces/schemaInterfaces/teamInterface";

export interface ITeamDocument extends ITeam, Document {}

const TeamSchema: Schema = new Schema<ITeamDocument>(
  {
    teamName: {
      type: String,
      required: true,
    },
    members: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

const TeamModel: Model<ITeamDocument> = mongoose.model<ITeamDocument>("Team", TeamSchema);

export default TeamModel;
