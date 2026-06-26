import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    sendConnectionRequest,
    acceptConnectionRequest,
    rejectConnectionRequest,
    getPendingRequests,
    getMyConnections
} from "../controllers/connection.controller.js";

const router = Router();

router.post(
    "/send/:userId",
    verifyJWT,
    sendConnectionRequest
);

router.patch(
    "/accept/:requestId",
    verifyJWT,
    acceptConnectionRequest
);

router.patch(
    "/reject/:requestId",
    verifyJWT,
    rejectConnectionRequest
);

router.get(
    "/pending",
    verifyJWT,
    getPendingRequests
);

router.get(
    "/my-connections",
    verifyJWT,
    getMyConnections
);

export default router;