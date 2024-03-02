import React, { useState, useEffect } from "react";
import axios from "axios";

const TicketList = () => {
  const baseURL = "http://localhost:5174";
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`${baseURL}/tickets`);
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    fetchTickets();

    const intervalId = setInterval(fetchTickets, 1000); // Refrescar cada segundo

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h2 style={{ marginTop: "2rem", fontWeight: "700", fontSize: "1.3rem" }}>
        Current Tickets
      </h2>
      {Array.isArray(tickets) && tickets.length > 0 ? (
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.id} className="savedtickets-container">
              <p className="title">{ticket.title}</p>
              <p className="description">{ticket.description}</p>
              <p className="priority">Priority: {ticket.priority}</p>
              <p className="resolved">
                Resolved: {ticket.resolved ? "Yes" : "No"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="error">No tickets found.</p>
      )}
    </div>
  );
};

export default TicketList;
