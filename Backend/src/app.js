import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import healthCheckRouter from "./routes/healthcheck.routes.js";
import userRouter from "./routes/user.routes.js";
import projectRouter from "./routes/project.route.js";
import postRouter from "./routes/post.route.js";
import connectionRouter from "./routes/connection.route.js";
import commentRouter from "./routes/comment.route.js";
import notificationRouter from "./routes/notification.route.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";




const app = express();

app.use(
    cors({
        origin: "*",
        credentials: true
    })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);

app.use("/api/v1/healthcheck", healthCheckRouter);


app.use(
    "/api/v1/projects",
    projectRouter
);


app.use(
    "/api/v1/posts",
    postRouter
);

app.use(
    "/api/v1/connections",
    connectionRouter
);

app.use(
    "/api/v1/comments",
    commentRouter
);

app.use(
    "/api/v1/notifications",
    notificationRouter
);


app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

export default app;