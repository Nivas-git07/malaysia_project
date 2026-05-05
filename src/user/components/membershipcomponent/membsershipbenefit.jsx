import {
  FaTrophy,
  FaCertificate,
  FaHeadset,
  FaChartLine,
  FaCalendarAlt,
  FaChartBar
} from "react-icons/fa";

export default function MembershipBenefits({ data }) {

  /* =========================
     DEFAULT BENEFITS (6)
  ========================= */
  const defaultBenefits = [
    {
      icon: <FaTrophy />,
      title: "Competition Access",
      desc: "Priority registration and discounted entry fees for all MFSA sanctioned state and national championships."
    },
    {
      icon: <FaCertificate />,
      title: "Certification",
      desc: "Earn officially recognized certifications for coaching, officiating, and athlete skill milestones."
    },
    {
      icon: <FaHeadset />,
      title: "Coaching Support",
      desc: "Access to technical guidelines, nutritional advice, and specialized finswimming training manuals."
    },
    {
      icon: <FaChartLine />,
      title: "Athlete Development",
      desc: "Potential selection for national development squads and international training camps."
    },
    {
      icon: <FaCalendarAlt />,
      title: "Event Participation",
      desc: "Exclusive invites to clinics, sports science seminars, and association social gatherings."
    },
    {
      icon: <FaChartBar />,
      title: "National Ranking",
      desc: "Eligibility for inclusion in the official Malaysia Finswimming Ranking system and records list."
    }
  ];

  /* =========================
     MERGE BACKEND + DEFAULT
  ========================= */
  const benefits = defaultBenefits.map((item, index) => {
    const backendTitle = data?.[`benefits_${index + 1}_h3`];
    const backendDesc = data?.[`benefits_${index + 1}_p`];

    return {
      icon: item.icon,
      title: backendTitle && backendTitle.trim() !== "" ? backendTitle : item.title,
      desc: backendDesc && backendDesc.trim() !== "" ? backendDesc : item.desc,
    };
  });

  return (
    <section className="mfsaBenefits-section">

      <div className="mfsaBenefits-container">

        {/* TITLE */}
        <div className="mfsaBenefits-header">
          <h2>Membership Benefits</h2>
          <span className="underline"></span>
        </div>

        {/* GRID */}
        <div className="mfsaBenefits-grid">

          {benefits.map((item, i) => (
            <div className="mfsaBenefits-card" key={i}>

              <div className="iconBox">
                {item.icon}
              </div>

              <h3>{item.title}</h3>
              <p>{item.desc}</p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}