import { useState } from "react";
import { get_state } from "../../api/auth";
import { useQuery } from "@tanstack/react-query";

function Atheleform({ onSubmit }) {  // ✅ RECEIVE PROP

  const [name, setname] = useState("");
  const [govt_id, setgovt_id] = useState("");
  const [email, setemail] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [gender, setgender] = useState("");
  const [dob, setdob] = useState("");
  const [password, setpassword] = useState("");
  const [state, setstate] = useState("");
  const [discipline, setdiscipline] = useState("");

  const { data: stateData } = useQuery({
    queryKey: ["states"],
    queryFn: get_state,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const states = stateData?.data || [];

  // ✅ SUBMIT HANDLER
  const handleclick = (e) => {
    e.preventDefault();

    if (!onSubmit) {
      console.error("onSubmit not provided");
      return;
    }

    onSubmit({
      name,
      govt_id,
      email,
      phonenumber,
      gender,
      dob,
      state,
      password,
      discipline, // ✅ added (important)
    });
  };

  return (
    <form className="regForm" onSubmit={handleclick}>

      <div className="regGridLabel">
        <p className="regRowLabel">Athlete</p>
        <p className="regRowLabel">Govt-id</p>
      </div>

      <div className="regGrid">
        <input
          className="regInput"
          placeholder="First Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <input
          className="regInput"
          placeholder="Govt-id"
          value={govt_id}
          onChange={(e) => setgovt_id(e.target.value)}
        />
      </div>

      <div className="regGridLabel">
        <p className="regRowLabel">Email</p>
        <p className="regRowLabel">Mobile Number</p>
      </div>

      <div className="regGrid">
        <input
          className="regInput"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          className="regInput"
          placeholder="+60 12 345 678"
          value={phonenumber}
          onChange={(e) => setphonenumber(e.target.value)}
        />
      </div>

      <div className="regGridLabel">
        <p className="regRowLabel">Date of Birth</p>
        <p className="regRowLabel">Gender</p>
      </div>

      <div className="regGrid">
        <input
          type="date"
          className="regInput"
          value={dob}
          onChange={(e) => setdob(e.target.value)}
        />

        <select
          className="regSelect"
          value={gender}
          onChange={(e) => setgender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
      </div>

      <div className="regGridLabel">
        <p className="regRowLabel">State / Region</p>
        <p className="regRowLabel">Discipline</p>
      </div>

      <div className="regGrid">
        <select
          className="regSelect"
          value={state}
          onChange={(e) => setstate(e.target.value)}
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s.user} value={s.user}>
              {s.state_name}
            </option>
          ))}
        </select>

        <select
          className="regSelect"
          value={discipline}
          onChange={(e) => setdiscipline(e.target.value)}
        >
          <option value="">Select Discipline</option>
          <option value="SURFACE">Surface</option>
          <option value="BI_FINS">Bi-Fins</option>
          <option value="APNEA">Apnea</option>
          <option value="IMMERSION">Immersion</option>
        </select>
      </div>

      <p className="regRowLabel">Password</p>

      <input
        className="regInput full"
        type="password"
        placeholder="********"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />

      <button className="regBtn">Register</button>
    </form>
  );
}

export default Atheleform;