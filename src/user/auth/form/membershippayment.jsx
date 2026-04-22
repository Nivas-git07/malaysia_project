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
} from "../../api/auth";
import { getclublist } from "../../api/club";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AlertPopup from "../../hooks/popuptemplate";

export default function MembershipPayment({ plan, amount, user }) {
  console.log("the page is rendering", user);
  const [alert, setAlert] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [Transaction, setTransaction] = useState({
    Transaction_id: "",
    club: "",
    receipt_image: null,
    notes: "",
    amount_paid: amount,
  });

  console.log("the page is rendering", user);

  // ✅ FETCH DATA
  const { data } = useQuery({
    queryKey: ["dropdown", user.role, user.state_id],
    queryFn: () =>
      user.role === "ATHLETE" ? getclublist(user.state_id) : get_state(),
    enabled: !!user.role,
  });

  const states = data?.data || [];

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

    const formData = new FormData();
    formData.append("user", user.id);
    formData.append("transaction_id", Transaction.Transaction_id);
    formData.append("amount_paid", amount);
    formData.append("membership_plan", plan);
    formData.append("receipt_image", Transaction.receipt_image);

    const hasClub = Transaction.club && Transaction.club.trim() !== "";

    if (user.role === "ATHLETE") {
      if (hasClub) formData.append("club", Transaction.club);
    } else {
      if (hasClub) formData.append("state", Transaction.club);
    }

    try {
      let response;

      if (user.role === "ATHLETE") {
        response = await athletemembership_purchase(formData, user.state_id);
      } else {
        response = await membrship_purchase(formData);
      }

      // ✅ IMPORTANT: check response
      if (response && (response.status === 200 || response.status === 201)) {
        setAlert({
          message: !hasClub
            ? "No club found. Processed under state/national 🎉"
            : "Membership purchased successfully 🎉",
          type: "success",
        });

  
        setTimeout(() => {
          if (user.role === "ATHLETE") {
            navigate("/");
          } else {
            navigate("/admin/home");
          }
        }, 2000);
      } else {
        // ❌ if response not valid
        setAlert({
          message: "Unexpected response from server ❌",
          type: "error",
        });
      }
    } catch (e) {
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
            <div className="formGroup">
              <label>SELECT CLUB (Optional)</label>
              <select
                value={Transaction.club}
                onChange={(e) =>
                  setTransaction({ ...Transaction, club: e.target.value })
                }
              >
                <option value="">Select your registered club</option>
                {states.map((s) => (
                  <option key={s.user} value={s.user}>
                    {s.state_name || s.club_name}
                  </option>
                ))}
              </select>
            </div>

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
