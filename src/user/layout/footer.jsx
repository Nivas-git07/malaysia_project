import logo from "../assets/logo.png";
import cmas from "../assets/cmas.png";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { get_content } from "../api/home_api";
import { useQuery } from "@tanstack/react-query";

/* =========================
   DEFAULT FALLBACK
========================= */
const DEFAULT_FOOTER = {
  footer_insta: "",
  footer_fb: "",
  footer_wp: "",
  footer_email: "info@finswim.org",
  footer_phone: "+91 12345 67890",
  footer_address: "123 Aquatic Lane, Malaysia",
  footer_recognized_by: "CMAS – World Underwater Federation",
  copy_rights: "© 2025 Malaysia fin Swimming Association. All Rights Reserved.",
};

/* =========================
   MERGE FUNCTION
========================= */
const mergeFooter = (apiData) => {
  if (!apiData) return DEFAULT_FOOTER;

  return Object.keys(DEFAULT_FOOTER).reduce((acc, key) => {
    acc[key] = apiData[key] || DEFAULT_FOOTER[key];
    return acc;
  }, {});
};

export default function Footer() {
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["footer"],
    queryFn: () =>
      get_content({
        page: "footer",
        national: "national_page", // ✅ REQUIRED
      }),
  });

  const footer = mergeFooter(data?.data);

  console.log("the footer content", footer);

  return (
    <footer className="footMain">
      <div className="footContainer">
        {/* LEFT */}
        <div className="footCol footBrandWrap">
          <div className="footBrandLogo">
            <img src={logo} alt="logo" className="footLogo" />
          </div>

          <div className="footBrandInfo">
            <h4 className="footBrandTitle">MFSA — User</h4>

            <div className="footSocial">
              <FaFacebookF
                onClick={() =>
                  footer.footer_fb && window.open(footer.footer_fb, "_blank")
                }
              />

              <FaInstagram
                onClick={() =>
                  footer.footer_insta &&
                  window.open(footer.footer_insta, "_blank")
                }
              />

              <FaWhatsapp
                onClick={() =>
                  footer.footer_wp && window.open(footer.footer_wp, "_blank")
                }
              />
            </div>

            <p>Email: {footer.footer_email}</p>
            <p>Phone: {footer.footer_phone}</p>

            <p className="contact-address">
              Address:
              {footer.footer_address?.split("\n").map((line, index) => (
                <span key={index} style={{ display: "block" }}>
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* NAV */}
        <div className="footCol">
          <h4>Navigation</h4>
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/about")}>About us</li>
            <li>Committee</li>
            <li>Privacy policy</li>
            <li>Terms of Use</li>
          </ul>
        </div>

        {/* QUICK */}
        <div className="footCol">
          <h4>Quick Access</h4>
          <ul>
            <li>FAQ's</li>
            <li onClick={() => navigate("/event")}>Events</li>
            <li onClick={() => navigate("/contact")}>Contact</li>
            <li onClick={() => navigate("/association")}>State</li>
            <li onClick={() => navigate("/athletes")}>Athletes</li>
          </ul>
        </div>

        {/* CMAS */}
        <div className="footCol footCmas">
          <img src={cmas} alt="cmas" className="footCmasLogo" />

          <p className="footRecognized">Recognized by</p>
          <p className="footCmasText">{footer.footer_recognized_by}</p>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="footBottom">
        <p>{footer.copy_rights}</p>
      </div>
    </footer>
  );
}
