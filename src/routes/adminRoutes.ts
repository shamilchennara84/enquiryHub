import express from "express";
import adminController from "../../src/controllers/adminController";
import adminAuthLogin from "../../src/middlewares/adminAuthLogin";
import { validateAdminLoginData, validateTeamData, validateTeamUser } from "../../src/middlewares/validationMiddleware";

const adminRouter = express.Router();

// Admin Auth routes
adminRouter.post("/login", validateAdminLoginData, adminController.loginAdmin);
adminRouter.get("/users", adminAuthLogin, adminController.fetchAllUsers);

// Admin Team Manage routes
adminRouter.post("/team", adminAuthLogin, validateTeamData, adminController.createTeam);
adminRouter.get("/team/:teamId", adminAuthLogin, adminController.getTeam);
adminRouter.get("/teams", adminAuthLogin, adminController.getAllTeams);
adminRouter.patch("/team/:teamId/name", adminAuthLogin, validateTeamData, adminController.editTeamName);
adminRouter.post("/teams/:teamId/members/:userId", adminAuthLogin, validateTeamUser, adminController.addNewMember);
adminRouter.delete("/teams/:teamId/members/:userId", adminAuthLogin, validateTeamUser, adminController.removeTeamMember);

export default adminRouter;
