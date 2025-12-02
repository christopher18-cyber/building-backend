import mongoose from "mongoose";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

async function connectDB() {
    try {
        await mongoose.connect(uri, {
            dbName: "myDatabase", // optional if included in URI
        });
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection failed", err);
    }
}



export default connectToDB