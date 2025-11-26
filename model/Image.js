import mongoose from "mongoose"
const ImageSchema = new mongoose.Schema({
    url: {
        type: String,
        reuired: true
    },
    publicId: {
        type: String,
        reuired: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

export default mongoose.model("Image", ImageSchema)