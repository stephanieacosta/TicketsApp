import React, { useState } from "react";
import axios from "axios";

const TicketForm = () => {
  const baseURL = "http://localhost:5174";
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [resolved, setResolved] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (title.length < 6 || title.length > 18) {
      errors.title = "Title must be between 6 and 18 characters";
    }
    if (!priority) {
      errors.priority = "Priority is required";
    }
    if (description.length > 30) {
      errors.description = "Description must be no more than 30 characters";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await axios.post(`${baseURL}/tickets`, {
        title,
        priority: parseInt(priority),
        description,
        resolved,
      });

      console.log("Ticket created:", response.data);

      // Clear form
      setTitle("");
      setPriority("");
      setDescription("");
      setResolved(false);
      setErrors({});
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <div className="form-container">
      <h1 style={{ textAlign: "left", fontWeight: "700", fontSize: "1.5rem" }}>
        Add Ticket
      </h1>
      <form onSubmit={handleSubmit} className="form">
        <label>Title</label>
        <input
          type="text"
          value={title}
          placeholder="Add the ticket title"
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <span>{errors.title}</span>}
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Select Priority</option>
          <option value="1">High</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
        </select>
        {errors.priority && <span>{errors.priority}</span>}
        <label>Description</label>
        <textarea
          value={description}
          placeholder="Add the ticket description"
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <span>{errors.description}</span>}
        <div>
          <label>Mark as resolved </label>
          <input
            type="checkbox"
            checked={resolved}
            onChange={(e) => setResolved(e.target.checked)}
            className="checkbox"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TicketForm;
