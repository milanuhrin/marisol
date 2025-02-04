import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin: React.FC = () => {
  // ✅ Ensure `useNavigate` does not break Gatsby SSR
  const navigate = typeof window !== "undefined" ? useNavigate() : () => {};
  const [reservedDates, setReservedDates] = useState<string[]>([]);
  const [newDate, setNewDate] = useState<string>("");
  const [loading, setLoading] = useState(true); // ✅ Loading state

  useEffect(() => {
    if (typeof window === "undefined") return; // ✅ Ensure this runs only in the browser

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // ✅ Redirect to login if not authenticated
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/get-reserved-dates`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("📅 Reserved dates received:", data);
        setReservedDates(data);
      })
      .catch((error) => console.error("❌ Error fetching reserved dates:", error))
      .finally(() => setLoading(false)); // ✅ Hide loading after fetching
  }, [navigate]);

  const addDate = async () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch(`${process.env.REACT_APP_API_URL}/add-reserved-date`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ date: newDate }),
    });

    if (response.ok) {
      setReservedDates([...reservedDates, newDate]);
    } else {
      console.error("❌ Failed to add reservation");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center">🗓 Rezervovať termíny</h2>

      {loading ? (
        <p className="text-center text-gray-500">🔄 Načítavam...</p>
      ) : (
        <>
          <div className="flex flex-col gap-4 mt-4">
            <input 
              type="date" 
              onChange={(e) => setNewDate(e.target.value)}
              className="border rounded-md px-3 py-2"
            />
            <button 
              onClick={addDate} 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Rezervovať
            </button>
          </div>

          <h3 className="text-xl mt-6">📅 Rezervované termíny</h3>
          <ul className="list-disc pl-6">
            {reservedDates.map((date) => (
              <li key={date}>{date}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Admin;