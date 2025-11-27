import Image from "../model/Image.js"
import uploadToCloudinary from "../helpers/cloudinaryHelpers.js"
import fs from "fs"

export async function uploadImage(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: `File is required, please upload an image.`
            })
        } else {
            const { url, publicId } = await uploadToCloudinary(req.file.path)

            // store in database
            const newlyUploadedImage = new Image({
                url,
                publicId,
                uploadedBy: req.userInfo.userId
            })

            await newlyUploadedImage.save()

            // delete local file safely
            try {
                fs.unlinkSync(req.file.path);
            } catch (err) {
                console.error("Failed to delete local file:", err);
            }
            res.status(201).json({
                success: true,
                message: `Image uploaded successfully`,
                image: newlyUploadedImage
            })
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

export async function fetchImageControllers(req, res) {
    try {
        const images = await Image.find({})

        if (images) {
            res.status(200).json({
                success: true,
                data: images
            })
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

// export default uploadImage