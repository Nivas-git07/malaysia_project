import React from "react";
import { useState } from "react";
import { approvemembership } from "../api/membership";
import { IoClose } from "react-icons/io5";

export default function MembershipPopup({ data, onClose }) {
    const [isApproving, setIsApproving] = useState(false);

    const handleApprove = async () => {
        setIsApproving(true);
        try {
            await approvemembership(data.membership_id,"ACTIVE");
            onClose();
            alert("Membership approved successfully!");
        } catch (error) {
            console.error("Error approving membership:", error);
        } finally {
            setIsApproving(false);
        }
    };


    return (
        <div className="membership-popup-overlay">

            <div className="membership-popup-card">

                {/* Header */}
                <div className="membership-popup-header">
                    <h2 className="membership-popup-title">Membership Details</h2>
                    <button className="membership-popup-close" onClick={onClose}>
                        <IoClose size={22} />
                    </button>
                </div>

                <div className="membership-popup-body">

                    <div className="membership-item">
                        <div className="membership-label">Membership ID</div>
                        <div className="membership-value">{data.membership_id}</div>
                    </div>

                    <div className="membership-item">
                        <div className="membership-label">Status</div>
                        <div className="membership-valuestatus">{data.status}</div>
                    </div>

                    <div className="membership-item">
                        <div className="membership-label">User Name</div>
                        <div className="membership-value">{data.user_name}</div>
                    </div>

                    <div className="membership-item">
                        <div className="membership-label">State</div>
                        <div className="membership-value">{data.state_name}</div>
                    </div>

                    <div className="membership-item">
                        <div className="membership-label">Membership Plan</div>
                        <div className="membership-value">{data.membership_plan}</div>
                    </div>

                    <div className="membership-item">
                        <div className="membership-label">Transaction ID</div>
                        <div className="membership-value">{data.transaction_id}</div>
                    </div>

                    <div className="membership-item">
                        <div className="membership-label">Amount Paid</div>
                        <div className="membership-value">₹{data.amount_paid}</div>
                    </div>

                    <div className="membership-item">
                        <div className="membership-label">User Email</div>
                        <div className="membership-value">{data.user_email}</div>
                    </div>

                </div>

                {/* Footer */}
                <div className="membership-popup-footer">
                    <button className="membership-action-btn" onClick={()=>{handleApprove()}} >
                        Approved
                    </button>
                </div>

            </div>

        </div>
    );
}