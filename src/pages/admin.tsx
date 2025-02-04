import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin: React.FC = () => {
  const navigate = typeof window !== "undefined" ? useNavigate() : () => {}; // Avoid error during Gatsby build
  const [reservedDates, setReservedDates] = useState<string[]>([]);
  const [newDate, setNewDate] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure this runs only in the browser

    console.log("✅ Admin page loaded!");

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    fetch("/api/get-reserved-dates", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("📅 Reserved dates received:", data);
        setReservedDates(data);
      })
      .catch((error) => console.error("❌ Error fetching reserved dates:", error));
  }, [navigate]);

  const addDate = async () => {
    if (typeof window === "undefined") return; // Ensure this runs only in the browser

    const token = localStorage.getItem("token");
    if (!token) return;

    await fetch("/api/add-reserved-date", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ date: newDate }),
    });

    setReservedDates([...reservedDates, newDate]);
  };

  return (
    <div>
      <h2>🗓 Rezervovať termíny</h2>
      <input type="date" onChange={(e) => setNewDate(e.target.value)} />
      <button onClick={addDate}>Rezervovať</button>

      <h3>📅 Rezervované termíny</h3>
      <ul>
        {reservedDates.map((date) => (
          <li key={date}>{date}</li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;