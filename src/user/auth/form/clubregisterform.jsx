import { useState } from "react";
import ClubForm from "./clubform";
import ClubFormX from "./clubabout";
import { club_register } from "../../api/auth";
import MembershipX from "./membershipform";
import Registermembershipsubmission from "../../page/register/registermemsubmission";
import MembershipPayment from "./membershippayment";
export default function ClubRegisterFlow({ onStepChange, step, setStep }) {
  console.log("Current Step:", step);
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
        updatedData.about.mission,
      );

      console.log(response.data);

      if (response.status === 200 || response.status === 201) {
        alert("Club Registration successful 🎉");
        setFormData((prev) => ({
          ...prev,
          club: {
            ...prev.club,
            id: response.data.id,
            state: response.data.state,
          },
        }));
        nextStep();
      }
    } catch (e) {
      console.log(e.response?.data);
      alert("Registration failed ❌");
    }
  };

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
      {step === 1 && <ClubForm onNext={handleStep1Submit} />}

      {step === 2 && <ClubFormX onSubmit={handleFinalSubmit} />}

      {step === 3 && <MembershipX onSubmit={handleStep3Submit} />}

      {step === 4 && (
        <MembershipPayment
          plan={formData.membership.plan}
          amount={formData.membership.amount}
          user={formData.club.id}
        />
      )}
    </>
  );
}
