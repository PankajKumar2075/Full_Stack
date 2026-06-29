import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
    {
        receiver: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        type: {
            type: String,
            enum: [
                "like",
                "comment",
                "connection_request",
                "connection_accepted"
            ],
            required: true
        },

        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            default: null
        },

        isRead: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export const Notification = mongoose.model(
    "Notification",
    notificationSchema
);