import express from "express"
const isAdminUser = (req, res, next) => {
    if (req.user.role !== "admin") {
        res.status(403).json({
            success: false,
        })
    }
}