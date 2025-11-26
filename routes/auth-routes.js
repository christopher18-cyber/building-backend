import express from "express"
const router = express.Router()
import { registerUser, loginUser } from "../controllers/auth-controller.js"
router.post("/regsiter", registerUser)
router.post("/login", loginUser)
export default router