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
        res.status(200).json({
            success: true,
            message: "Food item added successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding food item",
        });
    }
};

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.status(200).json({ success: true, data: foods });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching food items",
        });
    }
};

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res
                .status(400)
                .json({ success: false, message: "Food item not found" });
        }
        await foodModel.findByIdAndDelete(req.body.id);
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) {
                console.error("Error deleting image file:", err);
            }
        });
        res.status(200).json({
            success: true,
            message: "Food item removed successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error removing food item",
        });
    }
};

export { addFood, listFood, removeFood };
