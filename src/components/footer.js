import logo from "../assets/logo.jpg";
import cmas from "../assets/cmas.png";

import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="footMain">

            <div className="footContainer">

              
                <div className="footCol footBrandWrap">

                  
                    <div className="footBrandLogo">
                        <img src={logo} alt="logo" className="footLogo" />
                    </div>

                
                    <div className="footBrandInfo">

                        <div className="footSocial">
                            <FaFacebookF />
                            <FaInstagram />
                            <FaWhatsapp />
                        </div>

                        <p>Email: info@finswim.org</p>
                        <p>Phone: +91 12345 67890</p>
                        <p className="contact-address">Address: 123 Aquatic Lane, Malaysia</p>

                    </div>

                </div>

                <div className="footCol">
                    <h4>Explore</h4>
                    <ul>
                        <li>About us</li>
                        <li>Committee</li>
                        <li>Privacy policy</li>
                        <li>Terms of Use</li>
                    </ul>
                </div>

                <div className="footCol">
                    <h4>Quick Access</h4>
                    <ul>
                        <li>FAQ's</li>
                        <li>Events</li>
                        <li>Contact</li>
                        <li>Clubs</li>
                        <li>Athletes</li>
                    </ul>
                </div>

               
                <div className="footCol footCmas">
                    <img src={cmas} alt="cmas" className="footCmasLogo" />

                    <p className="footRecognized">Recognized by</p>
                    <p className="footCmasText">
                        CMAS – World Underwater Federation
                    </p>
                </div>

            </div>

            <div className="footBottom">
                <p>© 2025 Malaysia fin Swimming Association. All Rights Reserved.</p>
            </div>

        </footer>
    );
}
