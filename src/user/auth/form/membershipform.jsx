import { useState } from "react";
import img from "../../assets/event3.png";
import { FaCheckCircle } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
export default function MembershipX() {
  const [plan, setPlan] = useState("yearly");

  const plans = [
    {
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
          {/* HEADER */}
          <div className="mfsaMembershipX-header">
            <span className="tag">Membership Programs</span>
            <h1>Choose Your Membership</h1>
            <p>
              Select the plan that fits your journey within the world of elite
              finswimming.
            </p>
          </div>

          {/* TOGGLE */}
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

          {/* CARDS */}
          <div className="mfsaMembershipGridX">
            {plans.map((item, i) => (
              <div
                className={`mfsaMembershipCardX ${item.popular ? "popular" : ""}`}
                key={i}
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

                <button>Select Plan</button>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <p className="helpText">
            Need help choosing? <span>Contact your association</span>
          </p>
        </div>
      </section>

      <section className="mfsaWhyX-section">
        <div className="mfsaWhyX-container">
          {/* LEFT IMAGE */}
          <div className="mfsaWhyX-left">
            <img src={img} alt="swimmer" />

            {/* TESTIMONIAL */}
            <div className="mfsaWhyX-quote">
              <p>
                “The federation has provided me with the global platform to
                transition from a local swimmer to a world-ranked athlete.”
              </p>

              <h5>MARCELLO VIANNI</h5>
              <span>European Gold Medalist</span>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="mfsaWhyX-right">
            <h2>Why Join the World Federation?</h2>

            <p className="desc">
              Membership in the International Finswimming Federation is more
              than a credential— it’s an entry into an elite ecosystem of
              performance, science, and global competition.
            </p>

            {/* STATS */}
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

            {/* FEATURES */}
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

            {/* BUTTON */}
            <button className="mfsaWhyX-btn">Explore Membership</button>
          </div>
        </div>
      </section>
    </>
  );
}
