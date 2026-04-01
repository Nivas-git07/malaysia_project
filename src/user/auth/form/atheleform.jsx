import { useState } from "react";
import { athelete_register } from "../../api/auth";

function Atheleform() {
  const [name, setname] = useState("");
  const [govt_id, setgovt_id] = useState("");
  const [email, setemail] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [gender, setgender] = useState("");
  const [dob, setdob] = useState("");
  const [password, setpassword] = useState("");
  const [state, setstate] = useState("");
  const [discipline, setdiscipline] = useState("");

  const role = "ATHLETE";

  const handleclick = async (e) => {
    e.preventDefault();

    try {
      const response = await athelete_register(
        name,
        govt_id,
        email,
        Number(phonenumber),
        role,
        gender,
        dob,
        state,
        password,
      );

      console.log(response.data);
      alert("register successfully");
      // setname("");
      // setgovt_id("");
      // setemail("");
      // setphonenumber("");
      // setgender("");
      // setdob("");
      // setpassword("");
      // setstate("");
    } catch (e) {
      console.log(e.response?.data);
    }
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
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <input
          className="regInput"
          placeholder="Govt-id"
          value={govt_id}
          onChange={(e) => {
            setgovt_id(e.target.value);
          }}
        />
      </div>

      <div className="regGridLabel">
        <p className="regRowLabel">Email</p>
        <p className="regRowLabel">Mobile Number</p>
      </div>

      <div className="regGrid">
        <input
          className="regInput"
          placeholder="e.g.,example@email.com"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
        />
        <input
          className="regInput"
          placeholder="e.g., +60 12 345 678"
          value={phonenumber}
          onChange={(e) => {
            setphonenumber(e.target.value);
          }}
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
          onChange={(e) => {
            setdob(e.target.value);
          }}
        />

        <div className="regField">
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
      </div>
      <div className="regGridLabel">
        <p className="regRowLabel">State / Region</p>
        <p className="regRowLabel">Discipline</p>
      </div>

      <div className="regGrid">
        <input
          type=""
          className="regInput"
          value={state}
          onChange={(e) => {
            setstate(e.target.value);
          }}
        />

        <div className="regField">
          <select
            className="regSelect"
            value={discipline}
            onChange={(e) => setdiscipline(e.target.value)}
          >
            <option value="">Select Discipline</option>
            <option value="SURFACE">Surface</option>
            <option value="BI_FINS">Bi_Fins</option>
            <option value="APNEA">Apnea</option>
            <option value="IMMERSION">Immersion</option>
          </select>
        </div>
      </div>

      <p className="regRowLabel">Password</p>
      <input
        className="regInput full"
        placeholder="* * * * * * * *"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />

      <button className="regBtn">Register</button>
    </form>
  );
}

export default Atheleform;
