import express from "express"
export const isAdminUser = (req, res, next) => {
    if (req.userInfo.role !== "admin") {
        res.status(403).json({
            success: false,
            message: `Access denied, Admin rights required.`
        })
    }
    next()
}