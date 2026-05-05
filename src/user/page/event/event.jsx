import EventsPage from "../../components/eventcomponent/allevent";
import Footer from "../../layout/footer";
import Swimmer from "../../layout/swimmer";
import { NavLink, useParams } from "react-router-dom";
import { useCMSParams } from "../../../utils/cmsparam";
import { get_content } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";

export default function Event() {
  const { stateId, clubId } = useParams();

  const isClub = !!clubId;
  const isState = !!stateId && !clubId;

  /* =========================
     BASE PATH
  ========================= */
  const basePath = stateId
    ? clubId
      ? `/state/${stateId}/club/${clubId}`
      : `/state/${stateId}`
    : "";

  /* =========================
     CMS PARAMS (MEDIA PAGE)
  ========================= */
  const params = useCMSParams("media");

  const { data } = useQuery({
    queryKey: ["media-cms", params],
    queryFn: () => get_content(params),
  });

  const cms = data?.data;

  /* =========================
     FALLBACK DATA
  ========================= */
  const headline = cms?.event_headline;

  const description =
    cms?.event_page_description ||
    "Stay updated with our upcoming events, competitions, and activities.\nJoin us and be part of exciting moments across our sports community.";

  return (
    <div>
      <Swimmer>
        <div className="homeHeroContents">
          <h1 className="homeHeroTitle">Event</h1>

          <p className="homeHeroSub">
            {description.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        </div>

        {/* NAVIGATION */}
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
      </Swimmer>

      {/* EVENTS LIST */}
      <EventsPage content={headline} />

      <Footer />
    </div>
  );
}
