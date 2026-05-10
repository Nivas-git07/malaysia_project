import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import a1 from "../../assets/athlete.jpg";
import a2 from "../../assets/athlete2.jpg";
import a3 from "../../assets/athlete3.jpg";
import a4 from "../../assets/athlete4.jpg";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaGlobe, FaMedal } from "react-icons/fa";

export default function AthleteGrid({ athletes }) {
  const navigate = useNavigate();
  const { stateId, clubId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(athletes.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAthletes = athletes.slice(startIndex, startIndex + itemsPerPage);

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <section className="athListSection">
      <div className="athListContainer">
        <h2 className="athListTitle">
          <span></span> ATHLETES LIST
        </h2>

        {/* GRID */}
        <div className="athListGrid">
          {currentAthletes.map((item) => (
            <div
              className="athListCard"
              key={item.id}
              onClick={() =>
                navigate(
                  `/state/${stateId}/club/${clubId}/atheleteprofile/${item.id}`,
                )
              }
            >
              {/* AVATAR */}
              <div className="athListImgWrap">
                <img src={item.profile_picture} alt={item.full_name} />

                {/* BADGE */}
                <div className="athBadge">
                  <FaMedal />
                </div>
              </div>

              {/* NAME */}
              <h3 className="athListName">{item.full_name}</h3>

              {/* CLUB */}
              <p className="athListClub">{item.discipline}</p>

              {/* DIVIDER */}
              <div className="athListDivider"></div>

              {/* INFO */}
              <div className="athListInfo">
                <div className="infoRow">
                  <span>Birth Date</span>
                  <strong>{item.date_of_birth}</strong>
                </div>

                <div className="infoRow">
                  <span>State</span>
                  <strong className="country">
                    <FaGlobe /> {item.state_name}
                  </strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="athPaginationWrap">
          <p className="athPaginationInfo">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, athletes.length)} of{" "}
            {athletes.length} entries
          </p>

          <div className="eventsPagination">
            <button onClick={prevPage}>
              <FiChevronLeft />
            </button>

            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                className={currentPage === num ? "active" : ""}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}

            <span className="dots">...</span>

            <button
              className={currentPage === totalPages ? "active" : ""}
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </button>

            <button onClick={nextPage}>
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
