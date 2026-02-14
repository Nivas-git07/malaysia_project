import logo from "../assets/logo.jpg"


function Navbar() {
    return (
        <nav className="navbar container">
            <div className="logo">
                <img src={logo} alt="logo" />
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
    )
}

export default Navbar;