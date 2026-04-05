import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://singhbisht84484:qTRG3066Lr0klASb@cluster0.ysttxpk.mongodb.net/foodora?retryWrites=true&w=majority",
        );
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};
