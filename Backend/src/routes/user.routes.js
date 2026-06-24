import { Router } from "express";
import { registerUser , loginUser ,getCurrentUser , logoutUser , refreshAccessToken ,
    updateProfile , changePassword
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/current-user").get(verifyJWT, getCurrentUser);

router.route("/logout").post( verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/update-profile").patch(verifyJWT,updateProfile);

router.route("/change-password").patch(verifyJWT,changePassword);

export default router;