import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import a1 from "../../assets/image.png";
import { useNavigate } from "react-router-dom";

export default function AthleteGrid() {
    const navigate = useNavigate();
    const athletes = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: "Cameron Williamson",
        dob: "09/05/2000",
        country: "Sweden",
        img: a1
    }));

   
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8; 
    const totalPages = Math.ceil(athletes.length / itemsPerPage);

    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAthletes = athletes.slice(
        startIndex,
        startIndex + itemsPerPage
    );


    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <section className="athListSection">

            <div className="athListContainer">

            
                <div className="athListGrid">

                    {currentAthletes.map(item => (
                        <div className="athListCard" key={item.id} onClick={()=>{
                            navigate("/athelete")
                        }}>

                            <div className="athListTop" />

                            <div className="athListImgWrap">
                                <img src={item.img} alt={item.name} />
                            </div>

                            <h3 className="athListName">{item.name}</h3>

                            <div className="athListDivider" />

                            <div className="athListInfo">
                                <div>
                                    <p className="athListLabel">Date Of Birth</p>
                                    <p className="athListValue">{item.dob}</p>
                                </div>

                                <div>
                                    <p className="athListLabel">Country</p>
                                    <p className="athListValue">{item.country}</p>
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

                        {[1, 2, 3, 4].map(num => (
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
