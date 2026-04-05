import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../src/assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import "./LoginPopup.css";

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);
    const [currentState, setCurrentState] = useState("Sign Up");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const onLogin = async (e) => {
        e.preventDefault();
        // Login logic here
        let newUrl = url;
        if (currentState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }
        const response = await axios.post(newUrl, data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
            toast(response.data.message);
        } else {
            toast(response.data.message);
        }
    };

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState === "Login" ? "Login" : "Sign Up"}</h2>
                    <img
                        onClick={() => setShowLogin(false)}
                        src={assets.cross_icon}
                        alt=""
                    />
                </div>
                <div className="login-popup-inputs">
                    {currentState === "Login" ? null : (
                        <input
                            onChange={onChangeHandler}
                            value={data.name}
                            name="name"
                            type="text"
                            placeholder="Your Name"
                            required
                        />
                    )}
                    <input
                        onChange={onChangeHandler}
                        value={data.email}
                        name="email"
                        type="email"
                        placeholder="Your email"
                        required
                    />
                    <input
                        onChange={onChangeHandler}
                        value={data.password}
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit">
                    {currentState === "Sign Up" ? "Create Account" : "Login"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>
                        By continuing, I agree to the Terms of Service and
                        Privacy Policy.
                    </p>
                </div>
                {currentState === "Login" ? (
                    <p>
                        Create a new account?{" "}
                        <span onClick={() => setCurrentState("Sign Up")}>
                            Click here
                        </span>
                    </p>
                ) : (
                    <p>
                        Already have an account?{" "}
                        <span onClick={() => setCurrentState("Login")}>
                            Login here
                        </span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;
