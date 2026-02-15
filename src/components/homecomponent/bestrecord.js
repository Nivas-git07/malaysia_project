import { useState } from "react";
import RecordCard from "./recordcard";

export default function BestRecords() {

    const [active, setActive] = useState("Surface");

    const records = [
        {
            name: "Cesar CIELO FILHO",
            time: "20.91",
            championship: "Brazilian National Championships (50m)",
            state: "Kuala Lumpur",
            date: "18 Dec 2009"
        },
        {
            name: "Cesar CIELO FILHO",
            time: "20.91",
            championship: "Brazilian National Championships (50m)",
            state: "Kuala Lumpur",
            date: "18 Dec 2009"
        },
        {
            name: "Cesar CIELO FILHO",
            time: "20.91",
            championship: "Brazilian National Championships (50m)",
            state: "Kuala Lumpur",
            date: "18 Dec 2009"
        }
    ];

    const categories = ["Surface", "Bi-fins", "Apnea", "Immersion"];

    return (

        <section className="bestRecordsSection">

            <div className="bestRecordsContainer">

                <h2 className="bestRecordsTitle">BEST RECORDS</h2>

                <div className="bestRecordsLayout">

                    {/* LEFT MENU */}
                    <div className="bestRecordsMenu">



                        {categories.map((item) => (
                            <button
                                key={item}
                                onClick={() => setActive(item)}
                                className={`bestMenuItem ${active === item ? "active" : ""}`}
                            >
                                {item}
                            </button>
                        ))}

                    </div>

                    {/* RIGHT CARDS */}
                    <div className="bestRecordsRight">

                        {/* 🔥 Dynamic Title */}
                        <h3 className="bestRecordsActiveTitle">
                            {active}
                        </h3>

                        <div className="bestRecordsGrid">
                            {records.map((rec, index) => (
                                <RecordCard key={index} {...rec} />
                            ))}
                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}
