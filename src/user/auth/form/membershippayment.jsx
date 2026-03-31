import { FaUniversity, FaHeadset, FaCloudUploadAlt } from "react-icons/fa";

export default function MembershipPayment() {
  return (
    <section className="mfsaPaymentSection">
      <div className="mfsaContainer mfsaPaymentGrid">
        {/* LEFT FORM */}
        <div className="mfsaFormCard">
          <div className="formGroup">
            <label>TRANSACTION ID *</label>
            <input type="text" placeholder="e.g. TXN9823410" />
          </div>

          <div className="formGroup">
            <label>SELECT CLUB *</label>
            <select>
              <option>Select your registered club</option>
              <option>Johor Bahru Club</option>
              <option>Kuala Lumpur Club</option>
            </select>
          </div>

          <div className="formGroup">
            <label>UPLOAD PAYMENT RECEIPT *</label>

            <div className="uploadBox">
              <FaCloudUploadAlt />
              <p>Click or drag and drop your receipt here</p>
              <span>PNG, JPG or PDF up to 5MB</span>
            </div>
          </div>

          <div className="formGroup">
            <label>ADDITIONAL NOTES</label>
            <textarea placeholder="Any additional information for the federation..." />
          </div>

          <div className="formActions">
            <button className="btnPrimary">Submit Membership</button>
            <button className="btnOutline">Back to Plans</button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="mfsaSide">
          {/* PAYMENT CARD */}
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

          {/* SUPPORT */}
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
  );
}
