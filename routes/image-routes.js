import express from "express"
const router = express.Router()
import { authMiddleware } from "../middleware/auth-middleware.js"
import { isAdminUser } from "../middleware/admin-middleware.js"
import { uploadMiddleware } from "../middleware/upload-middleware.js"
import { uploadImage, fetchImageControllers, deleteImageController } from "../controllers/image-controllers.js"
console.log("uploadMiddleware (type):", typeof uploadMiddleware, uploadMiddleware && Object.keys(uploadMiddleware));

router.post("/upload", authMiddleware, isAdminUser, uploadMiddleware.single("image"), uploadImage)

router.get("/get", authMiddleware, fetchImageControllers)
router.delete("/:id", authMiddleware, isAdminUser, deleteImageController)

export default router