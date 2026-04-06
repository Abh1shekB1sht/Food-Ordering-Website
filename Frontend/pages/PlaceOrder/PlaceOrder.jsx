import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } =
        useContext(StoreContext);
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: "",
    });

    const placeOrder = async (e) => {
        e.preventDefault();
        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                const itemInfo = { ...item, quantity: cartItems[item._id] };
                orderItems.push(itemInfo);
            }
        });
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        };
        let response = await axios.post(`${url}/api/order/place`, orderData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data.success) {
            const { url: session_url } = response.data;
            window.location.replace(session_url);
        } else {
            alert("Failed to place order. Please try again.");
        }
    };

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value });
    };

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input
                        required
                        onChange={onChange}
                        name="firstName"
                        value={data.firstName}
                        type="text"
                        placeholder="First Name"
                    />
                    <input
                        required
                        onChange={onChange}
                        name="lastName"
                        value={data.lastName}
                        type="text"
                        placeholder="Last Name"
                    />
                </div>
                <input
                    required
                    onChange={onChange}
                    name="email"
                    value={data.email}
                    type="email"
                    placeholder="Email Address"
                />
                <input
                    required
                    onChange={onChange}
                    name="street"
                    value={data.street}
                    type="text"
                    placeholder="Street"
                />
                <div className="multi-fields">
                    <input
                        required
                        onChange={onChange}
                        name="city"
                        value={data.city}
                        type="text"
                        placeholder="City"
                    />
                    <input
                        required
                        onChange={onChange}
                        name="state"
                        value={data.state}
                        type="text"
                        placeholder="State"
                    />
                </div>
                <div className="multi-fields">
                    <input
                        required
                        onChange={onChange}
                        name="zipCode"
                        value={data.zipCode}
                        type="text"
                        placeholder="Zip Code"
                    />
                    <input
                        required
                        onChange={onChange}
                        name="country"
                        value={data.country}
                        type="text"
                        placeholder="Country"
                    />
                </div>
                <input
                    required
                    onChange={onChange}
                    name="phone"
                    value={data.phone}
                    type="text"
                    placeholder="Phone"
                />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>SubTotal</p>
                            <p>{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>
                                {getTotalCartAmount() === 0
                                    ? 0
                                    : getTotalCartAmount() + 2}
                            </b>
                        </div>
                    </div>
                    <button type="submit">PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
