import express from "express";
import { validateLoginData, validateProfileData, validateRegisterData } from "../middlewares/validationMiddleware";
import userController from "../controllers/userController";
import authLogin from "../middlewares/authLogin";
const userRouter = express.Router();

// User Auth routes
userRouter.post("/register", validateRegisterData, userController.createUser);
userRouter.post("/login", validateLoginData, userController.loginUser);

// User Profile routes
userRouter.post("/createProfile",authLogin, validateProfileData, userController.createProfile);
userRouter.get("/profile",authLogin, userController.getUserProfile);
userRouter.patch("/updateProfile/:profileId", authLogin, validateProfileData, userController.editProfile);
userRouter.delete("/deleteProfile/:profileId", authLogin, userController.deleteProfile);

//User Enquiries routes
// userRouter.post("/createEnquiry", authLogin, validateEnquiryData, userController.createEnquiry);
// userRouter.get("/enquiries", authLogin, userController.getUserEnquiries);
// userRouter.patch("/updateEnquiry/:enquiryId", authLogin, validateEnquiryData, userController.editEnquiry);
// userRouter.delete("/deleteEnquiry/:enquiryId", authLogin, userController.deleteEnquiry);

export default userRouter;
