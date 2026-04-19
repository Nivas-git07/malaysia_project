import { useState } from "react";
import img from "../../assets/event3.png";
import { FaCheckCircle } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";

export default function MembershipX({ onSubmit }) {
  const [selected, setSelected] = useState(null);


  const plans = [
    {
      Membership_id: 101,
      title: "INDIVIDUAL_MEMBER",
      price: 50,
      features: [
        "Access to local competitions",
        "Basic ranking visibility",
        "Digital membership ID",
      ],
    },
    {
      Membership_id: 102,
      title: "ALLIED_MEMBER",
      price: 100,
      popular: true,
      features: [
        "Access to allied events",
        "Networking with clubs & members",
        "Participation in workshops",
      ],
    },
    {
      Membership_id: 103,
      title: "Coach",
      price: 150,
      features: [
        "Official coach certification",
        "Access to training programs",
        "Eligibility to train athletes",
      ],
    },
    {
      Membership_id: 104,
      title: "Technical Official",
      price: 120,
      features: [
        "Eligibility to officiate events",
        "Technical training access",
        "Certification recognition",
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
              Select the plan that fits your journey.
            </p>
          </div>


          <div className="mfsaMembershipGridX">
            {plans.map((item) => (
              <div
                className={`mfsaMembershipCardX ${
                  item.popular ? "popular" : ""
                }`}
                key={item.Membership_id}
              >
                {item.popular && (
                  <span className="popularTag">Most Popular</span>
                )}

                <h3>{item.title.replaceAll("_", " ")}</h3>

                {/* ✅ FIXED PRICE */}
                <div className="price">
                  {item.price} <span>/ year</span>
                </div>

                <ul>
                  {item.features.map((f, idx) => (
                    <li key={idx}>
                      <FaCheckCircle /> {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    setSelected(item.Membership_id);

                   
                    onSubmit({
                      name: item.title,
                      price: item.price,
                    });
                  }}
                  className={
                    selected === item.Membership_id ? "activeBtn" : ""
                  }
                >
                  {selected === item.Membership_id
                    ? "Selected"
                    : "Select Plan"}
                </button>
              </div>
            ))}
          </div>

          <p className="helpText">
            Need help choosing? <span>Contact your association</span>
          </p>
        </div>
      </section>

      {/* WHY SECTION (UNCHANGED) */}
      <section className="mfsaWhyX-section">
        <div className="mfsaWhyX-container">
          <div className="mfsaWhyX-left">
            <img src={img} alt="swimmer" />

            <div className="mfsaWhyX-quote">
              <p>
                “The federation has provided me with the global platform...”
              </p>

              <h5>MARCELLO VIANNI</h5>
              <span>European Gold Medalist</span>
            </div>
          </div>

          <div className="mfsaWhyX-right">
            <h2>Why Join the World Federation?</h2>

            <p className="desc">
              Membership is an entry into elite competition.
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
                <span>Access to training facilities.</span>
              </li>

              <li>
                <BiWorld className="mfsaWhyX-icon" />
                <span>Entry to global championships.</span>
              </li>
            </ul>

            <button className="mfsaWhyX-btn">
              Explore Membership
            </button>
          </div>
        </div>
      </section>
    </>
  );
}