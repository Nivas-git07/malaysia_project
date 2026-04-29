import { useState } from "react";
import { FaCheckCircle, FaCrown, FaUserSlash } from "react-icons/fa";
import {
  FaTrophy,
  FaCalendarCheck,
  FaShieldAlt,
  FaGraduationCap,
} from "react-icons/fa";
import AthleteNavbar from "../../layout/athletenavbar";
import { useNavigate } from "react-router-dom";
function AthleteMembersipPurchaseCenter({ role }) {
  const membershipPlans = [
    {
      name: "INDIVIDUAL_MEMBER",
      price: "RM 50",
      duration: "/ year",
      benefits: [
        "Access to local competitions",
        "Basic ranking visibility",
        "Digital membership ID",
      ],
    },
    {
      name: "ALLIED_MEMBER",
      price: "RM 100",
      duration: "/ year",
      benefits: [
        "Access to allied events",
        "Networking with clubs & members",
        "Participation in workshops",
      ],
    },
    {
      name: "Coach",
      price: "RM 150",
      duration: "/ year",
      benefits: [
        "Official coach certification",
        "Access to training programs",
        "Eligibility to train athletes",
      ],
    },
    {
      name: "Technical Official",
      price: "RM 120",
      duration: "/ year",
      benefits: [
        "Eligibility to officiate events",
        "Technical training access",
        "Certification recognition",
      ],
    },
  ];

  const currentPlan = role;

  const navigate = useNavigate();

  // ✅ Slider logic
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(membershipPlans.length / itemsPerPage);

  const visiblePlans = membershipPlans.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  );

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < membershipPlans.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const goToPage = (pageIndex) => {
    setCurrentIndex(pageIndex * itemsPerPage);
  };

  return (
    <>
      <AthleteNavbar />

      <div className="mu-membership-wrapper">
        {/* Header */}
        <div className="mp-header">
          <h1>Membership</h1>
          <p>Join the federation to unlock full access and benefits</p>
        </div>

        {/* Not Member */}
        <div className="mp-empty-card">
          <div className="mp-empty-icon-wrap">
            <FaUserSlash className="mp-empty-icon" />
          </div>

          <h2 className="mp-empty-title">You are not currently a member</h2>

          <p className="mp-empty-text">
            Purchase a membership to access competitions, rankings, and
            exclusive benefits.
          </p>

          <button className="mp-primary-btn">Browse Membership Plans</button>
        </div>

        {/* 🔥 SLIDER SECTION */}
        <div className="mp-slider-wrapper">
          {/* Prev Button */}
          {/* <button className="mp-nav-btn" onClick={prevSlide}>
            ⬅
          </button> */}

          {/* Plans */}
          <div className="mp-plans">
            {visiblePlans.map((plan, index) => (
              <div
                className={`mp-card ${
                  currentIndex + index === 1 ? "mp-popular" : ""
                }`}
                key={index}
              >
                {currentIndex + index === 1 && (
                  <div className="mp-badge">MOST POPULAR</div>
                )}

                <h3>
                  {plan.name.replaceAll("_", " ")}{" "}
                  {currentIndex + index === 1 && (
                    <FaCrown className="mp-crown" />
                  )}
                </h3>

                <h2 className="mp-price">
                  {plan.price} <span>{plan.duration}</span>
                </h2>

                <ul>
                  {plan.benefits.map((b, i) => (
                    <li key={i}>
                      <FaCheckCircle className="mp-check" /> {b}
                    </li>
                  ))}
                </ul>

                <button
                  className={`mp-select-btn ${
                    currentPlan && currentPlan !== plan.name ? "disabled" : ""
                  }`}
                  disabled={currentPlan && currentPlan !== plan.name}
                  onClick={() => {
                    if (!currentPlan || currentPlan === plan.name) {
                      navigate(`/athlete/membership/status/payment/${plan.name}`);
                    }
                  }}
                >
                  {currentPlan === plan.name
                    ? "Your Plan"
                    : currentPlan
                      ? "Not Available"
                      : "Select Plan"}
                </button>
              </div>
            ))}
          </div>

          {/* Next Button */}
          {/* <button className="mp-nav-btn" onClick={nextSlide}>
            ➡
          </button> */}
        </div>

        {/* 🔥 DOTS */}
        <div className="mp-dots">
          {Array.from({ length: totalPages }).map((_, i) => (
            <span
              key={i}
              className={`mp-dot ${
                currentIndex / itemsPerPage === i ? "active" : ""
              }`}
              onClick={() => goToPage(i)}
            ></span>
          ))}
        </div>

        {/* Why Become Member */}
        <div className="mb-wrapper">
          <div className="mb-wrapper">
            <div className="mb-top">
              <h2>Why Become a Member?</h2>

              <div className="mb-grid">
                <div className="mb-item">
                  <FaTrophy />
                  <h3>Official Rankings</h3>
                  <p>
                    Track your progress and compete for the top national spots.
                  </p>
                </div>

                <div className="mb-item">
                  <FaCalendarCheck />
                  <h3>Event Access</h3>
                  <p>Priority registration for finswimming championships.</p>
                </div>

                <div className="mb-item">
                  <FaShieldAlt />
                  <h3>Insurance Coverage</h3>
                  <p>Coverage for training sessions and competitions.</p>
                </div>

                <div className="mb-item">
                  <FaGraduationCap />
                  <h3>Masterclasses</h3>
                  <p>Technical clinics led by international experts.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-guidelines">
            <h3>Membership Guidelines</h3>

            <div className="mb-guidelines-grid">
              <ul>
                <li>Memberships are valid for one calendar year.</li>
                <li>Compliance with Code of Conduct is mandatory.</li>
              </ul>

              <ul>
                <li>All fees are non-refundable.</li>
                <li>Certifications required for advanced roles.</li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="mb-cta">
            <h2>Start your finswimming journey today</h2>
            <p>
              Be part of Malaysia’s fastest growing underwater sports community.
            </p>
            <button>Get Membership</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AthleteMembersipPurchaseCenter;

{
  /* Guidelines */
}
