import { Router } from "express";
import { registerUser , loginUser ,getCurrentUser , logoutUser , refreshAccessToken ,
    updateProfile , changePassword , getUserProfile , updateAvatar , searchUsers,
    followUser, unfollowUser , getFollowers, getFollowing
} from "../controllers/user.controller.js";

import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - username
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: User registered successfully
 */

router.route("/register").post(registerUser);


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login User
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */

router.route("/login").post(loginUser);

router.route("/current-user").get(verifyJWT, getCurrentUser);

router.route("/logout").post( verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/update-profile").patch(verifyJWT,updateProfile);

router.route("/change-password").patch(verifyJWT,changePassword);

router.route("/profile/:username").get(getUserProfile);

router.route("/avatar").patch(verifyJWT,upload.single("avatar"),updateAvatar);


router.route("/follow/:userId").post(verifyJWT,followUser);

router.route("/unfollow/:userId").post(verifyJWT,unfollowUser);

router.route("/followers").get(verifyJWT,getFollowers);

router.route("/following").get(verifyJWT,getFollowing);

router.get(
    "/search",
    verifyJWT,
    searchUsers
);

export default router;