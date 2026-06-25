import { Project } from "../models/project.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createProject = asyncHandler(async (req, res) => {

    const {
        title,
        description,
        techStack,
        githubUrl,
        liveUrl
    } = req.body || {};

    if (!title || !description) {
        throw new ApiError(
            400,
            "Title and description are required"
        );
    }

    const project = await Project.create({
        title,
        description,
        techStack,
        githubUrl,
        liveUrl,
        owner: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            project,
            "Project created successfully"
        )
    );
});

export {
    createProject
};