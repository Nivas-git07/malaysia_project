import {
  FaUniversity,
  FaHeadset,
  FaCloudUploadAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { useRef, useState } from "react";
import {
  membrship_purchase,
  athletemembership_purchase,
  get_state,
  clubmembership_purchase,
} from "../../api/auth";
import { getclublist } from "../../api/club";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AlertPopup from "../../hooks/popuptemplate";
import { useLocation } from "react-router-dom";
export default function MembershipPayment({ plan, amount, user }) {
  console.log("the page is rendering", user);
  const [alert, setAlert] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const location = useLocation();

  const [Transaction, setTransaction] = useState({
    Transaction_id: "",
    club: "",
    receipt_image: null,
    notes: "",
    amount_paid: amount,
  });

  console.log("the page is rendering", user);
  const getRedirectPath = () => {
    if (location.pathname.startsWith("/admin")) {
      return "/admin/membership/status";
    }

    if (location.pathname.startsWith("/athlete")) {
      return "/athlete/membership/status";
    }

    if (location.pathname.startsWith("/register")) {
      return "/login";
    }

    return "/";
  };

  // ✅ FETCH DATA
  const { data } = useQuery({
    queryKey: ["dropdown", user.role, user.state_id],
    queryFn: () =>
      user.role === "ATHLETE" ? getclublist(user.state_id) : get_state(),
    enabled: !!user.role,
  });
  console.log("Fetched dropdown data:", data);

  const states = Array.isArray(data?.data) ? data.data : [];
  console.log("Fetched states/clubs:", states);
  // ✅ VALIDATION
  const validateTransaction = () => {
    const newErrors = {};

    if (!Transaction.Transaction_id.trim()) {
      newErrors.transaction = "Transaction ID is required";
    } else if (Transaction.Transaction_id.length < 6) {
      newErrors.transaction = "Minimum 6 characters required";
    }

    if (!Transaction.receipt_image) {
      newErrors.image = "Receipt is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setAlert({
        message: "Please fill all required fields ❌",
        type: "error",
      });
      return false;
    }

    return true;
  };

  const membershippurchase = async () => {
    if (!validateTransaction()) return;
    const hasClub = Transaction.club && Transaction.club.trim() !== "";
    try {
      const formData = new FormData();
      // const hasClub = Transaction.club?.trim();

      // Common fields
      formData.append("transaction_id", Transaction.Transaction_id);
      formData.append("amount_paid", amount);
      formData.append("membership_plan", plan);

      if (Transaction.receipt_image) {
        formData.append("receipt_image", Transaction.receipt_image);
      }

      // Role-based fields
      if (user.role === "ATHLETE") {
        formData.append("user", user.id);
        formData.append("club", Transaction.club);
      } else if (user.role === "CLUB") {
        formData.append("user", user.id);
        formData.append("state", Transaction.club);
      }

      let response;

      // API selection
      if (user.role === "ATHLETE" && user.state_id) {
        console.log("Submitting athlete membership with data:", {
          user: user.id,
          club: Transaction.club,
          transaction_id: Transaction.Transaction_id,
          amount_paid: amount,
          membership_plan: plan,
          receipt_image: Transaction.receipt_image,
        });
        response = await athletemembership_purchase(formData, user.state_id);
      } else if (user.role === "CLUB") {
        response = await clubmembership_purchase(formData);
      } else {
        response = await membrship_purchase(formData);
      }

      setAlert({
        message: !hasClub
          ? "No club found. Processed under state/national 🎉"
          : "Membership purchased successfully 🎉",
        type: "success",
      });

      setTimeout(() => {
        navigate(getRedirectPath());
      }, 2000);
    } catch (e) {
      console.error("Membership Error:", e);

      setAlert({
        message:
          e.response?.data?.message || "Payment failed ❌ Please try again.",
        type: "error",
      });
    }
  };

  return (
    <>
      {alert && (
        <AlertPopup
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <section className="mfsaCompleteSection">
        <div className="mfsaContainer">
          <h1 className="mfsaTitle">Complete Your Membership</h1>
          <p className="mfsaSub">
            Submit your payment details to activate your membership
          </p>

          <div className="mfsaSteps">
            <div className="step active">
              <FaCheckCircle />
              <span>STEP 1: CHOOSE PLAN</span>
            </div>

            <div className="stepLine"></div>

            <div className="step">
              <div className="circle">2</div>
              <span>STEP 2: SUBMIT DETAILS</span>
            </div>
          </div>

          <div className="mfsaPlanCard">
            <div className="planLeft">
              <span className="planTag">SELECTED PLAN</span>

              <h3>{plan}</h3>

              <div className="planFeatures">
                <span>🏅 Global Rankings Entry</span>
                <span>🏆 Championship Discounts</span>
              </div>
            </div>

            <div className="planPrice">
              ${amount}
              <span>/per year</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mfsaPaymentSection">
        <div className="mfsaContainer mfsaPaymentGrid">
          <div className="mfsaFormCard">
            {/* TRANSACTION ID */}
            <div className="formGroup">
              <label>TRANSACTION ID *</label>
              <input
                type="text"
                placeholder="e.g. TXN9823410"
                value={Transaction.Transaction_id}
                onChange={(e) =>
                  setTransaction({
                    ...Transaction,
                    Transaction_id: e.target.value,
                  })
                }
              />
              {errors.transaction && (
                <span className="errorText">{errors.transaction}</span>
              )}
            </div>

            {/* CLUB OPTIONAL */}
            {user.role !== "STATE" && (
              <div className="formGroup">
                <label>SELECT CLUB (Optional)</label>
                {states.length === 0 ? (
                  <div className="noDataBox">
                    🚫 No club available for your region
                  </div>
                ) : (
                  <select
                    value={Transaction.club}
                    onChange={(e) =>
                      setTransaction({ ...Transaction, club: e.target.value })
                    }
                  >
                    <option value="">
                      Select your registered club or State
                    </option>
                    {states.map((s) => (
                      <option key={s.user} value={s.user}>
                        {s.state_name || s.club_name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}

            {/* FILE UPLOAD */}
            <div className="formGroup">
              <label>UPLOAD PAYMENT RECEIPT *</label>

              <div
                className="uploadBox"
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
              >
                <FaCloudUploadAlt />
                <p>Click to upload receipt</p>
                <span>PNG, JPG or PDF</span>
              </div>

              <p>{Transaction.receipt_image?.name || "No file selected"}</p>

              {errors.image && (
                <span className="errorText">{errors.image}</span>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) =>
                setTransaction({
                  ...Transaction,
                  receipt_image: e.target.files[0],
                })
              }
            />

            {/* NOTES */}
            <div className="formGroup">
              <label>NOTES</label>
              <textarea
                value={Transaction.notes}
                onChange={(e) =>
                  setTransaction({ ...Transaction, notes: e.target.value })
                }
              />
            </div>

            {/* BUTTON */}
            <div className="formActions">
              <button
                type="button"
                className="btnPrimary"
                onClick={membershippurchase}
              >
                Submit Membership
              </button>
            </div>
          </div>
          <div className="mfsaSide">
            <div className="paymentCard">
              <h3>
                <FaUniversity /> Payment Instructions
              </h3>

              <div className="paymentInfo">
                <p>
                  <span>Bank Name</span> Malaysian National Aquatic Bank
                </p>
                <p>
                  <span>Account Number</span> 8882 - 9012 - 4432
                </p>
                <p>
                  <span>Recipient Name</span> MWFF Federation
                </p>
              </div>

              <ul className="paymentSteps">
                <li>Transfer exactly $100 via Online Banking or ATM</li>
                <li>Screenshot or scan your receipt clearly</li>
                <li>Upload it with your Transaction ID</li>
              </ul>
            </div>

            <div className="supportCardX">
              <div className="supportIcon">
                <FaHeadset />
              </div>

              <div className="supportText">
                <h4>Need assistance?</h4>
                <p>Our support team is available 24/7 for technical issues.</p>
              </div>
            </div>

            <div className="quoteCard">
              <p>"Excellence through discipline and speed."</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
