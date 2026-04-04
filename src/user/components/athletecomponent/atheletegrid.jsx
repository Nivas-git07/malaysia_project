import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import a1 from "../../assets/athlete.jpg";
import a2 from "../../assets/athlete2.jpg";
import a3 from "../../assets/athlete3.jpg";
import a4 from "../../assets/athlete4.jpg";
import { useNavigate } from "react-router-dom";
import { getclubathlete } from "../../api/club";
import { useQuery } from "@tanstack/react-query";
import { FaGlobe, FaMedal } from "react-icons/fa";
import { useParams } from "react-router-dom";
export default function AthleteGrid() {
  const navigate = useNavigate();
  const { clubId } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["clubAthletes"],
    queryFn: () => getclubathlete(clubId),
    refetchOnWindowFocus: false,
    retry: false,
  });
  const athletesData = data?.data || [];


  console.log("Club Athletes Data:", athletesData);

  const athletes = [
    {
      id: 1,
      name: "Cameron Williamson",
      dob: "09/05/2000",
      country: "Sweden",
      img: a1,
    },
    {
      id: 2,
      name: "Daniel Tan",
      dob: "12/05/2004",
      country: "Malaysia",
      img: a2,
    },
    {
      id: 3,
      name: "Sarah Chen",
      dob: "05/01/2005",
      country: "Singapore",
      img: a3,
    },
    {
      id: 4,
      name: "Marcus Lim",
      dob: "18/11/2006",
      country: "Malaysia",
      img: a4,
    },
    {
      id: 5,
      name: "Jason Low",
      dob: "22/09/2003",
      country: "Malaysia",
      img: a1,
    },
    {
      id: 6,
      name: "Michelle Lee",
      dob: "18/11/2006",
      country: "Malaysia",
      img: a2,
    },
    {
      id: 7,
      name: "Ahmad Zaki",
      dob: "03/03/2002",
      country: "Indonesia",
      img: a3,
    },
    {
      id: 8,
      name: "Siti Nurhaliza",
      dob: "14/07/2001",
      country: "Malaysia",
      img: a4,
    },
  ];

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
              onClick={() => navigate("/athelete")}
            >
             
              <div className="athListImgWrap">
                <img src={item.img} alt={item.name} />

              
                <div className="athBadge">
                  <FaMedal />
                </div>
              </div>

             
              <h3 className="athListName">{item.name}</h3>

              <p className="athListClub">JOHOR BAHRU CLUB</p>

            
              <div className="athListDivider"></div>

              
              <div className="athListInfo">
                <div className="infoRow">
                  <span>Birth Date</span>
                  <strong>{item.dob}</strong>
                </div>

                <div className="infoRow">
                  <span>Nationality</span>
                  <strong className="country">
                    <FaGlobe /> {item.country}
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
