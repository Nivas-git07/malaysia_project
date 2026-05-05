import Swimmer from "../../layout/swimmer";
import Footer from "../../layout/footer";
import { useParams } from "react-router-dom";
import NewsDetailX from "../../components/newscomponent/newsdetails";
import { NavLink } from "react-router-dom";
import { useCMSParams } from "../../../utils/cmsparam";
import { get_content } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";

export default function News() {
  const { stateId, clubId } = useParams();

  const basePath = stateId
    ? clubId
      ? `/state/${stateId}/club/${clubId}`
      : `/state/${stateId}`
    : "";

  const isClub = !!clubId;
  const isState = !!stateId && !clubId;
  const params = useCMSParams("media");
  const { data } = useQuery({
    queryKey: ["media-cms", params],
    queryFn: () => get_content(params),
  });

  console.log(data?.data);

  const news_descripition =
    data?.data.news_page_description ||
    "Discover the latest updates, stories, and highlights from across ournetwork. From major events to key announcements — stay informed and connected.";

  return (
    <>
      <Swimmer>
        <div className="homeHeroContents">
          <h1 className="homeHeroTitle">News</h1>
          <p className="homeHeroSub">
            {news_descripition.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
          {basePath && (
            <nav className="heroNav">
              <ul>
                {isState && (
                  <li>
                    <NavLink to={`/state/${stateId}`}>Home</NavLink>
                  </li>
                )}
                {isClub && (
                  <li>
                    <NavLink to={`/state/${stateId}/club/${clubId}`}>
                      Home
                    </NavLink>
                  </li>
                )}

                {isState && (
                  <li>
                    <NavLink to={`${basePath}/association`}>CLUBS</NavLink>
                  </li>
                )}

                {isClub && (
                  <li>
                    <NavLink to={`${basePath}/athlete`}>ATHLETES</NavLink>
                  </li>
                )}
                <li>
                  <NavLink to={basePath ? `${basePath}/event` : "/event"}>
                    EVENTS
                  </NavLink>
                </li>
                <li>
                  <NavLink to={basePath ? `${basePath}/news` : "/news"}>
                    NEWS
                  </NavLink>
                </li>
                <li>
                  <NavLink to={basePath ? `${basePath}/about` : "/about"}>
                    ABOUT
                  </NavLink>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </Swimmer>
      <NewsDetailX />

      <Footer />
    </>
  );
}
