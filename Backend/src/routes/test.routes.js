import { Router } from "express";
import { User } from "../models/user.model.js";

const router = Router();

router.get("/", async (req, res) => {
    const user = await User.create({
        fullName: "Pankaj Kumar",
        username: "pankaj",
        email: "pankaj@gmail.com",
        password: "123456"
    });

    res.json(user);
});

export default router;