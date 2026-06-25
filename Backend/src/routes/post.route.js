import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createPost,getAllPosts,likePost,unlikePost,getPostById,deletePost } from "../controllers/post.controller.js";

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

router.get(
    "/:postId",
    verifyJWT,
    getPostById
);

router.delete(
    "/:postId",
    verifyJWT,
    deletePost
);

export default router;