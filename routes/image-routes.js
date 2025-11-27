import express from "express"
const router = express.Router()
import { authMiddleware } from "../middleware/auth-middleware.js"
import { isAdminUser } from "../middleware/admin-middleware.js"
import { uploadMiddleware } from "../middleware/upload-middleware.js"
import { uploadImage, fetchImageControllers } from "../controllers/image-controllers.js"
console.log("uploadMiddleware (type):", typeof uploadMiddleware, uploadMiddleware && Object.keys(uploadMiddleware));

router.post("/upload", authMiddleware, isAdminUser, uploadMiddleware.single("image"), uploadImage)

router.get("/get", authMiddleware, fetchImageControllers)

export default router 