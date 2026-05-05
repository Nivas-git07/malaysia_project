import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import Navbar from "../navbar/nav";
import { state_register } from "../../api/auth_api";
import { get_national_state } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";
import SkeletonLoader from "../../components/common/SkeletonLoader";
import ErrorState from "../../components/common/ErrorState";

export default function StateManagement() {
  // 🔥 Fetch states
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getnationalstate"],
    queryFn: get_national_state,
    refetchOnWindowFocus: false,
    retry: false,
  });

  // 🔥 Form state
  const [form, setForm] = useState({
    state_name: "",
    email: "",
    password: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  // 🔥 Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Submit handler (UPDATED)
  const handleSubmit = async () => {
    if (!form.state_name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      await state_register(form.state_name, form.email, form.password);

      alert("State registered successfully");

      // 🔥 Refetch latest data
      refetch();

      // Reset form
      setForm({
        state_name: "",
        email: "",
        password: "",
      });

      // Show top alert
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      console.log("Error:", err.response?.data || err.message);
      alert("Failed to register state. Please try again.");
    }
  };

  // 🔥 Loading UI
  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <SkeletonLoader variant="card" count={3} />
        </div>
      </>
    );
  }

  // 🔥 Error UI
  if (error) {
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <ErrorState
            title="Unable to load state list"
            message="Please check your connection and try again."
            onRetry={() => refetch()}
          />
        </div>
      </>
    );
  }

  // 🔥 Data
  const states = data?.data || [];

  return (
    <>
      <Navbar />
      <div className="mu-membership-wrapper">
        <div className="statePage">
          {/* 🔥 Top Alert */}
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

          {/* 🔥 Header */}
          <div className="stateheaderRow">
            <div>
              <h1>State Management</h1>
              <p>
                Configure and oversee administrative nodes across the
                federation.
              </p>
            </div>
          </div>

          {/* 🔥 Form */}
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

          {/* 🔥 Table */}
          <div className="card tableCard">
            <div className="statetable">
              <div className="statetableHead">
                <span>STATE NAME</span>
                <span>EMAIL ADDRESS</span>
                <span>NODE STATUS</span>
                <span>CONTROL</span>
              </div>

              {states.length === 0 ? (
                <div style={{ padding: "20px", textAlign: "center" }}>
                  No states found
                </div>
              ) : (
                states.map((item) => (
                  <div className="statetableRow" key={item.id}>
                    <span className="stateName">{item.state_name}</span>

                    <span>{item.email_id}</span>

                    <span
                      className={`statusPill ${
                        item.is_active ? "active" : "inactive"
                      }`}
                    >
                      <span className="statusDot"></span>
                      {item.is_active ? "Active" : "Inactive"}
                    </span>

                    <span className="control">
                      <FiEdit2 style={{ cursor: "pointer" }} />
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}