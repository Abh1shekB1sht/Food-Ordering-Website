import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb://singhbisht84484_db_user:8448463607@ac-gjt0krx-shard-00-00.wqwqt5c.mongodb.net:27017,ac-gjt0krx-shard-00-01.wqwqt5c.mongodb.net:27017,ac-gjt0krx-shard-00-02.wqwqt5c.mongodb.net:27017/?ssl=true&replicaSet=atlas-13tm4m-shard-0&authSource=admin&appName=Cluster0",
        );
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};
