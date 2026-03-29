import { useState } from "react";
import ClubForm from "./clubform";
import ClubFormX from "./clubabout";
import { club_register } from "../../api/auth";

export default function ClubRegisterFlow() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    clubName: "",
    state: "",
    clubCode: "",
    clubOwner: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    about: "",
    vision: "",
    mission: "",
  });

  // Step 1 submit → go to step 2
  const handleStep1Submit = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  // Final submit → API call
  const handleFinalSubmit = async (data) => {
    const finalData = { ...formData, ...data };

    try {
      const response = await club_register(
        finalData.email,
        finalData.password,
        finalData.clubOwner,
        Number(finalData.phone),
        finalData.state,
        finalData.clubName,
        finalData.clubCode,
        finalData.address,
        finalData.about,
        finalData.vision,
        finalData.mission
      );

      console.log(response.data);
      alert("Club Registration successful 🎉");
    } catch (e) {
      console.log(e.response?.data);
    }
  };

  return (
    <>
      {step === 1 && <ClubForm onNext={handleStep1Submit} />}
      {step === 2 && <ClubFormX onSubmit={handleFinalSubmit} />}
    </>
  );
}