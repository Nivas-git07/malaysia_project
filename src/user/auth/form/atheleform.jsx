import { useState } from "react";
import { get_state } from "../../api/auth";
import { useQuery } from "@tanstack/react-query";

function Atheleform({ onSubmit }) {
  const [name, setname] = useState("");
  const [govt_id, setgovt_id] = useState("");
  const [email, setemail] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [gender, setgender] = useState("");
  const [dob, setdob] = useState("");
  const [password, setpassword] = useState("");
  const [state, setstate] = useState("");
  const [discipline, setdiscipline] = useState("");

  const [errors, setErrors] = useState({});

  const { data: stateData } = useQuery({
    queryKey: ["states"],
    queryFn: get_state,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const states = stateData?.data || [];

  // ✅ VALIDATION FUNCTION
  const validate = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Name is required";

    if (!govt_id) {
      newErrors.govt_id = "Govt ID is required";
    } else if (govt_id.length !== 12) {
      newErrors.govt_id = "Govt ID must be exactly 12 characters";
    }

    if (!email) newErrors.email = "Email is required";

    if (!phonenumber) {
      newErrors.phonenumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(phonenumber)) {
      newErrors.phonenumber = "Mobile number must be exactly 10 digits";
    }

    if (!gender) newErrors.gender = "Select gender";
    if (!dob) newErrors.dob = "Date of birth required";
    if (!state) newErrors.state = "Select state";
    if (!discipline) newErrors.discipline = "Select discipline";
    if (!password) newErrors.password = "Password required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ SUBMIT
  const handleclick = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      name,
      govt_id,
      email,
      phonenumber,
      gender,
      dob,
      state,
      password,
      discipline,
    });
  };

  return (
    <form className="regForm" onSubmit={handleclick}>
      {/* NAME + GOVT */}
      <div className="regGridLabel">
        <p className="regRowLabel">Athlete</p>
        <p className="regRowLabel">Govt-id</p>
      </div>

      <div className="regGrid">
        <div>
          <input
            className="regInput"
            placeholder="First Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          {errors.name && <span className="errorText">{errors.name}</span>}
        </div>

        <div>
          <input
            className="regInput"
            placeholder="Govt-id"
            value={govt_id}
            onChange={(e) =>
              setgovt_id(e.target.value.slice(0, 12)) // limit 12
            }
          />
          {errors.govt_id && (
            <span className="errorText">{errors.govt_id}</span>
          )}
        </div>
      </div>

      {/* EMAIL + PHONE */}
      <div className="regGridLabel">
        <p className="regRowLabel">Email</p>
        <p className="regRowLabel">Mobile Number</p>
      </div>

      <div className="regGrid">
        <div>
          <input
            className="regInput"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          {errors.email && <span className="errorText">{errors.email}</span>}
        </div>

        <div>
          <input
            className="regInput"
            placeholder="10 digit mobile"
            value={phonenumber}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/\D/g, "");
              setphonenumber(onlyNums.slice(0, 10)); // limit 10 digits
            }}
          />
          {errors.phonenumber && (
            <span className="errorText">{errors.phonenumber}</span>
          )}
        </div>
      </div>

      {/* DOB + GENDER */}
      <div className="regGridLabel">
        <p className="regRowLabel">Date of Birth</p>
        <p className="regRowLabel">Gender</p>
      </div>

      <div className="regGrid">
        <div>
          <input
            type="date"
            className="regInput"
            value={dob}
            onChange={(e) => setdob(e.target.value)}
          />
          {errors.dob && <span className="errorText">{errors.dob}</span>}
        </div>

        <div>
          <select
            className="regSelect"
            value={gender}
            onChange={(e) => setgender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.gender && (
            <span className="errorText">{errors.gender}</span>
          )}
        </div>
      </div>

      {/* STATE + DISCIPLINE */}
      <div className="regGridLabel">
        <p className="regRowLabel">State / Region</p>
        <p className="regRowLabel">Discipline</p>
      </div>

      <div className="regGrid">
        <div>
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
          {errors.state && <span className="errorText">{errors.state}</span>}
        </div>

        <div>
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
          {errors.discipline && (
            <span className="errorText">{errors.discipline}</span>
          )}
        </div>
      </div>

      {/* PASSWORD */}
      <p className="regRowLabel">Password</p>
      <input
        className="regInput full"
        type="password"
        placeholder="********"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      {errors.password && (
        <span className="errorText">{errors.password}</span>
      )}

      <button className="regBtn">Register</button>
    </form>
  );
}

export default Atheleform;