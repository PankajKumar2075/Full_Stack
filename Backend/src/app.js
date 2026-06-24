import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";



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

import healthCheckRouter from "./routes/healthcheck.routes.js";

app.use("/api/v1/healthcheck", healthCheckRouter);

export default app;