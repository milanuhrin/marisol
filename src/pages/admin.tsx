import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";

const Admin = () => {
  const [token, setToken] = useState<string | null>(null);
  const [reservedDates, setReservedDates] = useState<string[]>([]);
  const [newCheckIn, setNewCheckIn] = useState("");
  const [newCheckOut, setNewCheckOut] = useState("");

  // 🟢 Check if user is logged in
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      setToken(storedToken);
      fetchReservedDates(storedToken);
    }
  }, []);

  // 🟢 Fetch reserved dates
  const fetchReservedDates = async (authToken: string) => {
    try {
      const response = await fetch("https://your-api-endpoint/get-reserved-dates", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await response.json();
      setReservedDates(data);
    } catch (error) {
      console.error("Error fetching dates:", error);
    }
  };

  // 🟢 Add reservation
  const addReservation = async () => {
    if (!newCheckIn || !newCheckOut) return;
    
    try {
      const response = await fetch("https://your-api-endpoint/add-reserved-date", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ checkIn: newCheckIn, checkOut: newCheckOut }),
      });

      if (response.ok) {
        setReservedDates([...reservedDates, newCheckIn, newCheckOut]);
        setNewCheckIn("");
        setNewCheckOut("");
      } else {
        console.error("Failed to add reservation");
      }
    } catch (error) {
      console.error("Error adding reservation:", error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Rezervovať termíny</h2>

      <div className="reservation-form">
        <label>Check-in:</label>
        <input type="date" value={newCheckIn} onChange={(e) => setNewCheckIn(e.target.value)} required />

        <label>Check-out:</label>
        <input type="date" value={newCheckOut} onChange={(e) => setNewCheckOut(e.target.value)} required />

        <button onClick={addReservation}>Rezervovať</button>
      </div>

      <h3>Existujúce rezervácie:</h3>
      <ul>
        {reservedDates.map((date, index) => (
          <li key={index}>{date}</li>
        ))}
      </ul>

      <style>{`
        .admin-container {
          max-width: 400px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          text-align: center;
          background: #fff;
        }
        .reservation-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        input, button {
          padding: 8px;
          font-size: 16px;
        }
        button {
          background: #007bff;
          color: white;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Admin;