import React from "react";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import "./App.css";

const App = () => {
  return (
    <div className="global-container">
      <TicketForm />
      <TicketList />
    </div>
  );
};

export default App;
