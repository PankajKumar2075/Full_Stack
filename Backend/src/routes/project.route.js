import { Router } from "express";

import {
    createProject, getProjects, deleteProject
}
from "../controllers/project.controller.js";

import {
    verifyJWT
}
from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/")
.post(
    verifyJWT,
    createProject
);

router.route("/")
.get(getProjects)
.post(
    verifyJWT,
    createProject
);

router.route("/:projectId")
.delete(
    verifyJWT,
    deleteProject
);

export default router;