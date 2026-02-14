function ClubForm(){
  return(

    <form className="regForm">

      {/* ROW 1 LABEL */}
      <div className="regGridLabel">
        <p className="regRowLabel">Club Name</p>
        <p className="regRowLabel">State</p>
      </div>

      <div className="regGrid">
        <input className="regInput" placeholder="e.g.,Selangor Finswimming Club"/>
        <select className="regInput">
          <option>--Select State--</option>
        </select>
      </div>

      {/* ROW 2 */}
      <div className="regGridLabel">
        <p className="regRowLabel">Club Code</p>
        <p className="regRowLabel">Club Owner</p>
      </div>

      <div className="regGrid">
        <input className="regInput" placeholder="e.g.,MYS-123"/>
        <input className="regInput" placeholder="Full Name"/>
      </div>

      {/* ROW 3 */}
      <div className="regGridLabel">
        <p className="regRowLabel">Email</p>
        <p className="regRowLabel">Phone number</p>
      </div>

      <div className="regGrid">
        <input className="regInput" placeholder="e.g.,example@email.com"/>
        <input className="regInput" placeholder="e.g., +60 12 345 678"/>
      </div>

      {/* FULL ROW */}
      <p className="regRowLabel">Club Address</p>
      <input className="regInput full" placeholder="Full Address"/>

      <button className="regBtn">Register</button>

    </form>

  )
}
export default ClubForm