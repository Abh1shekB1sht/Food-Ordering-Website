import React from "react";
import "./Footer.css";
import { assets } from "../../src/assets/assets";

const Footer = () => {
    return (
        <div className="footer" id="footer">
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="Logo of the website" />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nisi molestiae repellat nihil modi, rerum ratione nemo
                        reprehenderit veniam accusamus cumque fuga consequuntur
                        sequi in commodi! Architecto commodi dolor odio facilis
                        voluptas facere, sapiente quam officia maiores odit.
                        Amet, ea. Fugiat incidunt consectetur quasi harum eos
                        obcaecati deserunt ad tempora neque?
                    </p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="Facebook" />
                        <img src={assets.twitter_icon} alt="Twitter" />
                        <img src={assets.linkedin_icon} alt="LinkedIn" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1-212-456-7890</li>
                        <li>support@fooddelivery.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">
                Copyright 2024 &copy; Tomato.com - All rights reserved.
            </p>
        </div>
    );
};

export default Footer;
