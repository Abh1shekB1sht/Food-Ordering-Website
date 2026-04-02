import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with care and precision. From sizzling gourmet specialties to
          comforting classics, each item is made with the freshest ingredients
          to satisfy every craving.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
