import jwt from "jsonwebtoken"
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    console.log(authHeader)
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        res.status(401).json({
            success: false,
            message: `Access denied, no token provided , please login to continue.`
        })

    }

    else {
        try {
            const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY)
            console.log(decodedTokenInfo)
            req.userInfo = decodedTokenInfo
        }
        catch (err) { }
    }
    next()
}