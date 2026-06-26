import { Connection } from "../models/connection.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const sendConnectionRequest = asyncHandler(async (req, res) => {

    const { userId } = req.params;

    // Prevent sending request to yourself
    if (req.user._id.toString() === userId) {
        throw new ApiError(
            400,
            "You cannot send a connection request to yourself"
        );
    }

    // Check receiver exists
    const receiver = await User.findById(userId);

    if (!receiver) {
        throw new ApiError(
            404,
            "User not found"
        );
    }

    // Check if request already exists
    const existingRequest = await Connection.findOne({
        sender: req.user._id,
        receiver: userId
    });

    if (existingRequest) {
        throw new ApiError(
            400,
            "Connection request already sent"
        );
    }

    // Create request
    const request = await Connection.create({
        sender: req.user._id,
        receiver: userId
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            request,
            "Connection request sent successfully"
        )
    );
});

const acceptConnectionRequest = asyncHandler(async (req, res) => {

    const { requestId } = req.params;

    const request = await Connection.findById(requestId);

    if (!request) {
        throw new ApiError(404, "Connection request not found");
    }


    // Only the receiver can accept
    if (request.receiver.toString() !== req.user._id.toString()) {
        throw new ApiError(
            403,
            "You are not authorized to accept this request"
        );
    }

    // Request must be pending
    if (request.status !== "pending") {
        throw new ApiError(
            400,
            `Request has already been ${request.status}`
        );
    }

    // Accept the request
    request.status = "accepted";
    await request.save();

    // Add users to each other's connections
    await User.findByIdAndUpdate(
        request.sender,
        {
            $addToSet: {
                connections: request.receiver
            }
        }
    );

    await User.findByIdAndUpdate(
        request.receiver,
        {
            $addToSet: {
                connections: request.sender
            }
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            request,
            "Connection request accepted successfully"
        )
    );
});

export {
    sendConnectionRequest,
    acceptConnectionRequest
};