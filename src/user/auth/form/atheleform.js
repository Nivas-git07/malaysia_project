import { useState } from "react"
import { athelete_register } from "../../api/auth"


function Atheleform() {
    const [name, setname] = useState("");
    const [govt_id, setgovt_id] = useState("");
    const [email, setemail] = useState("");
    const [phonenumber, setphonenumber] = useState("");
    const [gender, setgender] = useState("");
    const [dob, setdob] = useState("");
    const [password, setpassword] = useState("");
    const [state, setstate] = useState("");



    const handleclick = async () => {
        try {
            const response = athelete_register(name, govt_id, email, phonenumber, gender, dob, state, password);
            console.log(response.data);
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <form className="regForm" onSubmit={handleclick()}>

            <div className="regGridLabel">
                <p className="regRowLabel">Athlete</p>
                <p className="regRowLabel">Govt-id</p>
            </div>
            <div className="regGrid">
                <input className="regInput" placeholder="First Name" value={name} onChange={(e) => {
                    setname(e.target.value)
                }} />
                <input className="regInput" placeholder="Govt-id" value={govt_id} onChange={(e) => {
                    setgovt_id(e.target.value)
                }} />
            </div>


            <div className="regGridLabel">
                <p className="regRowLabel">Email</p>
                <p className="regRowLabel">Mobile Number</p>
            </div>

            <div className="regGrid">
                <input className="regInput" placeholder="e.g.,example@email.com" value={email} onChange={(e) => {
                    setemail(e.target.value)
                }} />
                <input className="regInput" placeholder="e.g., +60 12 345 678" value={phonenumber} onChange={(e) => {
                    setphonenumber(e.target.value)
                }} />
            </div>

            <div className="regGridLabel">
                <p className="regRowLabel">Date of Birth</p>
                <p className="regRowLabel">Gender</p>
            </div>

            <div className="regGrid">
                <input type="date" className="regInput" value={dob} onChange={(e) => {
                    setdob(e.target.value)
                }} />

                <div className="regField">
                    <select className="regSelect" value={gender}
                        onChange={(e) => setgender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>


            </div>


            <p className="regRowLabel">State / Region</p>
            <input className="regInput full" placeholder="State / Region" value={state} onChange={(e) => setstate(e.target.value)

            } />
            <p className="regRowLabel">Password</p>
            <input className="regInput full" placeholder="* * * * * * * *" value={password} onChange={(e) => setpassword(e.target.value)

            } />


            <button className="regBtn">Register</button>

        </form>
    )
}


export default Atheleform