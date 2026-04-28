import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import Navbar from "../navbar/nav";
// import "./StateManagement.css";
import { state_register } from "../../api/auth_api";
import { get_state } from "../../../user/api/auth";
import { get_national_state } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";
export default function StateManagement() {
  const { data } = useQuery({
    queryKey: ["getnationalstate"],
    queryFn: get_national_state,
    refetchOnWindowFocus: false,
    retry: false,
  });
  const states = data?.data || [];
  console.log(states);
  const [form, setForm] = useState({
    state_name: "",
    email: "",
    password: "",
  });
  // const { data } = useQuery({
  //   querykey: ["get-state-data"],
  //   queryFn: get_state(),
  //   refetchOnWindowFocus: false,
  //   retry: false,
  // });
  // const states = data?.data || [];
  // console.log(s)

  const [showAlert, setShowAlert] = useState(false);

  // const [states, setStates] = useState([
  //   {
  //     id: 1,
  //     name: "California Finswimming",
  //     email: "cal@mfsa-admin.gov",
  //     status: "ACTIVE",
  //   },
  //   {
  //     id: 2,
  //     name: "New South Wales State",
  //     email: "nsw@finswim-mfsa.au",
  //     status: "ACTIVE",
  //   },
  //   {
  //     id: 3,
  //     name: "Berlin Aquatic Division",
  //     email: "berlin.rep@mfsa.de",
  //     status: "INACTIVE",
  //   },
  //   {
  //     id: 4,
  //     name: "Tokyo Metropolitan",
  //     email: "tokyo_fins@mfsa-org.jp",
  //     status: "ACTIVE",
  //   },
  // ]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.state_name || !form.email || !form.password) return;

    state_register(form.state_name, form.email, form.password)
      .then((res) => {
        alert("State registered successfully:", res.data);
      })
      .catch((err) => {
        console.log("Error registering state:", err.data);
        alert("Failed to register state. Please try again.");
      });

    const newState = {
      id: Date.now(),
      name: form.state_name,
      email: form.email,
      status: "ACTIVE",
    };

    setStates([newState, ...states]);

    setForm({
      state_name: "",
      email: "",
      password: "",
    });

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <>
      <Navbar />
      <div className="mu-membership-wrapper">
        <div className="statePage">
          {showAlert && (
            <div className="topAlert">
              <div>
                <strong>Configuration Updated</strong>
                <p>
                  The new federation state has been successfully registered.
                </p>
              </div>
            </div>
          )}

          <div className="stateheaderRow">
            <div>
              <h1>State Management</h1>
              <p>
                Configure and oversee administrative nodes across the
                federation.
              </p>
            </div>
            {/* <button className="primaryBtn">+ New State</button> */}
          </div>

          <div className="card formCard">
            <h3>New State Configuration</h3>

            <div className="formGrid">
              <div className="formGroup">
                <label>State Name</label>
                <input
                  name="state_name"
                  placeholder="e.g. Maharashtra Federation"
                  value={form.state_name}
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <label>Email Address</label>
                <input
                  name="email"
                  placeholder="admin@state-mfsa.org"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="formGroup">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="********"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="formAction">
              <button className="primaryBtn" onClick={handleSubmit}>
                Register State →
              </button>
            </div>
          </div>

          <div className="card tableCard">
            {/* <div className="statetableHeader">
              <h3>Federation Nodes</h3>
            </div> */}

            <div className="statetable">
              <div className="statetableHead">
                <span>STATE Name</span>
                <span>EMAIL ADDRESS</span>
                <span>NODE STATUS</span>
                <span>CONTROL</span>
              </div>

              {states.map((item) => (
                <div className="statetableRow" key={item.id}>
                  <span className="stateName">{item.state_name}</span>
                  <span>{item.email_id}</span>

                  <span
                    className={`statusPill ${item.is_active ? "active" : "inactive"}`}
                  >
                    <span className="statusDot"></span>
                    {item.is_active ? "Active" : "Inactive"}
                  </span>

                  <span className="control">
                    <FiEdit2 />
                  </span>
                </div>
              ))}
            </div>

            {/* <div className="pagination">
              <button>Previous</button>
              <button>Next</button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
