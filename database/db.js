import mongoose from "mongoose";

const uri = process.env.MONGO_URI;

async function connectToDB() {
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