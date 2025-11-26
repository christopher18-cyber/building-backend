import image from "../model/Image.js"
import uploadToCloudinary from "../helpers/cloudinaryHelpers.js"

export async function uploadImage(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: `File is required, please upload an image.`
            })
        } else {
            const { url, publicId } = await uploadToCloudinary(req.file.path)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: `Something went wrong, please try again.`
        })
    }
}