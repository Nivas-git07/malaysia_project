import {
  FaUniversity,
  FaHeadset,
  FaCloudUploadAlt,
  FaCheckCircle,
} from "react-icons/fa";
// import MembershipStep from "./membershipsubmission";
import { useRef } from "react";
import { membrship_purchase, athletemembership_purchase } from "../../api/auth";
import { get_state } from "../../api/auth";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getclublist } from "../../api/club";
import { useNavigate } from "react-router-dom";
import AlertPopup from "../../hooks/popuptemplate";
export default function MembershipPayment({ plan, amount, user }) {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  console.log("User Data in MembershipPayment:", user);

  const [Transaction, setTransaction] = useState({
    Transaction_id: "",
    club: "",
    receipt_image: null,
    notes: "",
    amount_paid: amount,
  });

  const membershippurchase = async () => {
    const formData = new FormData();

    formData.append("user", user.id);
    formData.append("transaction_id", Transaction.Transaction_id);

    if (user.role === "ATHLETE") {
      formData.append("club", Transaction.club);
    } else {
      formData.append("state", Transaction.club);
    }

    formData.append("amount_paid", amount);
    formData.append("membership_plan", plan);

    if (Transaction.receipt_image) {
      formData.append("receipt_image", Transaction.receipt_image);
    }

    try {
      if (user.role === "ATHLETE") {
        await athletemembership_purchase(formData, user.state_id);
        if (Transaction.club === null || Transaction.club === "") {
          setAlert({
            message:
              "your state has no club,so your membership will be processed with under state or national 🎉",
            type: "success",
          });
        } else {
          setAlert({
            message: "Athlete Membership purchased successfully 🎉",
            type: "success",
          });
        }

        setTimeout(() => navigate("/"), 3500);
        return;
      }

      await membrship_purchase(formData);

      setAlert({
        message: "Membership purchased successfully 🎉",
        type: "success",
      });

      setTimeout(() => navigate("/admin/membership/status"), 3500);
    } catch (e) {
      console.log(e.response?.data);

      setAlert({
        message:
          e.response?.data?.message || "Payment failed ❌ Please try again.",
        type: "error",
      });
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["dropdown", user.role, user.state_id],
    queryFn: () =>
      user.role === "ATHLETE" ? getclublist(user.state_id) : get_state(),

    enabled: !!user.role,
  });

  const states = data?.data || [];
  const fileInputRef = useRef(null);

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
            </div>

            <div className="formGroup">
              <label>SELECT CLUB *</label>
              <select
                value={Transaction.club}
                onChange={(e) =>
                  setTransaction({ ...Transaction, club: e.target.value })
                }
              >
                <option>Select your registered club</option>
                {states.map((state) => (
                  <option key={state.user} value={state.user}>
                    {state.state_name || state.club_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="formGroup">
              <label>UPLOAD PAYMENT RECEIPT *</label>

              <div
                className="uploadBox"
                onClick={() => fileInputRef.current.click()}
              >
                <FaCloudUploadAlt />
                <p>Click or drag and drop your receipt here</p>

                <span>PNG, JPG or PDF up to 5MB</span>
              </div>
              <p>{Transaction.receipt_image?.name || "No file selected"}</p>
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

            <div className="formGroup">
              <label>ADDITIONAL NOTES</label>
              <textarea
                placeholder="Any additional information for the federation..."
                value={Transaction.notes}
                onChange={(e) =>
                  setTransaction({ ...Transaction, notes: e.target.value })
                }
              />
            </div>

            <div className="formActions">
              <button
                className="btnPrimary"
                onClick={membershippurchase}
                disabled={!Transaction.Transaction_id || !Transaction.club}
              >
                Submit Membership
              </button>
              {/* <button className="btnOutline">Back to Plans</button> */}
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
