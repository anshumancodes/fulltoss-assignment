import { Router } from "express";
import { RegisterUser, UserLogin,GetUser,updateTeam } from "../controllers/user.controller.js";
const router=Router();

router.route("/register").post(RegisterUser);
router.route("/login").post(UserLogin);
router.route("/getUser/:username").get(GetUser);
router.route("/update/:team").post(updateTeam)


export default router;