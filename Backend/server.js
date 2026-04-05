import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { connectDB } from "./config/db.js";

// app config
const app = express();
const PORT = 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// route handler
app.get("/", (req, res) => {
    res.send("home page");
});

app.listen(PORT, () => [
    console.log("The project is running on http://localhost:4000"),
]);

// mongodb+srv://singhbisht84484:989984484@cluster0.qif0jas.mongodb.net/?appName=Cluster0
