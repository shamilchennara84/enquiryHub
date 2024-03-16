import express from "express";
import {
  validateEnquiryData,
  validateLoginData,
  validateProfileData,
  validateRegisterData,
} from "../middlewares/validationMiddleware";
import userController from "../controllers/userController";
import authLogin from "../middlewares/authLogin";
import enquiryController from "../../src/controllers/enquiryController";
const userRouter = express.Router();

// User Auth routes
userRouter.post("/register", validateRegisterData, userController.createUser);
userRouter.post("/login", validateLoginData, userController.loginUser);

// User Profile routes
userRouter.post("/profile", authLogin, validateProfileData, userController.createProfile);
userRouter.get("/profile/:userId", authLogin, userController.getUserProfile);
userRouter.patch("/profile/:profileId", authLogin, validateProfileData, userController.editProfile);
userRouter.delete("/profile/:profileId", authLogin, userController.deleteProfile);

// User Enquiries routes
userRouter.post("/enquiry", authLogin, validateEnquiryData, enquiryController.createEnquiry);
userRouter.get("/enquiries/:userId", authLogin, enquiryController.getUserEnquiries);
userRouter.post("/enquiries/:enquiryId/teams/:teamId", authLogin, enquiryController.addTeam);
userRouter.delete("/enquiries/:enquiryId/teams/:teamId", authLogin, enquiryController.removeTeam);
userRouter.delete("/enquiry/:enquiryId", authLogin, enquiryController.deleteEnquiry);

export default userRouter;
