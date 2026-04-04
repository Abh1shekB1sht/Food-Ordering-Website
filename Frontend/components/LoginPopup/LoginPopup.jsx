import React, { useState } from "react";
import { assets } from "../../src/assets/assets";
import "./LoginPopup.css";

const LoginPopup = ({ setShowLogin }) => {
    const [currentState, setCurrentState] = useState("Sign Up");

    return (
        <div className="login-popup">
            <form className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentState === "login" ? "Login" : "Sign Up"}</h2>
                    <img
                        onClick={() => setShowLogin(false)}
                        src={assets.cross_icon}
                        alt=""
                    />
                </div>
                <div className="login-popup-inputs">
                    {currentState === "Login" ? null : (
                        <input type="text" placeholder="Your Name" required />
                    )}
                    <input type="email" placeholder="Your email" required />
                    <input type="password" placeholder="Password" required />
                </div>
                <button>
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
