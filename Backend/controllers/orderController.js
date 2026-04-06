import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order from frontend
const placeOrder = async (req, res) => {
    const CLIENT_URL = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        // saving order to database
        await newOrder.save();
        // clearing user cart after placing order
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // creating line items for stripe payment intent
        const line_items = req.body.items.map((item) => {
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100 * 80,
                },
                quantity: item.quantity,
            };
        });

        // adding delivery charges to line items
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2 * 80 * 100,
            },
            quantity: 1,
        });

        // creating stripe payment intent
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            payment_method_types: ["card"],
            success_url: `${CLIENT_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${CLIENT_URL}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.status(200).json({ success: true, url: session.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error occurred while processing the order.",
        });
    }
};

export { placeOrder };
