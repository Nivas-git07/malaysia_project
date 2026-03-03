import React, { useState } from "react";
import "../../style/dashboard/notification.css";
import Navbar from "../navbar/nav";
export default function AdminNotificationPage() {
    const [activeFilter, setActiveFilter] = useState("ALL");

    const adminNotifications = [
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
            ? adminNotifications
            : adminNotifications.filter((item) => item.type === activeFilter);

    return (
        <>
            <Navbar />
            <div className="admin-notification-wrapper">
                <div className="adminMainContent">


                    <div className="admin-notification-header">
                        <h2 className="admin-notification-title">Notifications</h2>

                        <div className="admin-notification-filters">
                            {["ALL", "INFO", "SUCCESS", "WARNING"].map((filter) => (
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
                                            {item.title}
                                        </h4>
                                        <span className="admin-notification-time">
                                            {item.time}
                                        </span>
                                    </div>

                                    <p className="admin-notification-message">
                                        {item.message}
                                    </p>
                                </div>

                                {item.unread && (
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