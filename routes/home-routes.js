import express from "express"
import { authMiddleware } from "../middleware/auth-middleware.js"
const router = express.Router()
router.get("/welcome", authMiddleware, (req, res) => {
    res.json({
        message: `Welcome to the home page`
    })
})

export default router