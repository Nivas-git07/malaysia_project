function ClubForm() {
  return (

    <form className="regForm">


      <div className="regGridLabel">
        <p className="regRowLabel">Club Name</p>
        <p className="regRowLabel">State</p>
      </div>

      <div className="regGrid">
        <input className="regInput" placeholder="e.g.,Selangor Finswimming Club" />
        <select className="regInput regSelect">
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
        <input className="regInput" placeholder="e.g.,MYS-123" />
        <input className="regInput" placeholder="Full Name" />
      </div>


      <div className="regGridLabel">
        <p className="regRowLabel">Email</p>
        <p className="regRowLabel">Phone number</p>
      </div>

      <div className="regGrid">
        <input className="regInput" placeholder="e.g.,example@email.com" />
        <input className="regInput" placeholder="e.g., +60 12 345 678" />
      </div>

      <p className="regRowLabel">Club Address</p>
      <input className="regInput full" placeholder="Full Address" />

      <button className="regBtn">Register</button>

    </form>

  )
}
export default ClubForm