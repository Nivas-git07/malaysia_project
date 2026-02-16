
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import a1 from "../../assets/image.png";
import a2 from "../../assets/image.png";
import a3 from "../../assets/image.png";

export default function FeaturedAthletes() {

    const athletes = [
        { img: a1, name: "Jane Cooper", record: "500m, Bi-fins" },
        { img: a2, name: "Wade Warren", record: "500m, Bi-fins" },
        { img: a3, name: "Leslie Alexander", record: "500m, Bi-fins" },
    ];

    return (
        <section className="featuredSection">


            <div className="featuredTop">
                <h2 className="featuredTitle">FEATURED ATHELETES</h2>

                <div className="featuredNav">
                    <button><FiArrowLeft /></button>
                    <button><FiArrowRight /></button>
                </div>
            </div>


            <div className="featuredGrid">

                {athletes.map((item, index) => (
                 
                    <div className="athleteCard" key={index}>

                        <img src={item.img} alt="athlete" className="athleteImg" />

                        {/* overlay layer */}
                        <div className="athleteOverlay"></div>

                        {/* TEXT CENTER */}
                        <div className="athleteContent">
                            <p className="athleteName">{item.name}</p>
                            <h3 className="athleteRecord">{item.record}</h3>
                        </div>

                    </div>

                ))}

            </div>

        </section>
    )
}
