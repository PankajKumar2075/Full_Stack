import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

    const { fullName, email, username, password } = req.body;

    if (
        [fullName, email, username, password]
            .some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(
            409,
            "User with email or username already exists"
        );
    }

    const user = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password
    });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                user,
                "User registered successfully"
            )
        );
});

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(
            400,
            "Email and password are required"
        );
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(
            404,
            "User does not exist"
        );
    }

    const isPasswordValid =
        await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(
            401,
            "Invalid credentials"
        );
    }

    const accessToken =
        user.generateAccessToken();

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user,
                accessToken
            },
            "Login successful"
        )
    );
});

const getCurrentUser = asyncHandler(
    async (req, res) => {

        return res.status(200).json(
            new ApiResponse(
                200,
                req.user,
                "Current user fetched successfully"
            )
        );
    }
);

export { registerUser , loginUser , getCurrentUser};