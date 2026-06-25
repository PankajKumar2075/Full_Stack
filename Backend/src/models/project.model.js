import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        techStack: [
            {
                type: String
            }
        ],

        githubUrl: {
            type: String,
            default: ""
        },

        liveUrl: {
            type: String,
            default: ""
        },

        thumbnail: {
            type: String,
            default: ""
        },

        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        collaborators: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        status: {
            type: String,
            enum: [
                "open",
                "active",
                "completed"
            ],
            default: "open"
        }
    },
    {
        timestamps: true
    }
);

export const Project =
mongoose.model(
    "Project",
    projectSchema
);