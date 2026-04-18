import React from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/Tickets.css";
import { getTickets } from "../../api/ticket";
import { useQuery } from "@tanstack/react-query";
function Tickets() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
    refetchOnWindowFocus: false,
    retry: false,
  });
  console.log(data, isLoading, error);
  const ticket_count = data?.data || 0;
  const tickets = data?.data.data || [];

  console.log("Tickets:", tickets);
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
              <h2>{ticket_count.in_progress_count || 0}</h2>
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
            {tickets.map((ticket) => (
              <div className="ticketItem" key={ticket.id}>
                <div className="ticketInfo">
                  <h4>{ticket.note}</h4>
                  <p>{ticket.email_id} · 06 Aug 2025</p>
                </div>
                <span
                  className={`status ${ticket.status === "Resolved" ? "resolvedGreen" : ticket.status === "In Progress" ? "inProgressYellow" : "pendingRed"}`}
                >
                  • Pending
                </span>
              </div>
            ))}

            {/* <div className="ticketItem">
              <div className="ticketInfo">
                <h4>Cannot Upload Profile Photo</h4>
                <p>maya@example.com · 06 Aug 2025</p>
              </div>
              <span className="status pendingRed">• Pending</span>
            </div>

            <div className="ticketItem">
              <div className="ticketInfo">
                <h4>Payment Receipt Not Verified</h4>
                <p>maya@example.com · 06 Aug 2025</p>
              </div>
              <span className="status pendingGreen">• Pending</span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tickets;
