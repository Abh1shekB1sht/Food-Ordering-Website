import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";

// app config
const app = express();
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);

// route handler
app.get("/", (req, res) => {
    res.send("home page");
});

app.listen(PORT, () => [
    console.log("The project is running on http://localhost:4000"),
]);

// mongodb+srv://singhbisht84484:989984484@cluster0.qif0jas.mongodb.net/?appName=Cluster0
