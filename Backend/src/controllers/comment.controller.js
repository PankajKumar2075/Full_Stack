import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { createNotification } from "../services/notification.service.js";


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

    await createNotification({
        receiver: post.author,
        sender: req.user._id,
        type: "comment",
        post: post._id
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            comment,
            "Comment added successfully"
        )
    );
});

const getComments = asyncHandler(async (req, res) => {

    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(
            404,
            "Post not found"
        );
    }

    const comments = await Comment.find({
        post: postId
    })
    .populate(
        "owner",
        "fullName username avatar"
    )
    .sort({
        createdAt: -1
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            comments,
            "Comments fetched successfully"
        )
    );
});

const deleteComment = asyncHandler(async (req, res) => {

    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(
            404,
            "Comment not found"
        );
    }

    if (comment.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(
            403,
            "You are not authorized to delete this comment"
        );
    }

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Comment deleted successfully"
        )
    );
});

export {
    addComment,
    getComments,
    deleteComment
};