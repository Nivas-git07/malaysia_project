import { useEffect, useRef, useState } from "react";

export function HowJoinMFSA() {

  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let i = 0;

          const interval = setInterval(() => {
            setActiveStep((prev) => {
              if (prev >= 4) {
                clearInterval(interval);
                return prev;
              }
              return prev + 1;
            });
            i++;
          }, 400);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="mfsaStepsSection" ref={sectionRef}>
        <div className="mfsaContainer">

          <h2 className="mfsaStepsTitle">How to Become a Member</h2>
          <div className="mfsaStepsUnderline"></div>

         
          <div className="mfsaStepsLine">
            <div
              className="mfsaStepsLineFill"
              style={{ width: `${(activeStep - 1) * 33.3}%` }}
            ></div>
          </div>

          <div className="mfsaStepsGrid">

            {[1,2,3,4].map((num, i) => (
              <div className="mfsaStepCard" key={i}>

                <div className={`mfsaStepCircle ${activeStep > i ? "active" : ""}`}>
                  {num}
                </div>

                <h3 className="mfsaStepHeading">
                  {[
                    "Register Account",
                    "Complete Club Details",
                    "Choose Membership Plan",
                    "Get Approved"
                  ][i]}
                </h3>

                <p className="mfsaStepText">
                  {[
                    "Create your online profile on our secure portal with basic personal details.",
                    "Provide information about your local finswimming club or register as an independent.",
                    "Select from Athlete, Coach, Technical Official, or Associate memberships.",
                    "Receive your digital membership card once your application is reviewed and verified."
                  ][i]}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      
      <section className="mfsaCtaSection">
        <div className="mfsaContainer">
          <h2 className="mfsaCtaTitle">
            Ready to join Malaysia’s elite finswimming community?
          </h2>

          <div className="mfsaCtaButtons">
            <button className="mfsaBtnPrimary">Register Now</button>
            <button className="mfsaBtnOutline">Contact Support</button>
          </div>
        </div>
      </section>
    </>
  );
}