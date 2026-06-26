import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addComment,getComments,deleteComment } from "../controllers/comment.controller.js";

const router = Router();

router.post(
    "/:postId",
    verifyJWT,
    addComment
);

router.get(
    "/:postId",
    verifyJWT,
    getComments
);


router.delete(
    "/:commentId",
    verifyJWT,
    deleteComment
);

export default router;