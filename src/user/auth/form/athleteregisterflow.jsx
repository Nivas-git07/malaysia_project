import { useState } from "react";
import Atheleform from "./atheleform";
import MembershipX from "./membershipform";
import MembershipPayment from "./membershippayment";
import { athelete_register } from "../../api/auth";

export default function AthleteRegisterFlow({
  step,
  setStep,
  onStepChange, // ✅ ADDED
}) {
  const [formData, setFormData] = useState({
    athlete: {
      id: null,
    },
    membership: {
      plan: null,
      amount: 0,
    },
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // ✅ STEP 1: Athlete Registration
  const handleAthleteSubmit = async (data) => {
    try {
      const response = await athelete_register(
        data.name,
        data.govt_id,
        data.email,
        Number(data.phonenumber),
        "ATHLETE",
        data.gender,
        data.dob,
        data.state,
        data.password,
        data.discipline
      );

      if (response.status === 200 || response.status === 201) {
        alert("Athlete Registered ✅");

        setFormData((prev) => ({
          ...prev,
          athlete: {
            id: response.data.state, 
          },
        }));

        nextStep();

   
        onStepChange && onStepChange("individual");
      }
    } catch (e) {
      console.log(e.response?.data);
      alert("Registration failed ❌");
    }
  };

  const handleMembershipSubmit = (planData) => {
    setFormData((prev) => ({
      ...prev,
      membership: {
        plan: planData.name,
        amount: planData.price,
      },
    }));

    nextStep();


    onStepChange && onStepChange("individual");
  };

  return (
    <>
     
      {step === 1 && (
        <Atheleform onSubmit={handleAthleteSubmit} />
      )}

   
      {step === 2 && (
        <>
        
          {/* <button onClick={prevStep} style={{ marginBottom: "10px" }}>
            ⬅ Back
          </button> */}

          <MembershipX onSubmit={handleMembershipSubmit} />
        </>
      )}

     
      {step === 3 && formData.athlete.id && (
        <>
     
          {/* <button onClick={prevStep} style={{ marginBottom: "10px" }}>
            ⬅ Back
          </button> */}

          <MembershipPayment
            plan={formData.membership.plan}
            amount={formData.membership.amount}
            user={formData.athlete.id}
          />
        </>
      )}
    </>
  );
}