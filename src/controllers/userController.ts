import { Request, Response } from "express";
import UserModel from "../database/models/userModel";
import { hashPassword } from "../../utils/bcrypt";
import { decodeToken, generateAccessToken } from "../../utils/jwt";
import ProfileModel from "../database/models/profileModel";

const userController = {
  createUser: async (req: Request, res: Response) => {
    try {
      const { first_name, last_name, email, password } = req.body;
      const hashedPassword = await hashPassword(password);

      const newUser = new UserModel({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  loginUser: async (req: Request, res: Response) => {
    try {
      const user = req.body.user;
      const JWTtoken = await generateAccessToken(user);
      res.status(200).json({ message: "Login successful", user: user, token: JWTtoken });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getUserProfile: async (req: Request, res: Response) => {
    try {
      const user_Id = req.params.userId;
      const profile = await ProfileModel.findOne({ user_Id });
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.status(200).json({ message: "Profile retrieved successfully", profile });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  createProfile: async (req: Request, res: Response) => {
    try {
      const token = req.headers["authorization"];
      const { profile_info } = req.body;
      const decoded = await decodeToken((token as string).slice(7));
      const userId = decoded.userId;
      const profile = await ProfileModel.findOne({ user_Id: userId });
      if (profile) {
        return res.status(400).json({ message: "Profile already exists for this user" });
      }
      console.log(userId);
      const newProfile = new ProfileModel({
        user_Id: userId,
        profile_info,
      });
      console.log(newProfile, "created profile 1");
      const createdProfile = await newProfile.save();
      const userUpdated = await UserModel.findByIdAndUpdate(userId, { profile_id: createdProfile._id }, { new: true });
      console.log(userUpdated);

      res.status(200).json({ message: "Profile created and user updated", createdProfile });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  editProfile: async (req: Request, res: Response) => {
    try {
      const token = req.headers["authorization"];
      const { profile_info } = req.body;
      const decoded = await decodeToken((token as string).slice(7));
      const userId = decoded.userId;
      const profileId = req.params.profileId;

      const profile = await ProfileModel.findById(profileId);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      if (profile.user_Id.toString() !== userId) {
        return res.status(403).json({ message: "You do not have permission to edit this profile" });
      }

      profile.profile_info = profile_info;
      const updatedProfile = await profile.save();

      res.status(200).json({ message: "Profile updated successfully", updatedProfile });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteProfile: async (req: Request, res: Response) => {
    try {
      const token = req.headers["authorization"];
      const decoded = await decodeToken((token as string).slice(7));
      const userId = decoded.userId;
      const profileId = req.params.profileId;

      const profile = await ProfileModel.findById(profileId);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      if (profile.user_Id.toString() !== userId) {
        return res.status(403).json({ message: "You do not have permission to delete this profile" });
      }

      await ProfileModel.findByIdAndDelete(profileId);

      res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  
};
export default userController;
