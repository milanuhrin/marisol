import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin: React.FC = () => {
  const [reservedDates, setReservedDates] = useState<string[]>([]);
  const [newDate, setNewDate] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  // ✅ Ensure useNavigate() is only used in the browser
  let navigate: any = () => {};
  if (typeof window !== "undefined") {
    navigate = useNavigate();
  }

  useEffect(() => {
    setIsClient(true); // ✅ Prevent SSR issues by ensuring it's client-side

    if (typeof window === "undefined") return; // Stop execution on SSR

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("/api/get-reserved-dates", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setReservedDates(data))
      .catch((error) => console.error("❌ Error fetching reserved dates:", error));
  }, [navigate]);

  const addDate = async () => {
    if (!isClient) return; // ✅ Prevent SSR errors

    const token = localStorage.getItem("token");
    if (!token) return;

    await fetch("/api/add-reserved-date", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ date: newDate }),
    });

    setReservedDates([...reservedDates, newDate]);
  };

  if (!isClient) return null; // ✅ Prevent Gatsby from breaking during SSR

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