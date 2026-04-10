import { FaCheckCircle } from "react-icons/fa";

export default function MembershipStep({ plan ,amount}) {
  return (
    <section className="mfsaCompleteSection">
      <div className="mfsaContainer">
        <h1 className="mfsaTitle">Complete Your Membership</h1>
        <p className="mfsaSub">
          Submit your payment details to activate your membership
        </p>

        <div className="mfsaSteps">
          <div className="step active">
            <FaCheckCircle />
            <span>STEP 1: CHOOSE PLAN</span>
          </div>

          <div className="stepLine"></div>

          <div className="step">
            <div className="circle">2</div>
            <span>STEP 2: SUBMIT DETAILS</span>
          </div>
        </div>

        <div className="mfsaPlanCard">
          <div className="planLeft">
            <span className="planTag">SELECTED PLAN</span>

            <h3>{plan.title}</h3>

            <div className="planFeatures">
              <span>🏅 Global Rankings Entry</span>
              <span>🏆 Championship Discounts</span>
            </div>
          </div>

          <div className="planPrice">
            {amount}
            <span>{plan?.monthly === amount ? "per month" : "per year"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
