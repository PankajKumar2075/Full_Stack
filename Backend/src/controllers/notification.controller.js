import { Notification } from "../models/notification.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getNotifications = asyncHandler(async (req, res) => {

    const notifications = await Notification.find({
        receiver: req.user._id
    })
    .populate("sender", "fullName username avatar")
    .populate("post", "content")
    .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            notifications,
            "Notifications fetched successfully"
        )
    );

});

const markAsRead = asyncHandler(async (req, res) => {

    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndUpdate(
        notificationId,
        {
            isRead: true
        },
        {
            new: true
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            notification,
            "Notification marked as read"
        )
    );

});

export {
    getNotifications,
    markAsRead
};