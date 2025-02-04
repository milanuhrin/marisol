import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [reservedDates, setReservedDates] = useState<string[]>([]);
  const [newDate, setNewDate] = useState<string>("");

  useEffect(() => {
    console.log("✅ Admin page loaded!"); // Debug message

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
      });
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