import AthleteNavbar from "../../layout/athletenavbar";
import { useParams } from "react-router-dom";
// import { getmebershipdetails } from "../../api/membership";
import { getmebershipdetails } from "../../../admin/api/membership";
import { useQuery } from "@tanstack/react-query";
import LeaveMembershipModal from "./transfermembership/leavemembershipmodal";
import { useState } from "react";
import { leaveMembership } from "../../../admin/api/membership";
import { HandleRenew } from "../../hook/renewcheck";
import SkeletonLoader from "../common/SkeletonLoader";
import ErrorState from "../common/ErrorState";
function AthleteMembershipStatus() {
  const { id } = useParams();
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["membership-details", id],
    queryFn: () => getmebershipdetails(id),
  });

  const membership = data?.data || {};

  /* ================= HELPERS ================= */

  const formatPlan = (plan) => {
    return plan
      ?.replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getDaysLeft = () => {
    if (!membership.expiry_date) return 0;
    const today = new Date();
    const exp = new Date(membership.expiry_date);
    return Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
  };

  const getProgress = () => {
    if (!membership.membership_start || !membership.expiry_date) return 0;

    const start = new Date(membership.membership_start);
    const end = new Date(membership.expiry_date);
    const today = new Date();

    const total = end - start;
    const remaining = end - today;

    return Math.max(0, Math.min(100, Math.round((remaining / total) * 100)));
  };

  /* ================= STATUS ================= */

  const status = membership.calculate_status;

  const isPending = status === "PENDING";
  const isExpired = status === "EXPIRED";
  const isExpiring = status === "EXPIRING_SOON";
  const isActive = status === "ACTIVE";

  const daysLeft = getDaysLeft();
  const progress = getProgress();

  /* ================= STATES ================= */

  if (isLoading) return <SkeletonLoader variant="card" count={2} />;

  if (isError)
    return (
      <ErrorState
        title="Unable to load membership"
        message="Please check your connection and try again."
        onRetry={() => refetch()}
      />
    );

  return (
    <>
      <LeaveMembershipModal
        isOpen={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
        id={id}
      />
      <AthleteNavbar />

      <div className="mu-membership-wrapper">
        {/* HEADER */}
        <div className="mu-header">
          <h1>Membership</h1>
          <p>Manage and renew your membership</p>
        </div>

        {/* ================= TOP ================= */}
        <div className="mu-top-section">
          {/* LEFT CARD */}
          <div className="mu-plan-card">
            <div className="mu-plan-header">
              <div>
                <span className="mu-label">CURRENT PLAN</span>
                <h2>{formatPlan(membership.membership_plan)}</h2>
              </div>

              {/* STATUS BADGE */}
              <span
                className={`mu-badge ${
                  isPending
                    ? "pending"
                    : isExpired
                      ? "expired"
                      : isExpiring
                        ? "expiring"
                        : "active"
                }`}
              >
                {isPending
                  ? "Pending Approval"
                  : isExpired
                    ? "Expired"
                    : isExpiring
                      ? "Expiring Soon"
                      : "Active"}
              </span>
            </div>

            {/* DAYS SECTION */}
            <div className="mu-days">
              {isPending ? (
                <>
                  <h1 style={{ color: "#dc2626" }}>Pending Approval</h1>
                  <p>Your membership is under review</p>
                </>
              ) : (
                <>
                  <h1>
                    {isExpired ? 0 : daysLeft} <span>Days Left</span>
                  </h1>
                  <p>Expires on {formatDate(membership.expiry_date)}</p>
                </>
              )}
            </div>

            {/* PROGRESS */}
            {!isPending && (
              <>
                <div className="mu-progress">
                  <div
                    className="mu-progress-bar"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="mu-progress-info">
                  <span>Validity Remaining</span>
                  <span>{progress}%</span>
                </div>
              </>
            )}
          </div>

          {/* URGENT CARD */}
          {!isPending && !isExpired && (
            <div className="mu-urgent-card">
              <h3>Urgent Action</h3>
              <p>
                Your membership will expire soon. Renew now to avoid
                interruption in competition eligibility and member benefits.
              </p>
              <button className="mu-renew-btn" onClick={() => HandleRenew(membership, daysLeft)}>
                Renew Membership →
              </button>
            </div>
          )}
        </div>

        {/* ================= CREDENTIALS ================= */}
        <div className="mu-credentials">
          <h3>Member Credentials</h3>

          <div className="mu-cred-grid">
            <div>
              <span>User</span>
              <p>{membership.user_name}</p>
            </div>

            <div>
              <span>State</span>
              <p>{membership.state_name}</p>
            </div>

            <div>
              <span>Member Since</span>
              <p>{formatDate(membership.membership_start)}</p>
            </div>

            <div>
              <span>Status</span>
              <p
                className={`mu-status ${
                  isPending ? "orange" : isExpired ? "red" : "green"
                }`}
              >
                ● {status}
              </p>
            </div>

            <div>
              <span>Transaction ID</span>
              <p>{membership.transaction_id}</p>
            </div>

            <div>
              <span>Amount Paid</span>
              <p>RM {membership.amount_paid}</p>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="mu-bottom">
          <div>
            <h3>Renew your current plan or upgrade</h3>
            <p>
              Maintaining active membership is required for all MFSA sanctioned
              events and FINA-standard trials.
            </p>
          </div>

          <div className="mu-actions">
            {isPending ? (
              <button className="mu-disabled-btn">Awaiting Approval</button>
            ) : isExpired ? (
              <button className="mu-renew-btn big">Purchase New</button>
            ) : (
              <button className="mu-renew-btn big" onClick={() => HandleRenew(membership, daysLeft)}>
                Renew Membership
              </button>
            )}

            <button
              className="mu-leave-btn"
              onClick={() => setShowLeaveModal(true)}
            >
              Leave Membership
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AthleteMembershipStatus;
