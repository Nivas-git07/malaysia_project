import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function HowJoinMFSA({ data }) {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  const [activeStep, setActiveStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState("state");

  /* =========================
     HELPER (fallback)
  ========================= */
  const getValue = (val, fallback) => {
    return val && val.trim() !== "" ? val : fallback;
  };

  /* =========================
     DEFAULT BASE STEPS
  ========================= */
  const defaultSteps = [
    {
      title: "Register Account",
      desc: "Create your online profile with basic personal details.",
    },
    {
      title: "Submit Details",
      desc: "Provide necessary documents and information.",
    },
    {
      title: "Verification",
      desc: "Your application will be reviewed.",
    },
    {
      title: "Get Approved",
      desc: "Receive confirmation and start your journey.",
    },
  ];

  /* =========================
     BUILD PLAN FROM BACKEND
  ========================= */
  const buildPlan = (planIndex) => {
    return defaultSteps.map((step, i) => ({
      title: getValue(
        data?.[`plan_${planIndex}_h3_${i + 1}`],
        step.title
      ),
      desc: getValue(
        data?.[`plan_${planIndex}_p_${i + 1}`],
        step.desc
      ),
    }));
  };

  /* =========================
     PLAN MAPPING
  ========================= */
  const plans = {
    state: buildPlan(1),
    club: buildPlan(2),
    Athlete: buildPlan(3),
    coach: buildPlan(4),
  };

  const steps = plans[selectedPlan];

  /* =========================
     ANIMATION
  ========================= */
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

          {/* PLAN BUTTONS */}
          <div className="mfsaPlanWrapper">
            {["state", "club", "Athlete", "coach"].map((plan) => (
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