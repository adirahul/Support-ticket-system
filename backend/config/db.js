import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connection successful!");
    } catch (error) {
        console.log("mongoDB connect error");
    }
}
export default connectDB;