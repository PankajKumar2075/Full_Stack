import { Post } from "../models/post.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createPost = asyncHandler(async (req,res)=>{

    const { content } = req.body;

    if(!content){
        throw new ApiError(
            400,
            "Content is required"
        );
    }

    const post = await Post.create({
        content,
        author:req.user._id
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            post,
            "Post created successfully"
        )
    );
});


const getAllPosts = asyncHandler(async (req, res) => {

    const posts = await Post.find()
        .populate(
            "author",
            "fullName username avatar"
        )
        .sort({
            createdAt: -1
        });

    return res.status(200).json(
        new ApiResponse(
            200,
            posts,
            "Posts fetched successfully"
        )
    );
});

const likePost = asyncHandler(async (req, res) => {

    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(
            404,
            "Post not found"
        );
    }

    const alreadyLiked =
    post.likes.some(
        id =>
        id.toString() ===
        req.user._id.toString()
    );

    if (alreadyLiked) {
        throw new ApiError(
            400,
            "Post already liked"
        );
    }

    post.likes.push(req.user._id);

    await post.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            post,
            "Post liked successfully"
        )
    );
});

const unlikePost = asyncHandler(async (req, res) => {

    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(
            404,
            "Post not found"
        );
    }

    post.likes = post.likes.filter(
        (id) =>
            id.toString() !==
            req.user._id.toString()
    );

    await post.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            post,
            "Post unliked successfully"
        )
    );
});

export {
    createPost,
    getAllPosts,
    likePost,
    unlikePost
};