import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
import "./models/user.model.js";

dotenv.config({
    path: "./.env"
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(
                `⚙️ Server running on port ${process.env.PORT}`
            );
        });
    })
    .catch((error) => {
        console.log("Server Error:", error);
    });