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

const getProjects = asyncHandler(async (req, res) => {

    const projects = await Project.find()
        .populate("owner", "fullName username avatar")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            projects,
            "Projects fetched successfully"
        )
    );
});

const deleteProject = asyncHandler(async (req, res) => {

    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
        throw new ApiError(
            404,
            "Project not found"
        );
    }

    if (
        project.owner.toString() !==
        req.user._id.toString()
    ) {
        throw new ApiError(
            403,
            "You can delete only your own projects"
        );
    }

    await Project.findByIdAndDelete(projectId);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Project deleted successfully"
        )
    );
});

export {
    createProject,
    getProjects,
    deleteProject
};