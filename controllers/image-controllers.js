import Image from "../model/Image.js"
import uploadToCloudinary from "../helpers/cloudinaryHelpers.js"
import fs from "fs"
import cloudinary from "../config/cloudinary.js"
import { create } from "domain"


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
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const skip = (page - 1) * limit
        const sortBy = req.query.sortBy || "createdAt"
        const sortOrder = req.query.sortOrder === "asc" ? 1 : -1
        const totalImages = await Image.countDocuments()
        const totalPages = Math.ceil(totalImages / limit)
        const sortObj = {}
        sortObj[sortBy] = sortOrder
        const images = await Image.find().sort(sortObj).skip(skip).limit(limit)

        if (images) {
            res.status(200).json({
                success: true,
                currentPage: page,
                totalPage: totalPages,
                totalImages: totalImages,
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


export async function deleteImageController(req, res) {
    try {
        const getCurrentIdofImageToBeDeleted = req.params.id
        const userId = req.userInfo.userId

        const image = await Image.findById(getCurrentIdofImageToBeDeleted)

        if (!image) {
            return res.status(404).json({
                success: false,
                message: `Image not found.`
            })
        } else {
            if (image.uploadedBy.toString() !== userId) {
                return res.status(403).json({
                    message: `You are not authorized to delete this image`,
                    success: false
                })
            } else {
                await cloudinary.uploader.destroy(image.publicId)
                await Image.findByIdAndDelete(getCurrentIdofImageToBeDeleted)

                res.status(200).json({
                    success: true,
                    image: `Image deleted successfully.`
                })
            }
        }
    }
    catch (err) {
        console.error(err)
        res.status(500).json({
            message: `Some error occured.`,
            success: false,
        })
    }

}

// export default uploadImage