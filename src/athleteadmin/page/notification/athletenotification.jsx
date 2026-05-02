import React, { useState } from "react";
import AthleteNavbar from "../../layout/athletenavbar";
import { getNotifications } from "../../../admin/api/notification_api";
import { useQuery } from "@tanstack/react-query";
import Timeage from "../../../admin/hook/time/timeage";
import SkeletonLoader from "../../components/common/SkeletonLoader";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";

export default function AthleteNotificationPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    retry: false,
  });
  const notificationsData = data?.data || [];
  console.log("Notifications Data:", notificationsData);

  const filteredNotifications =
    activeFilter === "ALL"
      ? notificationsData
      : notificationsData.filter(
          (item) => item.notification_type === activeFilter,
        );

  if (isLoading) {
    return (
      <>
        <AthleteNavbar />
        <div className="mu-membership-wrapper">
          <SkeletonLoader variant="card" count={4} />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AthleteNavbar />
        <div className="mu-membership-wrapper">
          <ErrorState
            title="Unable to load notifications"
            message="Please check your connection and try again."
            onRetry={() => refetch()}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <AthleteNavbar />
      <div className="admin-notification-wrapper">
        <div className="admin-notification-header">
          <h2 className="admin-notification-title">Notifications</h2>

          <div className="admin-notification-filters">
            {["ALL", "MEMBERSHIP", "REGISTRATION", "REPORT", "TICKET"].map(
              (filter) => (
                <button
                  key={filter}
                  className={`admin-notification-filter-btn ${
                    activeFilter === filter ? "admin-filter-active" : ""
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="admin-notification-list">
          {filteredNotifications.length === 0 ? (
            <EmptyState
              title="No notifications"
              message="No notifications match your current filter."
              actionLabel="Retry"
              onAction={() => refetch()}
            />
          ) : (
            filteredNotifications.map((item) => (
              <div
                key={item.id}
                className={`admin-notification-card ${item.unread ? "admin-notification-unread" : ""}`}
              >
                <div className="admin-notification-left-strip"></div>

                <div className="admin-notification-body">
                  <div className="admin-notification-top">
                    <h4 className="admin-notification-card-title">
                      {item.notification_type}
                    </h4>
                    <span className="admin-notification-time">
                      <Timeage timestamp={item.created_at} />
                    </span>
                  </div>

                  <p className="admin-notification-message">{item.message}</p>
                </div>

                {item.is_read && (
                  <div className="admin-notification-unread-dot"></div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
