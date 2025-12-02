import User from "../model/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// register conteroller
export async function registerUser(req, res) {
    try {
        const { username, email, password, role } = req.body
        const checkExistingUser = await User.findOne({ $or: [{ username }, { email }] })
        if (checkExistingUser) {
            res.status(404).json({
                message: `User is already existing either with same username or email, please try with a different email or username.`,
                success: false,
            })
        } else {
            // hash the password
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(password, salt)

            const newlyCreatedUser = new User({
                username,
                email,
                password: hashed,
                role: role || "user"
            })

            await newlyCreatedUser.save()
            if (newlyCreatedUser) {
                res.status(201).json({
                    message: `User registration is successful`,
                    success: true,
                })
            } else {
                res.status(201).json({
                    message: `Unable to register user, please try again.`,
                    success: false,
                })
            }
        }

    }
    catch (err) {
        console.error(err)
        res.status(500).json({
            message: `Some error occured.`,
            success: false,
        })
    }
}

// login conteroller
export async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })
        if (!user) {
            res.status(400).json({
                message: `Invalid username or password.`,
                success: false,
            })
        } else {
            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (!isPasswordMatch) {
                res.status(404).json({
                    message: `Invalid password.`,
                    success: false,
                })
            } else {
                // create user token
                const accessToken = jwt.sign({
                    userId: user._id,
                    username: user.username,
                    role: user.role
                }, process.env.JWT_SECRET_KEY, { expiresIn: "30m" })
                res.status(200).json({
                    message: `Logged in successfully`,
                    success: true,
                    accessToken
                })
            }
        }
    }
    catch (err) {
        console.error(err)
        res.status(500).json({
            message: `Some error occured.`,
            success: false,
        })
    }
}

export async function changePassword(req, res) {
    try {
        const userId = req.userInfo.userId

        // extract old and new password
        const { oldPassword, newPassword } = req.body

        // find the current logged in user

        const user = await User.findById(userId)

        if (!user) {
            res.status(400).json({
                success: false,
                message: `User not found.`
            })
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isPasswordMatch) {
            res.status(400).json({
                success: false,
                message: "The old password is not correct!, please try again."
            })
        }
        // hash the new password
        const salt = await bcrypt.genSalt(10)
        const newhashedPassword = await bcrypt.hash(newPassword, salt)

        // update password
        user.password = newhashedPassword
        await user.save()

        res.status(200).json({
            success: true,
            message: `Password changed successfully.`
        })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({
            message: `Some error occured.`,
            success: false,
        })
    }
}


export async function forgottenPassword(req, res) {
    try { }
    catch (err) {
        console.error(err)
        res.status(500).json({
            message: ``,
            success: false
        })
    }
}