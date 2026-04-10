import { useState } from "react";
import { athelete_register, club_register } from "../../api/auth";
import { get_state } from "../../api/auth";
import { useQuery } from "@tanstack/react-query";
function ClubForm({ onNext }) {
  const [formData, setFormData] = useState({
    clubName: "",
    state: "",
    clubCode: "",
    clubOwner: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const { data: stateData } = useQuery({
    queryKey: ["states"],
    queryFn: get_state,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const states = stateData?.data || [];

  console.log("States Data:", states);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesumbit = async (e) => {
    e.preventDefault();

    onNext(formData);
  };

  return (
    
    <form className="regForm" onSubmit={handlesumbit}>
      <div className="regGridLabel">
        <p className="regRowLabel">Club Name</p>
        <p className="regRowLabel">State</p>
      </div>

      <div className="regGrid">
        <input
          className="regInput"
          name="clubName"
          value={formData.clubName}
          onChange={handleChange}
          placeholder="e.g.,Selangor Finswimming Club"
        />

        <select
          className="regInput regSelect"
          name="state"
          value={formData.state}
          onChange={handleChange}
        >
          <option value="">-- Select State --</option>
          {states.map((state) => (
            <option key={state.user} value={state.user} >
              {state.state_name}
            </option>
          ))}
        </select>
      </div>

      <div className="regGridLabel">
        <p className="regRowLabel">Club Code</p>
        <p className="regRowLabel">Club Owner</p>
      </div>

      <div className="regGrid">
        <input
          className="regInput"
          name="clubCode"
          value={formData.clubCode}
          onChange={handleChange}
          placeholder="e.g.,MYS-123"
        />

        <input
          className="regInput"
          name="clubOwner"
          value={formData.clubOwner}
          onChange={handleChange}
          placeholder="Full Name"
        />
      </div>

      <div className="regGridLabel">
        <p className="regRowLabel">Email</p>
        <p className="regRowLabel">Phone number</p>
      </div>

      <div className="regGrid">
        <input
          className="regInput"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g.,example@email.com"
        />

        <input
          className="regInput"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="e.g., +60 12 345 678"
        />
      </div>

      <p className="regRowLabel">Club Address</p>

      <input
        className="regInput full"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Full Address"
      />
      <p className="regRowLabel">password</p>

      <input
        className="regInput full"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="* * * * * * * * "
      />

      <button className="regBtn">Save and Continue</button>
    </form>
  );
}
export default ClubForm;
