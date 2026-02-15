function Atheleform() {
    return (
        <form className="regForm">

            <div className="regGridLabel">
            <p className="regRowLabel">Athlete</p>
            <p className="regRowLabel">Govt-id</p>
            </div>
            <div className="regGrid">
                <input className="regInput" placeholder="First Name" />
                <input className="regInput" placeholder="Govt-id" />
            </div>

       
            <div className="regGridLabel">
                <p className="regRowLabel">Email</p>
                <p className="regRowLabel">Mobile Number</p>
            </div>

            <div className="regGrid">
                <input className="regInput" placeholder="e.g.,example@email.com" />
                <input className="regInput" placeholder="e.g., +60 12 345 678" />
            </div>

            <div className="regGridLabel">
                <p className="regRowLabel">Date of Birth</p>
                <p className="regRowLabel">Gender</p>
            </div>

            <div className="regGrid">
                <input type="date" className="regInput" />

                <div className="regField">
                    <select className="regSelect">
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>


            </div>

    
            <p className="regRowLabel">State / Region</p>
            <input className="regInput full" placeholder="State / Region" />

            <button className="regBtn">Register</button>

        </form>
    )
}


export default Atheleform