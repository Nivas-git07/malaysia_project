import { useState } from "react";
import img from "../../assets/event3.png";
import { FaCheckCircle } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
export default function MembershipX({ onSubmit }) {
  const [plan, setPlan] = useState("yearly");
  const [selected, setSelected] = useState(null);
  const plans = [
    {
      Membership_id: 101,
      title: "Athlete Basic",
      monthly: 5,
      yearly: 49,
      features: [
        "Standard competition license",
        "Regional rankings access",
        "Digital athlete passport",
      ],
    },
    {
      Membership_id: 102,
      title: "Athlete Elite",
      monthly: 12,
      yearly: 129,
      popular: true,
      features: [
        "Priority meet registration",
        "National rankings profile",
        "Pro gear discounts (20%)",
        "Training workshop access",
      ],
    },
    {
      Membership_id: 103,
      title: "Coach / Official",
      monthly: 8,
      yearly: 89,
      features: [
        "Technical certification",
        "Official scoring access",
        "Federation voting rights",
      ],
    },
    {
      Membership_id: 104,
      title: "Affiliated Club",
      monthly: 40,
      yearly: 450,
      features: [
        "Club listing on federation",
        "Hosting rights for meets",
        "Bulk athlete insurance",
        "Brand kit & resources",
      ],
    },
  ];

  return (
    <>
      <section className="mfsaMembershipX-section">
        <div className="mfsaMembershipX-container">
      
          <div className="mfsaMembershipX-header">
            <span className="tag">Membership Programs</span>
            <h1>Choose Your Membership</h1>
            <p>
              Select the plan that fits your journey within the world of elite
              finswimming.
            </p>
          </div>

          <div className="mfsaToggleX">
            <span className={plan === "monthly" ? "active" : ""}>Monthly</span>

            <div
              className={`toggleSwitch ${plan}`}
              onClick={() => setPlan(plan === "monthly" ? "yearly" : "monthly")}
            />

            <span className={plan === "yearly" ? "active" : ""}>
              Yearly <small>-15%</small>
            </span>
          </div>

          <div className="mfsaMembershipGridX">
            {plans.map((item, i) => (
              <div
                className={`mfsaMembershipCardX ${item.popular ? "popular" : ""}`}
                key={item.Membership_id}
              >
                {item.popular && (
                  <span className="popularTag">Most Popular</span>
                )}

                <h3>{item.title}</h3>

                <div className="price">
                  ${plan === "monthly" ? item.monthly : item.yearly}
                  <span> / {plan === "monthly" ? "month" : "year"}</span>
                </div>

                <ul>
                  {item.features.map((f, idx) => (
                    <li key={idx}>⭐ {f}</li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    setSelected(item.Membership_id);
                    onSubmit(item, plan);
                  }}
                  className={selected === item.Membership_id ? "activeBtn" : ""}
                  style={{ cursor: "pointer" }}

                >
                  {selected === item.Membership_id ? "Selected" : "Select Plan"}
                </button>
              </div>
            ))}
          </div>

          <p className="helpText">
            Need help choosing? <span>Contact your association</span>
          </p>
        </div>
      </section>

      <section className="mfsaWhyX-section">
        <div className="mfsaWhyX-container">
          <div className="mfsaWhyX-left">
            <img src={img} alt="swimmer" />

            <div className="mfsaWhyX-quote">
              <p>
                “The federation has provided me with the global platform to
                transition from a local swimmer to a world-ranked athlete.”
              </p>

              <h5>MARCELLO VIANNI</h5>
              <span>European Gold Medalist</span>
            </div>
          </div>

          <div className="mfsaWhyX-right">
            <h2>Why Join the World Federation?</h2>

            <p className="desc">
              Membership in the International Finswimming Federation is more
              than a credential— it’s an entry into an elite ecosystem of
              performance, science, and global competition.
            </p>

            <div className="mfsaWhyX-stats">
              <div>
                <h3>120+</h3>
                <span>Sanctioned Meets</span>
              </div>

              <div>
                <h3>15k</h3>
                <span>Global Athletes</span>
              </div>
            </div>

            <ul className="mfsaWhyX-list">
              <li>
                <FaCheckCircle className="mfsaWhyX-icon" />
                <span>
                  Access to Olympic-standard training facilities and biological
                  passports.
                </span>
              </li>

              <li>
                <BiWorld className="mfsaWhyX-icon" />
                <span>
                  Automatic entry eligibility for Continental and World
                  Championships.
                </span>
              </li>
            </ul>

            <button className="mfsaWhyX-btn">Explore Membership</button>
          </div>
        </div>
      </section>
    </>
  );
}
