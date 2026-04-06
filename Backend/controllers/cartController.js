import userModel from "../models/userModel.js";

// add to cart
const addToCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        // if item is not in cart, add it with quantity 1
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            // if item is already in cart, increase quantity by 1
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        return res
            .status(200)
            .json({ success: true, message: "Item added to cart" });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Error adding to cart" });
    }
};

// remove from cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        // if item is not in cart, return error
        if (!cartData[req.body.itemId]) {
            return res
                .status(400)
                .json({ success: false, message: "Item not in cart" });
        }
        // if item is in cart, decrease quantity by 1
        if (cartData[req.body.itemId]) {
            cartData[req.body.itemId] -= 1;
            // if quantity is 0, remove item from cart
            if (cartData[req.body.itemId] === 0) {
                delete cartData[req.body.itemId];
            }
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        return res
            .status(200)
            .json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Error removing from cart" });
    }
};

// fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        // if cart is empty, return error
        if (Object.keys(cartData).length === 0) {
            return res
                .status(400)
                .json({ success: false, message: "Cart is empty" });
        }
        // if cart is not empty, return cart data
        return res.status(200).json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Error fetching cart data" });
    }
};

export { addToCart, removeFromCart, getCart };
