import img from "../../assets/event3.png";
import {
  FaMedal,
  FaUserCheck,
  FaChalkboardTeacher,
  FaUsers,
} from "react-icons/fa";

export default function WhyJoinMFSA({ data }) {
  /* =========================
     DEFAULT FALLBACK DATA
  ========================= */
  const defaultItems = [
    {
      title: "Access to national competitions",
      desc: "Participate in sanctioned events and climb the national leaderboards.",
      icon: <FaMedal />,
    },
    {
      title: "Official athlete recognition",
      desc: "Get verified membership cards and official ranking in the national database.",
      icon: <FaUserCheck />,
    },
    {
      title: "Training & development programs",
      desc: "Exclusive workshops with top-tier coaches and international experts.",
      icon: <FaChalkboardTeacher />,
    },
    {
      title: "Community & networking",
      desc: "Connect with fellow athletes, coaches, and enthusiasts across Malaysia.",
      icon: <FaUsers />,
    },
  ];

  /* =========================
     BACKEND DATA → MAP
  ========================= */
  const backendItems = [
    {
      title: data?.why_join_h4_1,
      desc: data?.why_join_p_1,
      icon: <FaMedal />,
    },
    {
      title: data?.why_join_h4_2,
      desc: data?.why_join_p_2,
      icon: <FaUserCheck />,
    },
    {
      title: data?.why_join_h4_3,
      desc: data?.why_join_p_3,
      icon: <FaChalkboardTeacher />,
    },
    {
      title: data?.why_join_h4_4,
      desc: data?.why_join_p_4,
      icon: <FaUsers />,
    },
  ].filter((item) => item.title && item.title.trim() !== "");

  /* =========================
     FINAL DATA (SMART SWITCH)
  ========================= */
  const items = backendItems.length > 0 ? backendItems : defaultItems;

  return (
    <section className="mfsaWhyJoin-section">
      <div className="mfsaWhyJoin-container">

        {/* LEFT */}
        <div className="mfsaWhyJoin-left">
          <img src={img} alt="mfsa" />

          <div className="mfsaWhyJoin-badge">
            <FaMedal className="icon" />
            <div>
              <p>National Federation</p>
              <span>Official Governing Body</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="mfsaWhyJoin-right">
          <h2>Why Join MFSA?</h2>

          <div className="mfsaWhyJoin-list">
            {items.map((item, index) => (
              <div className="item" key={index}>
                <div className="iconBox">{item.icon}</div>

                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}