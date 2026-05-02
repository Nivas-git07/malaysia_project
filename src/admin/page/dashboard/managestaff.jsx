import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import Navbar from "../navbar/nav";
import { staff_register, get_staffs } from "../../api/auth_api";
// import { get_national_state } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";
import SkeletonLoader from "../../components/common/SkeletonLoader";
import ErrorState from "../../components/common/ErrorState";

export default function StaffManagement() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getStaffList"],
    queryFn: get_staffs,
    refetchOnWindowFocus: false,
    retry: false,
  });
  console.log(data?.data);

  const [form, setForm] = useState({
    staff_email_id: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    staff_email_id: "",
    password: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [staffs, setStaffs] = useState([]);

  const apiStaffs = data?.data || [];
  const displayStaffs = staffs.length > 0 ? staffs : apiStaffs;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // clear error while typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = () => {
    let newErrors = {};

    if (!form.staff_email_id) {
      newErrors.staff_email_id = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.staff_email_id)) {
      newErrors.staff_email_id = "Enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    staff_register(form.staff_email_id, form.password)
      .then((res) => {
        alert("Staff registered successfully");

        const newStaff = {
          id: Date.now(),
          staff_email_id: form.staff_email_id,
          is_active: true,
        };

        setStaffs([newStaff, ...displayStaffs]);

        setForm({
          staff_email_id: "",
          password: "",
        });

        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      })
      .catch((err) => {
        console.log("Error registering staff:", err);
        alert("Failed to register staff. Please try again.");
      });
  };

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

  if (error) {
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <ErrorState
            title="Unable to load staff list"
            message="Please check your connection and try again."
            onRetry={() => refetch()}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mu-membership-wrapper">
        <div className="statePage">
          {showAlert && (
            <div className="topAlert">
              <div>
                <strong>Staff Added</strong>
                <p>The new staff account has been successfully created.</p>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="stateheaderRow">
            <div>
              <h1>Staff Management</h1>
              <p>Manage and control system staff accounts securely.</p>
            </div>
          </div>

          {/* Form */}
          <div className="card formCard">
            <h3>New Staff Registration</h3>

            <div className="formGrid">
              {/* Email */}
              <div className="formGroup">
                <label>Email ID</label>
                <input
                  name="staff_email_id"
                  placeholder="staff@mfsa.org"
                  value={form.staff_email_id}
                  onChange={handleChange}
                />
                {errors.staff_email_id && (
                  <p className="errorText">{errors.staff_email_id}</p>
                )}
              </div>

              {/* Password */}
              <div className="formGroup">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="********"
                  value={form.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="errorText">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="formAction">
              <button className="primaryBtn" onClick={handleSubmit}>
                Register Staff →
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="card tableCard">
            <div className="statetable">
              <div className="statetableHead">
                <span>STAFF NAME </span>
                <span>EMAIL ID</span>
                <span>STATUS</span>
                <span>CONTROL</span>
              </div>

              {displayStaffs.map((item) => (
                <div className="statetableRow" key={item.id}>
                    <span>{item.staff_name || "-"}</span>
                  <span>{item.staff_email_id}</span>

                  <span
                    className={`statusPill ${
                      item.is_active ? "active" : "inactive"
                    }`}
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
          </div>
        </div>
      </div>
    </>
  );
}
