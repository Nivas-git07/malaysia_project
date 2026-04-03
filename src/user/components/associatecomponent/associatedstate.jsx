import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { get_state } from "../../api/auth";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
export default function StateAssociationX({ data, type }) {
  // const navigate = useNavigate();
  // const { data: stateData } = useQuery({
  //   queryKey: ["states"],
  //   queryFn: get_state,
  //   refetchOnWindowFocus: false,
  //   retry: false,
  // });

  // const states = stateData?.data || [];

  // const states = [
  //   { name: "Johor Bahru", clubs: 10, athletes: 120 },
  //   { name: "Kuala Lumpur", clubs: 8, athletes: 95 },
  //   { name: "Penang", clubs: 6, athletes: 70 },
  //   { name: "Selangor", clubs: 12, athletes: 150 },
  //   { name: "Melaka", clubs: 4, athletes: 45 },
  //   { name: "Perak", clubs: 5, athletes: 60 },
  //   { name: "Kedah", clubs: 3, athletes: 35 },
  //   { name: "Pahang", clubs: 4, athletes: 50 },
  // ];
  console.log("State Data:", data, type);
  const { stateName, stateId } = useParams();
  const navigate = useNavigate();

  return (
    <section className="mfsaStateCardX-section">
      <div className="mfsaStateCardX-container">
        <div className="mfsaStateCardX-header">
          <h2>Regional Partners</h2>
          <p>Browse our verified state associations and their local clubs.</p>
        </div>

        <div className="mfsaStateCardX-grid">
          {data.map((item, i) => {
            const assocdata = {
              name: item.state_name || item.club_name || "Unknown",
              clubs: item.clubs_count || 0,
              athletes: item.athletes_count || 0,
              user: item.user 
            };

            return (
              <div className="mfsaStateCardX-card" key={item.user || i}>
                <div className="mfsaStateCardX-logoOuter">
                  <div className="mfsaStateCardX-logoInner">
                    <img src={logo} alt="state" />
                  </div>
                </div>

                <h3 className="mfsaStateCardX-name">{assocdata.name}</h3>

                <p className="mfsaStateCardX-meta">
                  {assocdata.clubs} clubs • {assocdata.athletes} Athletes
                </p>

                {type === "state" ? (
                  <button
                    className="mfsaStateCardX-btn"
                    onClick={() => {
                      navigate(`/user/state/${assocdata.user}`);
                    }}
                  >
                    VIEW State →
                  </button>
                ) : (
                  <button
                    className="mfsaStateCardX-btn"
                    onClick={() => {
                      navigate(`/user/state/${stateId}/club/${assocdata.user}`);
                    }}
                  >
                    VIEW Club →
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
