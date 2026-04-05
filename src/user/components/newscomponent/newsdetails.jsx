import avatar from "../../assets/logo.jpg";
import new1 from "../../assets/event1.png";
import new2 from "../../assets/event2.png";
import new3 from "../../assets/event4.png";
import new4 from "../../assets/event3.png";
import new5 from "../../assets/event5.png";
import new6 from "../../assets/event6.png";
import { get_news } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";
import { get_particular_news } from "../../api/home_api";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function NewsDetailX() {
  const { stateId, clubId } = useParams();

  const {
    data: newsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["news", stateId, clubId],
    queryFn: () => {
      if (clubId) return get_particular_news({ clubId });
      if (stateId) return get_particular_news({ stateId });
      return get_news();
    },
  });

  const newsList = newsData?.data || [];

  if (isLoading) {
    return (
      <div className="emptyState">
        <p>Loading news...</p>
      </div>
    );
  }

  if (isError || newsList.length === 0) {
    return (
      <div className="emptyState">
        <div className="emptyIcon">📰</div>
        <h3>No News Found</h3>
        <p>No news articles are available at the moment.</p>
      </div>
    );
  }


  const firstNews = newsList[0];
  const remainingNews = newsList.slice(1);

  return (
    <section className="mfsaNewsDetailX-section">
      <div className="mfsaNewsDetailX-container">
        {/* 🔥 FIRST BIG NEWS */}
        <h1 className="mfsaNewsDetailX-title">{firstNews.title}</h1>

        <div className="mfsaNewsDetailX-hero">
          <img src={firstNews.image || new2} alt="news" />
        </div>

        <div className="mfsaNewsDetailX-main">
          <div className="mfsaNewsDetailX-content">
            <p className="mfsaNewsDetailX-intro">{firstNews.description}</p>

            {(firstNews.content || "")
              .split("\n")
              .filter((p) => p.trim() !== "")
              .map((para, i) => (
                <p key={i} className="mfsaNewsDetailX-text">
                  {para}
                </p>
              ))}

            <div className="mfsaNewsDetailX-gallery">
              <img src={new1} />
              <img src={new6} />
              <img src={new3} />
            </div>

            {remainingNews.map((item) => (
              <div key={item.id} className="newsCardFull">
                <h2 className="mfsaNewsDetailX-heading">{item.title}</h2>

                <div className="mfsaNewsDetailX-hero">
                  <img src={item.image || new2} alt="news" />
                </div>

                <p className="mfsaNewsDetailX-text">{item.description}</p>

                <p className="mfsaNewsDetailX-text">
                  {(item.content || "").replace(/\n/g, " ").trim()}
                </p>

                <hr className="newsDivider" />
              </div>
            ))}

            <div className="mfsaLoadMoreWrapX">
              <button className="mfsaLoadMoreBtnX">Load More News →</button>
            </div>
          </div>

          {/* RIGHT SIDE (UNCHANGED) */}
          <div className="mfsaNewsSidebarX">
            <div className="mfsaSidebarBlockX">
              <h5 className="mfsaSidebarTitleX">Related News</h5>

              {newsList.slice(1, 3).map((item) => (
                <div className="mfsaSidebarItemX" key={item.id}>
                  <img src={item.image || new5} alt="" />
                  <span className="tag">News</span>
                  <p>{item.title}</p>
                </div>
              ))}
            </div>

            <div className="mfsaSidebarMostX">
              <h5>Most Read</h5>

              {newsList.slice(0, 3).map((item, i) => (
                <div className="mfsaMostItemX" key={item.id}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p>{item.title}</p>
                    <small>Trending</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="mfsaSidebarSubscribeX">
              <h4>Stay Elite.</h4>
              <p>Get the latest technical analysis and competition updates.</p>

              <input placeholder="Your email address" />
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
