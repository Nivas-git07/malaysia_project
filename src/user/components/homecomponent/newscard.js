import { FiArrowRight } from "react-icons/fi";

export default function NewsCard({ img, title }){

  return(

    <div className="newsCard">

      <img src={img} className="newsImg" alt="news"/>

      {/* OVERLAY */}
      <div className="newsOverlay">

        <div className="newsTop">
          <div className="newsArrow"><FiArrowRight/></div>

          <p className="newsMeta">
            09.10.2025 <span>|</span> Malaysia
          </p>
        </div>

        <h3 className="newsHeading">
          {title}
        </h3>

        <p className="newsDesc">
          Lorem ipsum in velit amet tempor 3–16,
          lorem ipsum in velit amet tempor.
        </p>

      </div>

    </div>

  )
}
