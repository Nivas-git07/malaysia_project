import { useState } from "react"
import { login_user } from "../../api/auth";

export default function MemberLogin() {
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
    try {
      const response = login_user(formdata.govt_id, formdata.email, formdata.password);
      console.log(response.data)
    }
    catch (e) {
      console.log(e)
    }
  }
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
