import EventCard from "./eventcard";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import img1 from "../../assets/image2.jpg"
import img2 from "../../assets/image3.jpg"
import img3 from "../../assets/background.png"
import logo from "../../assets/logo.jpg"
import { useNavigate } from "react-router-dom";
export default function UpcomingEvents() {
    const navigate = useNavigate();
    const events = [
        {
            bg: img1,
            title: "Finswimming Association",
            date: "09.10.2025",
            country: "Malaysia"
        },
        {
            bg: img2,
            title: "National Swim Event",
            date: "12.11.2025",
            country: "Kuala Lumpur"
        },
        {
            bg: img3,
            title: "Underwater Championship",
            date: "01.12.2025",
            country: "Selangor"
        }
    ];

    return (
        <section className="homeEventsSection">

            
            <div className="homeEventsHeader">

                <h2 className="homeEventsTitle">
                    UPCOMING EVENTS
                </h2>

                <div className="homeEventsActions">
                    <button className="navArrow"><FiChevronLeft /></button>
                    <button className="navArrow"><FiChevronRight /></button>

                    <span className="viewAll" onClick={() => {navigate("/event")}}>
                        View All <FiArrowRight />
                    </span>
                </div>

            </div>

            <div className="homeEventsGrid">
                {events.map((item, index) => (
                    <EventCard
                        key={index}
                        bg={item.bg}
                        logo={logo}
                        title={item.title}
                        date={item.date}
                        country={item.country}
                    />
                ))}
            </div>

        </section>
    )
}
