import React, { useState, useEffect } from "react";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import "./App.css";

const App = () => {
  const baseURL = "http://localhost:5174";
  const [tickets, setTickets] = useState([]);

  return (
    <div className="global-container">
      <TicketForm baseURL={baseURL} setTickets={setTickets} />
      <TicketList baseURL={baseURL} tickets={tickets} setTickets={setTickets} />
    </div>
  );
};

export default App;
