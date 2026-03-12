import React from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/Tickets.css";

function Tickets() {
  return (
    <>
      <Navbar />
      <div className="mu-membership-wrapper">
        
   
        <div className="ticketHeader">
          <div className="AthleteTicket">TICKET SUPPORT</div>

          <button className="newTicketBtn">+ New Ticket</button>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="ticketContainer">
          {/* ===== SUMMARY CARDS ===== */}
          <div className="ticketSummary">
            <div className="summaryCard">
              <h2>124</h2>
              <p>Total Tickets</p>
            </div>

            <div className="summaryCard">
              <h2>56</h2>
              <p>Resolved</p>
            </div>

            <div className="summaryCard">
              <h2>42</h2>
              <p>In Progress</p>
            </div>

            <div className="summaryCard">
              <h2>26</h2>
              <p>Pending</p>
            </div>
          </div>

          {/* ===== STATUS TITLE ===== */}
          <div className="ticketStatusHeader">TICKET STATUS</div>

          {/* ===== TICKET LIST ===== */}
          <div className="ticketList">
            <div className="ticketItem">
              <div className="ticketInfo">
                <h4>Login Not Working</h4>
                <p>john@example.com · 07 Aug 2025</p>
              </div>

              <span className="status pendingYellow">• Pending</span>
            </div>

            <div className="ticketItem">
              <div className="ticketInfo">
                <h4>Payment Receipt Not Verified</h4>
                <p>maya@example.com · 06 Aug 2025</p>
              </div>
              <span className="status pendingGreen">• Pending</span>
            </div>

            <div className="ticketItem">
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
            </div>
          </div>
        </div>
    </div>
    </>
  );
}

export default Tickets;
