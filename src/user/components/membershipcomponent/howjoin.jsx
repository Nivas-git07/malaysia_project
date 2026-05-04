import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function HowJoinMFSA() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  const [activeStep, setActiveStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState("default");

  // ✅ ALL PLANS (YOUR + NEW)
  const plans = {
    default: [
      {
        title: "Register Account",
        desc: "Create your online profile on our secure portal with basic personal details.",
      },
      {
        title: "Complete Club Details",
        desc: "Provide information about your local finswimming club or register as an independent.",
      },
      {
        title: "Choose Membership Plan",
        desc: "Select from Athlete, Coach, Technical Official, or Associate memberships.",
      },
      {
        title: "Get Approved",
        desc: "Receive your digital membership card once your application is reviewed and verified.",
      },
    ],

    athlete: [
      {
        title: "Register Account",
        desc: "Create your athlete profile with personal and competition details.",
      },
      {
        title: "Upload Documents",
        desc: "Submit ID proof, medical certificate, and eligibility documents.",
      },
      {
        title: "Choose Discipline",
        desc: "Select finswimming category and competition preferences.",
      },
      {
        title: "Get Approved",
        desc: "Receive confirmation and start participating in events.",
      },
    ],

    coach: [
      {
        title: "Register Profile",
        desc: "Create your coaching account with experience details.",
      },
      {
        title: "Submit Certification",
        desc: "Upload coaching certifications and qualifications.",
      },
      {
        title: "Verify Experience",
        desc: "Provide proof of coaching history and achievements.",
      },
      {
        title: "Get Approved",
        desc: "Get verified as an official MFSA coach.",
      },
    ],

    club: [
      {
        title: "Register Club",
        desc: "Create your club profile with official details.",
      },
      {
        title: "Add Officials",
        desc: "Register club staff and coaches.",
      },
      {
        title: "Submit Documents",
        desc: "Upload registration certificates and approvals.",
      },
      {
        title: "Get Approved",
        desc: "Get your club officially recognized.",
      },
    ],

    state: [
      {
        title: "Apply for License",
        desc: "Submit application as a regional governing body.",
      },
      {
        title: "Submit Details",
        desc: "Provide governance and operational structure.",
      },
      {
        title: "Verification",
        desc: "Review by national authority.",
      },
      {
        title: "Get Approved",
        desc: "Become an official state association.",
      },
    ],
  };

  const steps = plans[selectedPlan];

  // ✅ ANIMATION
  useEffect(() => {
    setActiveStep(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let i = 0;

          const interval = setInterval(() => {
            setActiveStep((prev) => {
              if (prev >= steps.length) {
                clearInterval(interval);
                return prev;
              }
              return prev + 1;
            });
            i++;
          }, 350);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [selectedPlan]);

  return (
    <>
      <section className="mfsaStepsSection" ref={sectionRef}>
        <div className="mfsaContainer">

          {/* TITLE */}
          <h2 className="mfsaStepsTitle">How to Become a Member</h2>
          <div className="mfsaStepsUnderline"></div>

          {/* ✅ PLAN BUTTONS (FIXED UI) */}
          <div className="mfsaPlanWrapper">
            {["default", "athlete", "coach", "club", "state"].map((plan) => (
              <button
                key={plan}
                className={`mfsaPlanBtn ${
                  selectedPlan === plan ? "active" : ""
                }`}
                onClick={() => setSelectedPlan(plan)}
              >
                {plan.charAt(0).toUpperCase() + plan.slice(1)}
              </button>
            ))}
          </div>

          {/* LINE */}
          <div className="mfsaStepsLine">
            <div
              className="mfsaStepsLineFill"
              style={{
                width: `${(activeStep - 1) * (100 / (steps.length - 1))}%`,
              }}
            ></div>
          </div>

          {/* STEPS */}
          <div className="mfsaStepsGrid">
            {steps.map((step, i) => (
              <div className="mfsaStepCard" key={i}>
                <div
                  className={`mfsaStepCircle ${
                    activeStep > i ? "active" : ""
                  }`}
                >
                  {i + 1}
                </div>

                <h3 className="mfsaStepHeading">{step.title}</h3>
                <p className="mfsaStepText">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mfsaCtaSection">
        <div className="mfsaContainer">
          <h2 className="mfsaCtaTitle">
            Ready to join Malaysia’s elite finswimming community?
          </h2>

          <div className="mfsaCtaButtons">
            <button
              className="mfsaBtnPrimary"
              onClick={() => navigate("/register")}
            >
              Register Now
            </button>

            <button
              className="mfsaBtnOutline"
              onClick={() => navigate("/contact")}
            >
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </>
  );
}