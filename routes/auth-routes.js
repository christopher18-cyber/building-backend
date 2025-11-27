import express from "express"
const router = express.Router()
import { registerUser, loginUser, changePassword, forgottenPassword } from "../controllers/auth-controller.js"
import { authMiddleware } from "../middleware/auth-middleware.js"
router.post("/regsiter", registerUser)
router.post("/login", loginUser)
router.post("/change-password", authMiddleware, changePassword)
// router.post("/forgotten-password", authMiddleware, forgottenPassword)
export default router