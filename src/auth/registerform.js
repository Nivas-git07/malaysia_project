import { useState } from "react";

export default function RegistrationForm() {

    const [activeTab, setActiveTab] = useState("individual");

    return (
        <section className="regSection">
            <div className="regContainer">

                <h2 className="regTitle">REGISTRATION</h2>

                {/* ===== TAB SWITCH ===== */}
                <div className="regTabs">
                    <button
                        className={`regTab ${activeTab === "state" ? "active" : ""}`}
                        onClick={() => setActiveTab("state")}
                    >
                        State / Club
                    </button>

                    <button
                        className={`regTab ${activeTab === "individual" ? "active" : ""}`}
                        onClick={() => setActiveTab("individual")}
                    >
                        Individual Athlete
                    </button>
                </div>

                <form className="regForm">

                    {/* Athlete */}
                    <p className="regRowLabel">Athlete</p>
                    <div className="regGrid">
                        <input className="regInput" placeholder="First Name" />
                        <input className="regInput" placeholder="Last Name" />
                    </div>

                    {/* Email + Mobile */}
                    <div className="regGridLabel">
                        <p className="regRowLabel">Email</p>
                        <p className="regRowLabel">Mobile Number</p>
                    </div>

                    <div className="regGrid">
                        <input className="regInput" placeholder="e.g.,example@email.com" />
                        <input className="regInput" placeholder="e.g., +60 12 345 678" />
                    </div>

                    {/* DOB + Gender */}
                    <div className="regGridLabel">
                        <p className="regRowLabel">Date of Birth</p>
                        <p className="regRowLabel">Gender</p>
                    </div>

                    <div className="regGrid">
                        <input type="date" className="regInput" />

                        <div className="regField">


                            <select className="regSelect">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>


                    </div>

                    {/* State */}
                    <p className="regRowLabel">State / Region</p>
                    <input className="regInput full" placeholder="State / Region" />

                    <button className="regBtn">Register</button>

                </form>

            </div>
        </section>
    );
}
