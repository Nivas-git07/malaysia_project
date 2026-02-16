export default function MemberLogin(){
  return(

    <section className="loginSection">

      <div className="loginContainer">

        <h2 className="loginTitle">MEMBER LOGIN</h2>

        <form className="loginForm">

          {/* NAME */}
          <div className="loginField">
            <label className="loginLabel">Your Name</label>
            <input type="text" className="loginInput"/>
          </div>

          {/* EMAIL */}
          <div className="loginField">
            <label className="loginLabel">Email</label>
            <input type="email" className="loginInput"/>
          </div>

          {/* PASSWORD */}
          <div className="loginField">
            <label className="loginLabel">Password</label>
            <input type="password" className="loginInput"/>
          </div>

          <div className="loginBtnWrap">
            <button className="loginBtn">Submit</button>
          </div>

        </form>

      </div>

    </section>

  )
}
