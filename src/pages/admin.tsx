import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin: React.FC = () => {
  const navigate = typeof window !== "undefined" ? useNavigate() : () => {}; // Prevents SSR error
  const [reservedDates, setReservedDates] = useState<string[]>([]);
  const [newDate, setNewDate] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevent SSR from running

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    fetch("/api/get-reserved-dates", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setReservedDates(data));
  }, [navigate]);

  const addDate = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    await fetch("/api/add-reserved-date", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ date: newDate }),
    });

    setReservedDates([...reservedDates, newDate]);
  };

  const removeDate = async (date: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    await fetch("/api/remove-reserved-date", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ date }),
    });

    setReservedDates(reservedDates.filter((d) => d !== date));
  };

  if (typeof window === "undefined") return null; // Prevent SSR from rendering

  return (
    <div>
      <h2>Správa rezervácií</h2>
      <ul>
        {reservedDates.map((date) => (
          <li key={date}>
            {date} <button onClick={() => removeDate(date)}>Odstrániť</button>
          </li>
        ))}
      </ul>
      <input type="date" onChange={(e) => setNewDate(e.target.value)} />
      <button onClick={addDate}>Pridať dátum</button>
    </div>
  );
};

export default Admin;