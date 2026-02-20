import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
export default function Homeassoc() {
    const navigate = useNavigate();
      const goToState = (state) => {
    navigate(`/${state.toLowerCase()}`);
  };
    return (
        <section className="mfsaAssocBlock">

            <div className="mfsaAssocWrap">

                <h2 className="mfsaAssocMainTitle">
                    ASSOCIATED STATES
                </h2>


                <div className="mfsaAssocSlider">
                    <div className="mfsaAssocTrack">

                        <div className="mfsaAssocItem">
                            <p className="mfsaAssocTopText">8 CLUBS • 90 ATHLETES</p>

                            <div className="mfsaAssocCircle">
                                <img src={logo} alt="logo" />
                            </div>

                            <h3 className="mfsaAssocName">Johor</h3>

                            <button className="mfsaAssocViewBtn" onClick={() => goToState("tamilnadu")}>
                                View State →
                            </button>
                        </div>

                        <div className="mfsaAssocItem">
                            <p className="mfsaAssocTopText">12 CLUBS • 140 ATHLETES</p>

                            <div className="mfsaAssocCircle">
                                <img src={logo} alt="logo" />
                            </div>

                            <h3 className="mfsaAssocName">Penang</h3>

                            <button className="mfsaAssocViewBtn" onClick={() => goToState("kerala")}>
                                View State →
                            </button>
                        </div>

                        <div className="mfsaAssocItem">
                            <p className="mfsaAssocTopText">10 CLUBS • 120 ATHLETES</p>

                            <div className="mfsaAssocCircle">
                                <img src={logo} alt="logo" />
                            </div>

                            <h3 className="mfsaAssocName">Kuala Lumpur</h3>

                            <button className="mfsaAssocViewBtn" onClick={() => goToState("tamilnadu")}>
                                View State →
                            </button>
                        </div>

                        <div className="mfsaAssocItem">
                            <p className="mfsaAssocTopText" >8 CLUBS • 90 ATHLETES</p>

                            <div className="mfsaAssocCircle">
                                <img src={logo} alt="logo" />
                            </div>

                            <h3 className="mfsaAssocName">Johor</h3>

                            <button className="mfsaAssocViewBtn" onClick={() => goToState("kerala")}>
                                View State →
                            </button>
                        </div>

                        <div className="mfsaAssocItem">
                            <p className="mfsaAssocTopText">12 CLUBS • 140 ATHLETES</p>

                            <div className="mfsaAssocCircle">
                                <img src={logo} alt="logo" />
                            </div>

                            <h3 className="mfsaAssocName"> Penang</h3>

                            <button className="mfsaAssocViewBtn" onClick={() => goToState("tamilnadu")}>
                                View State →
                            </button>
                        </div>

                        <div className="mfsaAssocItem">
                            <p className="mfsaAssocTopText">10 CLUBS • 120 ATHLETES</p>

                            <div className="mfsaAssocCircle">
                                <img src={logo} alt="logo" />
                            </div>

                            <h3 className="mfsaAssocName">Kuala Lumpur</h3>

                            <button className="mfsaAssocViewBtn" onClick={() => goToState("Kuala Lumpur")}>
                                View State →
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
}