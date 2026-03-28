import NewsCard from "./newscard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import n1 from "../../assets/news1.jpg";
import n2 from "../../assets/news2.jpg";

export default function HomeNews(){
  const navigate = useNavigate();

  const newsData = [
    { img:n1, title:"Finswimming Malaysia Association Club" },
    { img:n2, title:"Finswimming Malaysia Association Club" },
    { img:n1, title:"Finswimming Malaysia Association Club" },
    { img:n2, title:"Finswimming Malaysia Association Club" },
  ];

  return(

    <section className="homeNewsSection">

     
      <div className="homeNewsHeader">

        <h2 className="homeNewsTitle">NEWS</h2>

        <div className="homeNewsArrows">
          <span className="readmore" onClick={()=>{
            navigate("/user/news")
          }}>Read More</span>
      
        </div>

      </div>

      
      <div className="homeNewsGrid">
        {newsData.map((item,index)=>(
          <NewsCard key={index} {...item}/>
        ))}
      </div>

    </section>
  )
}
