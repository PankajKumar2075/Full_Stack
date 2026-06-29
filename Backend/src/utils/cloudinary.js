import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
    try {

        if (!localFilePath) return null;

        //  Configure Cloudinary INSIDE function
        // cloudinary.config({
        //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        //     api_key: process.env.CLOUDINARY_API_KEY,
        //     api_secret: process.env.CLOUDINARY_API_SECRET
        // });

        console.log("Current Cloudinary Config:");
        console.log(cloudinary.config());

        const response = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: "auto"
            }
        );

        fs.unlinkSync(localFilePath);

        return response;

    } catch (error) {

        console.log("========== CLOUDINARY ERROR ==========");
        console.log(error);
        console.log("=====================================");

        if (
            localFilePath &&
            fs.existsSync(localFilePath)
        ) {
            fs.unlinkSync(localFilePath);
        }

        return null;
    }
};

export { uploadOnCloudinary };