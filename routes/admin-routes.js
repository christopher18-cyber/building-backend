import express from "express"
import { authMiddleware } from "../middleware/auth-middleware.js"
const router = express.Router()

router.get("/welcome", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: `Welcome to the admin page.`
    })
})

export default router