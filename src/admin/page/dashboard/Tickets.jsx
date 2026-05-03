import React from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/Tickets.css";
import { useState } from "react";
import { getTickets } from "../../api/ticket";
import { useQuery } from "@tanstack/react-query";
import SkeletonLoader from "../../components/common/SkeletonLoader";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import Timeage from "../../hook/time/timeage";
import TicketResponseModal from "../../components/ticketaccessmodal";

function Tickets() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60,
  });

  const [selectedticket, setSelectedticket] = useState(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const ticket_count = data?.data || 0;

  const tickets = data?.data.data || [];

  console.log("Tickets:", tickets, ticket_count);
  if (isLoading)
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <SkeletonLoader variant="card" count={4} />
        </div>
      </>
    );

  if (error)
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <ErrorState
            title="Unable to load tickets"
            message="Please check your connection and try again."
            onRetry={() => refetch()}
          />
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="mu-membership-wrapper">
        <div className="ticketStatusHeader">TICKET SUPPORT</div>
        <div className="ticketHeader">
          {/* 
          <button className="newTicketBtn">+ New Ticket</button> */}
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="ticketContainer">
          {/* ===== SUMMARY CARDS ===== */}
          <div className="ticketSummary">
            <div className="summaryCard">
              <h2>{ticket_count.all_count || 0}</h2>
              <p>Total Tickets</p>
            </div>

            <div className="summaryCard">
              <h2>{ticket_count.resolved_count || 0}</h2>
              <p>Resolved</p>
            </div>

            <div className="summaryCard">
              <h2>{ticket_count.in_progess_count || 0}</h2>
              <p>In Progress</p>
            </div>

            <div className="summaryCard">
              <h2>{ticket_count.pending_count || 0}</h2>
              <p>Pending</p>
            </div>
          </div>

          {/* ===== STATUS TITLE ===== */}
          <div className="ticketStatusHeader">TICKET STATUS</div>

          {/* ===== TICKET LIST ===== */}
          <div className="ticketList">
            {tickets.length === 0 ? (
              <EmptyState
                title="No tickets found"
                message="There are no support tickets to display right now."
                actionLabel="Retry"
                onAction={() => refetch()}
              />
            ) : (
              tickets.map((ticket) => (
                <div
                  className="ticketItem"
                  key={ticket.id}
                  onClick={() => {
                    setSelectedticket(ticket);
                    setShowPermissionModal(true);
                  }}
                >
                  <div className="ticketInfo">
                    <h4>{ticket.problem}</h4>
                    <p>
                      {ticket.message} ·{" "}
                      <Timeage timestamp={ticket.created_at} />
                    </p>
                  </div>
                  <span
                    className={`mfsaStatusBadgeX ${
                      ticket.status === "RESOLVED"
                        ? "mfsaStatusResolvedX"
                        : ticket.status === "IN_PROGRESS"
                          ? "mfsaStatusProgressX"
                          : "mfsaStatusPendingX"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
              ))
            )}
            {showPermissionModal && (
              <TicketResponseModal
                ticket={selectedticket}
                onClose={() => setShowPermissionModal(false)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tickets;
