import { useState } from "react";
import ClubForm from "./clubform";
import ClubFormX from "./clubabout";
import { club_register } from "../../api/auth";
import MembershipX from "./membershipform";
import MembershipPayment from "./membershippayment";
import AlertPopup from "../../hooks/popuptemplate";

export default function ClubRegisterFlow({ onStepChange, step, setStep }) {
  const [alert, setAlert] = useState(null);

  const [club, setClub] = useState({
    id: null,
    role: "CLUB",
    state_id: null,
  });

  const [formData, setFormData] = useState({
    club: {
      name: "",
      state: "",
      code: "",
      owner: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    },
    about: {
      about: "",
      vision: "",
      mission: "",
    },
    membership: {
      plan: null,
      amount: 0,
    },
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // ✅ STEP 1
  const handleStep1Submit = (data) => {
    setFormData((prev) => ({
      ...prev,
      club: {
        name: data.clubName,
        state: data.state,
        code: data.clubCode,
        owner: data.clubOwner,
        email: data.email,
        phone: data.phone,
        address: data.address,
        password: data.password,
      },
    }));

    nextStep();
    onStepChange("clubFlow");
  };

  // ✅ STEP 2 (REGISTER CLUB)
  const handleFinalSubmit = async (data) => {
    const updatedData = {
      ...formData,
      about: {
        about: data.about,
        vision: data.vision,
        mission: data.mission,
      },
    };

    setFormData(updatedData);

    try {
      const response = await club_register(
        updatedData.club.email,
        updatedData.club.password,
        updatedData.club.owner,
        updatedData.club.phone,
        updatedData.club.state,
        updatedData.club.name,
        updatedData.club.code,
        updatedData.club.address,
        updatedData.about.about,
        updatedData.about.vision,
        updatedData.about.mission
      );

      if (response && (response.status === 200 || response.status === 201)) {
        setAlert({
          message: "Club Registration successful 🎉",
          type: "success",
        });
        console.log("Club registered successfully:", response.data);

        setClub((prev) => ({
          ...prev,
          id: response.data.id,
          state_id: response.data.state,
        }));

        setFormData((prev) => ({
          ...prev,
          club: {
            ...prev.club,
            id: response.data.id,
            state: response.data.state,
          },
        }));

        setTimeout(() => {
          nextStep();
        }, 2000);
      }
    } catch (e) {
      setAlert({
        message:
          e.response?.data?.message ||
          "Registration failed ❌ Please try again.",
        type: "error",
      });
    }
  };

  // ✅ STEP 3
  const handleStep3Submit = (planData) => {
    setFormData((prev) => ({
      ...prev,
      membership: {
        plan: planData.name,
        amount: planData.price,
      },
    }));

    nextStep();
  };

  return (
    <>
     
      {alert && (
        <AlertPopup
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

    
      {step === 1 && (
        <ClubForm
          onNext={handleStep1Submit}
          initialData={formData.club} 
        />
      )}

     
      {step === 2 && (
        <ClubFormX
          onSubmit={handleFinalSubmit}
          onBack={prevStep}
          initialData={formData.about} 
        />
      )}

      {step === 3 && (
        <MembershipX
          onSubmit={handleStep3Submit}
          role="ALLIED_MEMBER"
        />
      )}

      {/* ✅ STEP 4 */}
      {step === 4 && (
        <MembershipPayment
          plan={formData.membership.plan}
          amount={formData.membership.amount}
          user={club}
        />
      )}
    </>
  );
}