import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectToDB from "./database/db.js"
import authRoutes from "./routes/auth-routes.js"
import homeRoutes from "./routes/home-routes.js"

connectToDB()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/home", homeRoutes)

app.listen(PORT, () => {
    console.log(`Server is now listening on ${PORT}`)
}) 