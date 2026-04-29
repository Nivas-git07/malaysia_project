import React from "react";
import { FaTrophy } from "react-icons/fa";
import { FaSwimmer } from "react-icons/fa";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import swimmer from "../assets/swimmer.png";

const MembershipSection = () => {
  return (
    <section className="mu-membership-wrapper">

      <div className="mu-membership-title">
        ATHLETE
      </div>

      <div className="mu-membership-row">

        {/* LEFT CARD */}

        <div className="mu-athlete-card">

          <div className="mu-athlete-banner"></div>

          <div className="mu-athlete-content">

            <img
              src={swimmer}
              alt="athlete"
              className="mu-athlete-avatar"
            />

            <div className="mu-athlete-info">

              <div className="mu-athlete-name">
                PETER JOHN
              </div>

              <div className="mu-athlete-medals">
                <FaTrophy className="mu-icon-red" />
                <span>12 Medals</span>
              </div>

              <div className="mu-athlete-sport">
                Fin Swimmer
              </div>

            </div>

            <div className="mu-swim-icon">
              <FaSwimmer />
            </div>

          </div>

        </div>

        {/* RIGHT CARD */}

        <div className="mu-membership-card">

          <div className="mu-membership-header">

            <div className="mu-membership-heading">
              Membership
              <HiOutlineQuestionMarkCircle className="mu-help-icon"/>
            </div>

            <button className="mu-renew-btn">
              Renew
            </button>

          </div>

          <div className="mu-membership-body">

            <div className="mu-plan-section">
              <label>Plan Name</label>
              <p>Gold</p>
            </div>

            <div className="mu-date-row">

              <div>
                <label>Start Date</label>
                <p>26 / 06 / 2010</p>
              </div>

              <div className="mu-divider"></div>

              <div>
                <label>End Date</label>
                <p>26 / 06 / 2020</p>
              </div>

            </div>

            <div className="mu-membership-code">
              C10000
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default MembershipSection;