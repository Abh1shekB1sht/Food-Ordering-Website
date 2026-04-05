import foodModel from "../models/foodModel.js";
import fs from "node:fs";

// add food item
const addFood = async (req, res) => {
    const image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: image_filename,
    });
    try {
        await food.save();
        res.status(200).json({ message: "Food item added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding food item" });
    }
};

export { addFood };
