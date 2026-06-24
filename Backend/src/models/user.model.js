import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },

        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        avatar: {
            type: String,
            default: ""
        },

        bio: {
            type: String,
            default: ""
        },

        skills: [
            {
                type: String
            }
        ]
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model("User", userSchema);