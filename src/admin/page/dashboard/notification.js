import React, { useState } from "react";
import "../../style/dashboard/notification.css";
import Navbar from "../navbar/nav";
import { getNotifications } from "../../api/notification_api";
import { useQuery } from "@tanstack/react-query";
import Timeage from "../../hook/time/timeage";

export default function AdminNotificationPage() {
    const [activeFilter, setActiveFilter] = useState("ALL");

    const { data, isLoading, error } = useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications,
    });
    const notificationsData = data?.data || [];
    console.log("Notifications Data:", notificationsData);

    const adminNotifications = data?.data || [
        {
            id: 1,
            title: "New Event Registration",
            message: "5 new athletes registered for State Swimming Meet.",
            time: "10 mins ago",
            type: "INFO",
            unread: true,
        },
        {
            id: 2,
            title: "Event Completed",
            message: "Inter College Football Tournament marked as completed.",
            time: "1 hour ago",
            type: "SUCCESS",
            unread: false,
        },
        {
            id: 3,
            title: "System Alert",
            message: "Server backup completed successfully.",
            time: "Yesterday",
            type: "WARNING",
            unread: false,
        },
    ];

    const filteredNotifications =
        activeFilter === "ALL"
            ? notificationsData
            : notificationsData.filter((item) => item.notification_type === activeFilter);

    return (
        <>
            <Navbar />
            <div className="admin-notification-wrapper">
                <div className="adminMainContent">


                    <div className="admin-notification-header">
                        <h2 className="admin-notification-title">Notifications</h2>

                        <div className="admin-notification-filters">
                            {["ALL", "MEMBERSHIP", "REGISTRATION", "REPORT","TICKET"].map((filter) => (
                                <button
                                    key={filter}
                                    className={`admin-notification-filter-btn ${
  activeFilter === filter ? "admin-filter-active" : ""
}`}
                                    onClick={() => setActiveFilter(filter)}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="admin-notification-list">
                        {filteredNotifications.map((item) => (
                            <div
                                key={item.id}
                                className={`admin-notification-card ${item.unread ? "admin-notification-unread" : ""
                                    }`}
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

                                    <p className="admin-notification-message">
                                        {item.message}
                                    </p>
                                </div>

                                {item.is_read && (
                                    <div className="admin-notification-unread-dot"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}