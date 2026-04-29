import { useState } from "react";
import { get_state } from "../../api/auth";
import { useQuery } from "@tanstack/react-query";

function ClubForm({ onNext, initialData }) {
  const [formData, setFormData] = useState(() => ({
    clubName: initialData?.name || "",
    state: initialData?.state || "",
    clubCode: initialData?.code || "",
    clubOwner: initialData?.owner || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    password: initialData?.password || "",
    date_of_birth: initialData?.date_of_birth || "",
    gender: initialData?.gender || "",
  }));
  const [errors, setErrors] = useState({});

  const { data: stateData } = useQuery({
    queryKey: ["states"],
    queryFn: get_state,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const states = stateData?.data || [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ VALIDATION FUNCTION
  const validate = () => {
    const newErrors = {};

    if (!formData.clubName.trim()) {
      newErrors.clubName = "Club name is required";
    }

    if (!formData.state) {
      newErrors.state = "Please select a state";
    }

    if (!formData.clubCode.trim()) {
      newErrors.clubCode = "Club code is required";
    } else if (!/^[A-Z]{3}-\d{3}$/.test(formData.clubCode)) {
      newErrors.clubCode = "Format: ABC-123";
    }

    if (!formData.clubOwner.trim()) {
      newErrors.clubOwner = "Owner name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.password) {
      newErrors.password = "Password required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }
    
    if (!formData.date_of_birth) {
      newErrors.date_of_birth = "Date of birth is required";
    } else {
      const today = new Date();
      const dob = new Date(formData.date_of_birth);

      if (dob >= today) {
        newErrors.date_of_birth = "Date of birth must be in the past";
      }
    }

    if (!formData.gender) {
      newErrors.gender = "Please select gender";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlesumbit = (e) => {
    e.preventDefault();

    if (!validate()) return; // 🚨 STOP

    onNext(formData);
  };

  return (
    <form className="regForm" onSubmit={handlesumbit}>
      {/* CLUB NAME + STATE */}
      <div className="regGridLabel">
        <p className="regRowLabel">Club Name</p>
        <p className="regRowLabel">State</p>
      </div>

      <div className="regGrid">
        <div>
          <input
            className="regInput"
            name="clubName"
            value={formData.clubName}
            onChange={handleChange}
            placeholder="e.g. Selangor Finswimming Club"
          />
          {errors.clubName && (
            <span className="errorText">{errors.clubName}</span>
          )}
        </div>

        <div>
          <select
            className="regInput regSelect"
            name="state"
            value={formData.state}
            onChange={handleChange}
          >
            <option value="">-- Select State / Region --</option>
            {states.map((s) => (
              <option key={s.user} value={s.user}>
                {s.state_name}
              </option>
            ))}
          </select>
          {errors.state && <span className="errorText">{errors.state}</span>}
        </div>
      </div>

      {/* CLUB CODE + OWNER */}
      <div className="regGridLabel">
        <p className="regRowLabel">Club Code</p>
        <p className="regRowLabel">Club Owner</p>
      </div>

      <div className="regGrid">
        <div>
          <input
            className="regInput"
            name="clubCode"
            value={formData.clubCode}
            onChange={(e) =>
              setFormData({
                ...formData,
                clubCode: e.target.value.toUpperCase(),
              })
            }
            placeholder="e.g. MYS-123"
          />
          {errors.clubCode && (
            <span className="errorText">{errors.clubCode}</span>
          )}
        </div>

        <div>
          <input
            className="regInput"
            name="clubOwner"
            value={formData.clubOwner}
            onChange={handleChange}
            placeholder="e.g. John Mathew"
          />
          {errors.clubOwner && (
            <span className="errorText">{errors.clubOwner}</span>
          )}
        </div>
      </div>

      {/* EMAIL + PHONE */}
      <div className="regGridLabel">
        <p className="regRowLabel">Email</p>
        <p className="regRowLabel">Phone</p>
      </div>

      <div className="regGrid">
        <div>
          <input
            className="regInput"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. club@email.com"
          />
          {errors.email && <span className="errorText">{errors.email}</span>}
        </div>

        <div>
          <input
            className="regInput"
            name="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value.replace(/\D/g, "").slice(0, 10),
              })
            }
            placeholder="10 digit mobile number"
          />
          {errors.phone && <span className="errorText">{errors.phone}</span>}
        </div>
      </div>
      <div className="regGridLabel">
        <p className="regRowLabel">Date of Birth</p>
        <p className="regRowLabel">Gender</p>
      </div>

      <div className="regGrid">
        <div>
          <input
            type="date"
            className="regInput"
            name="date_of_birth"
            value={formData.date_of_birth || ""}
            onChange={handleChange}
          />
          {errors.date_of_birth && <span className="errorText">{errors.date_of_birth}</span>}
        </div>

        <div>
          <select
            className="regInput"
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
          {errors.gender && <span className="errorText">{errors.gender}</span>}
        </div>
      </div>

      {/* ADDRESS */}
      <p className="regRowLabel">Club Address</p>
      <input
        className="regInput full"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="e.g. No.12, Jalan Aquatic, Kuala Lumpur"
      />
      {errors.address && <span className="errorText">{errors.address}</span>}

      {/* PASSWORD */}
      <p className="regRowLabel">Password</p>
      <input
        type="password"
        className="regInput full"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter strong password (min 6 characters)"
      />
      {errors.password && <span className="errorText">{errors.password}</span>}

      <button className="regBtn">Save and Continue</button>
    </form>
  );
}

export default ClubForm;
