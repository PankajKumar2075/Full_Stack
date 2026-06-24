import { Router } from "express";
import { registerUser , loginUser ,getCurrentUser , logoutUser , refreshAccessToken ,
    updateProfile , changePassword , getUserProfile , updateAvatar
} from "../controllers/user.controller.js";

import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/current-user").get(verifyJWT, getCurrentUser);

router.route("/logout").post( verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/update-profile").patch(verifyJWT,updateProfile);

router.route("/change-password").patch(verifyJWT,changePassword);

router.route("/profile/:username").get(getUserProfile);

router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateAvatar);

export default router;