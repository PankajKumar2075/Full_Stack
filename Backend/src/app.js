import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import healthCheckRouter from "./routes/healthcheck.routes.js";
import userRouter from "./routes/user.routes.js";
import projectRouter from "./routes/project.routes.js";
import postRouter from "./routes/post.route.js";


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

export default app;