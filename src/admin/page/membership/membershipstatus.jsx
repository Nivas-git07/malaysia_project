import Navbar from "../navbar/nav";
import { useParams } from "react-router-dom";
import { getmebershipdetails } from "../../api/membership";
import { useQuery } from "@tanstack/react-query";

function MembershipStatus() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
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

  const daysLeft = getDaysLeft();
  const progress = getProgress();

  const isExpired = daysLeft <= 0;
  const isExpiring = daysLeft > 0 && daysLeft <= 10;

  /* ================= STATES ================= */

  if (isLoading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (isError) return <p style={{ padding: 20 }}>Error loading data</p>;

  return (
    <>
      <Navbar />

      <div className="mu-membership-wrapper">

        {/* Header */}
        <div className="mu-header">
          <h1>Membership</h1>
          <p>Manage and renew your membership</p>
        </div>

        {/* ================= TOP SECTION ================= */}
        <div className="mu-top-section">

          {/* LEFT CARD */}
          <div className="mu-plan-card">
            <div className="mu-plan-header">
              <div>
                <span className="mu-label">CURRENT PLAN</span>
                <h2>{formatPlan(membership.membership_plan)}</h2>
              </div>

              <span
                className={`mu-badge ${
                  isExpired
                    ? "expired"
                    : isExpiring
                    ? "expiring"
                    : "active"
                }`}
              >
                {isExpired
                  ? "Expired"
                  : isExpiring
                  ? "Expiring Soon"
                  : "Active"}
              </span>
            </div>

            <div className="mu-days">
              <h1>
                {isExpired ? 0 : daysLeft} <span>Days Left</span>
              </h1>
              <p>Expires on {formatDate(membership.expiry_date)}</p>
            </div>

            {/* Progress */}
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
          </div>

          {/* RIGHT CARD */}
          {!isExpired && (
            <div className="mu-urgent-card">
              <h3>Urgent Action</h3>
              <p>
                Your membership will expire soon. Renew now to avoid interruption
                in competition eligibility and member benefits.
              </p>
              <button className="mu-renew-btn">
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
                  isExpired ? "red" : "green"
                }`}
              >
                ● {membership.status}
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
            {!isExpired ? (
              <button className="mu-renew-btn big">
                Renew Membership
              </button>
            ) : (
              <button className="mu-renew-btn big">
                Purchase New
              </button>
            )}

            <button className="mu-leave-btn">
              Leave Membership
            </button>
          </div>
        </div>

      </div>
    </>
  );
}

export default MembershipStatus;