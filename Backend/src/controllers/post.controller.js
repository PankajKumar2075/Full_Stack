import { Post } from "../models/post.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Connection } from "../models/connection.model.js";
import { createNotification } from "../services/notification.service.js";



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

    await createNotification({
        receiver: post.author,
        sender: req.user._id,
        type: "like",
        post: post._id
    });

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


const getPostById = asyncHandler(async (req, res) => {

    const { postId } = req.params;

    const post = await Post.findById(postId)
        .populate(
            "author",
            "fullName username avatar"
        );

    if (!post) {
        throw new ApiError(
            404,
            "Post not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            post,
            "Post fetched successfully"
        )
    );
});


const deletePost = asyncHandler(async (req, res) => {

    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
        throw new ApiError(
            404,
            "Post not found"
        );
    }

    if (
        post.author.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "You can delete only your own posts"
        );
    }

    await Post.findByIdAndDelete(postId);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Post deleted successfully"
        )
    );
});


const getFeed = asyncHandler(async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const connections = await Connection.find({
        status: "accepted",
        $or: [
            { sender: req.user._id },
            { receiver: req.user._id }
        ]
    });

    const userIds = [req.user._id];

    connections.forEach((connection) => {

        if (connection.sender.toString() === req.user._id.toString()) {
            userIds.push(connection.receiver);
        } else {
            userIds.push(connection.sender);
        }

    });

    const posts = await Post.find({
        owner: {
            $in: userIds
        }
    })
        .populate(
            "owner",
            "fullName username avatar"
        )
        .sort({
            createdAt: -1
        })
        .skip(skip)
        .limit(limit);

    const totalPosts = await Post.countDocuments({
        owner: {
            $in: userIds
        }
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                currentPage: page,
                totalPages: Math.ceil(totalPosts / limit),
                totalPosts,
                posts
            },
            "Feed fetched successfully"
        )
    );
});

const searchPosts = asyncHandler(async (req, res) => {

    const { keyword } = req.query;

    if (!keyword?.trim()) {
        throw new ApiError(400, "Search keyword is required");
    }

    const posts = await Post.find({
        content: {
            $regex: keyword,
            $options: "i"
        }
    })
    .populate("author", "fullName username avatar")
    .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            posts,
            "Posts fetched successfully"
        )
    );
});

export {
    createPost,
    getAllPosts,
    likePost,
    unlikePost,
    getPostById,
    deletePost,
    getFeed,
    searchPosts
};