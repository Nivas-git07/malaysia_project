import Navbar from "../navbar/nav";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import { get_purchased_membership } from "../../api/membership";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
function MembershipALLStatus() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["purchased-memberships"],
    queryFn: get_purchased_membership,
  });

  const memberships = data?.data || [];

 

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

  const getDaysLeft = (expiry) => {
    const today = new Date();
    const exp = new Date(expiry);
    return Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
  };



  // if (isLoading) return <p style={{ padding: 20 }}>Loading...</p>;
  // if (isError) return <p style={{ padding: 20 }}>Error loading data</p>;

  return (
    <>
      <Navbar />

      <div className="mu-membership-wrapper">
        <div className="ms-wrapper">

         
          <div className="ms-header">
            <div>
              <h1>My Memberships</h1>
              <p>View and manage all your purchased memberships</p>
            </div>

            <button className="ms-add-btn" onClick={() => navigate("/admin/membershippurchase")}>
              <FaPlus /> Add New Membership
            </button>
          </div>

         
          {/* {memberships.length === 0 && (
            <p style={{ marginTop: 20 }}>No memberships found</p>
          )} */}

          {memberships.map((item) => {
            const daysLeft = getDaysLeft(item.expiry_date);

            const isExpired = daysLeft <= 0;
            const isExpiring = daysLeft > 0 && daysLeft <= 10;
            const isActive = daysLeft > 10;

            return (
              <div
                key={item.membership_id}
                className={`ms-card 
                  ${isActive ? "ms-active" : ""} 
                  ${isExpired ? "ms-disabled" : ""}
                `}
              >
                {isActive && <div className="ms-bar"></div>}

                <div className="ms-card-content">

          
                  <div className="ms-info">
                    <h2>{formatPlan(item.membership_plan)}</h2>

                    <div className="ms-grid">
                      <div>
                        <span>MEMBER ID</span>
                        <p>{item.membership_id.slice(0, 12)}...</p>
                      </div>

                      <div>
                        <span>STATE</span>
                        <p>{item.state_name || "-"}</p>
                      </div>

                      <div>
                        <span>EXPIRY DATE</span>
                        <p>{formatDate(item.expiry_date)}</p>
                      </div>

                      <div>
                        <span>STATUS</span>
                        <p className={isExpiring || isExpired ? "ms-red" : ""}>
                          {isExpired
                            ? "Expired"
                            : `${daysLeft} Days Left`}
                        </p>
                      </div>
                    </div>
                  </div>

           
                  <div className="ms-actions">

                  
                    <span
                      className={`ms-badge ${
                        isExpired
                          ? "red"
                          : isExpiring
                          ? "orange"
                          : "green"
                      }`}
                    >
                      {isExpired
                        ? "EXPIRED"
                        : isExpiring
                        ? "EXPIRING SOON"
                        : "ACTIVE"}
                    </span>

                    {/* BUTTONS */}
                    <button className="ms-outline-btn">
                      View Details
                    </button>

                    {isExpired ? (
                      <button className="ms-disabled-btn">
                        Purchase New
                      </button>
                    ) : (
                      <button className="ms-primary-btn">
                        {isExpiring ? "Renew" : "Renew Now"}
                      </button>
                    )}

                    <FaEllipsisV />
                  </div>
                </div>
              </div>
            );
          })}

          
          <div className="ms-bottom">

            <div className="ms-benefits">
              <h3>
                Unlock your competitive edge with MFSA National Sanctioning
              </h3>

              <ul>
                <li>National ranking participation</li>
                <li>Insurance coverage for all sanctioned events</li>
                <li>Exclusive access to technical workshops</li>
              </ul>

              <button>View Full Rulebook</button>
            </div>

            <div className="ms-help">
              <div className="ms-help-icon">?</div>
              <h4>Need Assistance?</h4>
              <p>
                Our support team is available 24/7 to help with your membership
                renewal or technical issues.
              </p>
              <span>Contact Support →</span>
            </div>

          </div>

          {/* FLOAT BUTTON
          <div className="ms-float-btn">
            <FaPlus />
          </div> */}

        </div>
      </div>
    </>
  );
}

export default MembershipALLStatus;