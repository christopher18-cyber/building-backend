import cloudinary from "../config/cloudinary";

export async function uploadToCloudinary(filePath) {
    try {
        const result = await cloudinary.uploader.upload(filePath)
        return {
            url: result.secure_url,
            publicId: result.public_id
        }
    }
    catch (err) { "Error while uploading to cloudinary.", err }
    throw new Error("Error while uploading to cloudinary.");

}

export default uploadToCloudinary