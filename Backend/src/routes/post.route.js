import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createPost,getAllPosts,likePost,unlikePost } from "../controllers/post.controller.js";

const router = Router();


router.get(
    "/",
    verifyJWT,
    getAllPosts
);

router.post(
    "/create",
    verifyJWT,
    createPost
);

router.post(
    "/like/:postId",
    verifyJWT,
    likePost
);

router.post(
    "/unlike/:postId",
    verifyJWT,
    unlikePost
);

export default router;