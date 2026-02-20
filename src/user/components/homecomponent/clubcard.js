import logo from "../../assets/logo.jpg";

export default function HomeClub() {

  const clubs = [
    { name: "Club Name", athletes: 120 },
    { name: "Elite Club", athletes: 95 },
    { name: "National Club", athletes: 140 },
    { name: "Pro Swim Club", athletes: 110 },
    { name: "Fins Academy", athletes: 80 },
    { name: "Speed Club", athletes: 150 },
  ];

  return (
    <section className="mfsaClubBlock">

      <div className="mfsaClubWrap">

        {/* TITLE */}
        <h2 className="mfsaClubTitle">ASSOCIATED CLUBS</h2>

        {/* SLIDER */}
        <div className="mfsaClubSlider">
          <div className="mfsaClubTrack">
 {/* <div className="assocCard">

                            <div className="assocTopBar" />

                            <div className="assocLogoWrap">
                                <img src={logo} alt="state" />
                            </div>

                            <h3 className="assocName">Kuala Lumpur</h3>

                            <p className="assocMeta">
                                10 clubs · 120 Atheletes
                            </p>

                            <button className="assocBtn">View All</button>

                        </div> */}
            {[...clubs, ...clubs].map((item, i) => (
              <div className="mfsaClubItem" key={i}>

                  <div className="assocTopBars" />

                <div className="assocLogoWraps">
                  <img src={logo} alt="logo" />
                </div>

                <h3 className="assocName">{item.name}</h3>
                <p className="assocMeta">
                  {item.athletes} Athletes
                </p>

                <button className="assocBtn">
                  View Club
                </button>

              </div>
            ))}

          </div>
        </div>

      </div>

    </section>
  );
}