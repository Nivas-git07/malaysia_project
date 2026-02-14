import logo from "../assets/logo.jpg";
import cmas from "../assets/cmas.png";

import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="footMain">

            <div className="footContainer">

                {/* ===== LEFT COLUMN ===== */}
                <div className="footCol footBrandWrap">

                    {/* LOGO COLUMN */}
                    <div className="footBrandLogo">
                        <img src={logo} alt="logo" className="footLogo" />
                    </div>

                    {/* CONTACT COLUMN */}
                    <div className="footBrandInfo">

                        <div className="footSocial">
                            <FaFacebookF />
                            <FaInstagram />
                            <FaWhatsapp />
                        </div>

                        <p>Email: info@finswim.org</p>
                        <p>Phone: +91 12345 67890</p>
                        <p>Address: 123 Aquatic Lane, Malaysia</p>

                    </div>

                </div>


                {/* ===== EXPLORE ===== */}
                <div className="footCol">
                    <h4>Explore</h4>
                    <ul>
                        <li>About us</li>
                        <li>Committee</li>
                        <li>Privacy policy</li>
                        <li>Terms of Use</li>
                    </ul>
                </div>

                {/* ===== QUICK ACCESS ===== */}
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

                {/* ===== CMAS ===== */}
                <div className="footCol footCmas">
                    <img src={cmas} alt="cmas" className="footCmasLogo" />

                    <p className="footRecognized">Recognized by</p>
                    <p className="footCmasText">
                        CMAS – World Underwater Federation
                    </p>
                </div>

            </div>

            {/* ===== SMALL FOOTER ===== */}
            <div className="footBottom">
                <p>© 2025 Malaysia fin Swimming Association. All Rights Reserved.</p>
            </div>

        </footer>
    );
}
