import logo from "../../assets/logo.jpg"

export default function AssociatedStates() {

    const states = [
        { id: 1, name: "George Town", clubs: 10, athletes: 120 },
        { id: 2, name: "Kuala Lumpur", clubs: 10, athletes: 120 },
        { id: 3, name: "Petaling", clubs: 10, athletes: 120 },
        { id: 4, name: "Terengganu", clubs: 10, athletes: 120 },
        { id: 5, name: "George Town", clubs: 10, athletes: 120 },
        { id: 6, name: "Kuala Lumpur", clubs: 10, athletes: 120 },
    ];

    return (
        <section className="assocStateSection">
            <div className="assocStateContainer">


                <div className="assocStateHeader">
                    <h2 className="assocStateTitle">ASSOCIATED STATES</h2>
                </div>


                <div className="assocStateGrid">
                    {states.map(item => (
                        <div className="assocCard">

                            <div className="assocTopBar" />

                            <div className="assocLogoWrap">
                                <img src={logo} alt="state" />
                            </div>

                            <h3 className="assocName">Kuala Lumpur</h3>

                            <p className="assocMeta">
                                10 clubs · 120 Atheletes
                            </p>

                            <button className="assocBtn">View All</button>

                        </div>


                    ))}
                </div>


                <div className="assocStateFooter">
                    <span>View All →</span>
                </div>

            </div>
        </section>
    );
}
