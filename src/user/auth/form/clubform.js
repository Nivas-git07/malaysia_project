import { useState } from "react"
import { athelete_register, club_register } from "../../api/auth";
function ClubForm() {
  const [formData, setFormData] = useState({
    clubName: "",
    state: "",
    clubCode: "",
    clubOwner: "",
    email: "",
    phone: "",
    address: "",
    password: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlesumbit = async (e) => {
    e.preventDefault();

    try {
      const response = await club_register(
        formData.email,
        formData.password,
        formData.clubOwner,
        Number(formData.phone),
        formData.state,
        formData.clubName,
        formData.clubCode,
        formData.address
      );

      console.log(response.data);
      alert("Club Registration successfull ");
      formData("")

    } catch (e) {
      console.log(e.response?.data);
    }
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
          <option>Johor</option>
          <option>Kedah</option>
          <option>Kelantan</option>
          <option>Malacca (Melaka)</option>
          <option>Negeri Sembilan</option>
          <option>Pahang</option>
          <option>Penang (Pulau Pinang)</option>
          <option>Perak</option>
          <option>Perlis</option>
          <option>Sabah</option>
          <option>Sarawak</option>
          <option>Selangor</option>
          <option>Terengganu</option>
          <option>Kuala Lumpur</option>
          <option>Labuan</option>
          <option>Putrajaya</option>
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

      <button className="regBtn">Register</button>

    </form>


  )
}
export default ClubForm