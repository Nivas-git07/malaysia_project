export default function Header() {
  return (
    <section className="hero">

      {/* ===== TOP HEADER ===== */}
      <div className="topbar">
        <div className="container topbarFlex">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

          <div className="contact">
            <span>✉ malaysia@gmail.com</span>
            <span>📞 9997776643</span>
          </div>
        </div>
      </div>

      {/* ===== NAVBAR ===== */}
      <nav className="navbar container">
        <div className="logo">
          <img src="/logo.png" alt="logo"/>
        </div>

        <ul className="menu">
          <li>HOME</li>
          <li>ABOUT US</li>
          <li>MEMBERSHIP</li>
          <li>ASSOCIATIONS</li>
          <li>EVENTS</li>
          <li>NEWS</li>
          <li>CONTACT</li>
        </ul>

        <div className="navBtns">
          <button className="btnOutline">MEMBER</button>
          <button className="btnFill">LOG IN</button>
        </div>
      </nav>

      {/* ===== HERO CONTENT ===== */}
      <div className="container heroContent">
        <div className="left">
          <h1>
            JOIN THE MALAYSIA <br/>
            <span className="red">FINSWIMMING</span><br/>
            ASSOCIATION
          </h1>

          <button className="cta">Get Started</button>
        </div>

        <div className="right">
          <p>
            Register as a <br/>
            State, Club, or <br/>
            <span className="red">Individual Athlete</span>
          </p>
        </div>
      </div>

    </section>
  );
}
