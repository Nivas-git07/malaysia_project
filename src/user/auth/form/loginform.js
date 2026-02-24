import { useState } from "react"
import { login_user } from "../../api/auth";
import { useNavigate } from "react-router-dom";
export default function MemberLogin() {
  const navigate = useNavigate();
  const [formdata, setformdate] = useState({
    email: "",
    govt_id: "",
    password: ""
  })

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdate(
      prev => ({
        ...prev,
        [name]: value
      })
    )
  }

const handlesubmit = async (e) => {
  e.preventDefault();

  console.log("STEP 1"); // should print

  try {
    console.log("STEP 2"); // should print

    const response = await login_user(
      formdata.govt_id,
      formdata.email,
      formdata.password
    );

    console.log("STEP 3"); // ⭐ DOES THIS PRINT?
    console.log(response);

    alert("login successfully");
    navigate("/");

  } catch (e) {
    console.log("ERROR OCCURED:", e);
  }
};
  return (

    <section className="loginSection">

      <div className="loginContainer">

        <h2 className="loginTitle">MEMBER LOGIN</h2>

        <form className="loginForm" onSubmit={handlesubmit}>


          <div className="loginField">
            <label className="loginLabel">Govt_id</label>
            <input type="text" className="loginInput" name="govt_id" value={formdata.govt_id} onChange={handlechange} />
          </div>


          <div className="loginField">
            <label className="loginLabel">Email</label>
            <input type="email" className="loginInput" name="email" value={formdata.email} onChange={handlechange} />
          </div>


          <div className="loginField">
            <label className="loginLabel">Password</label>
            <input type="password" className="loginInput" name="password" value={formdata.password} onChange={handlechange} />
          </div>

          <div className="loginBtnWrap">
            <button className="loginBtn">Submit</button>
          </div>

        </form>

      </div>

    </section>

  )
}
