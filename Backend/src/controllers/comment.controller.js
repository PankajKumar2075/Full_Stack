import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addComment = asyncHandler(async (req, res) => {

    const { postId } = req.params;
    const { content } = req.body;

    if (!content?.trim()) {
        throw new ApiError(
            400,
            "Comment content is required"
        );
    }

    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(
            404,
            "Post not found"
        );
    }

    const comment = await Comment.create({
        content,
        post: postId,
        owner: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            comment,
            "Comment added successfully"
        )
    );
});

export {
    addComment
};