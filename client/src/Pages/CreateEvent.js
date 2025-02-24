import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    image: null,
    tickets: {
      regular: { price: "", quantity: "" },
      advanced: { price: "", quantity: "" },
      vip: { price: "", quantity: "" },
    },
  });

  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [userRole, setUserRole] = useState("");
   let [onLogin,user] = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
    

        if (user.role !== "Organizer") {
          alert("Access denied! Only organizers can create events.");
          navigate("/");
        }
      } catch (err) {
        console.error("Error fetching user:", err.message);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setEventData({ ...eventData, [name]: e.target.files[0] });
    } else {
      setEventData({ ...eventData, [name]: value });
    }
  };

  const handleTicketChange = (e, category) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      tickets: {
        ...eventData.tickets,
        [category]: { ...eventData.tickets[category], [name]: name === "price" ? `$${value}` : value.replace(/[^0-9]/g, "") },
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError("");

    if (userRole !== "Organizer") {
      setError("You do not have permission to create an event.");
      setUploading(false);
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(eventData).forEach((key) => {
        if (key !== "tickets") {
          formData.append(key, eventData[key]);
        }
      });
      formData.append("tickets", JSON.stringify(eventData.tickets));

      const response = await fetch("https://your-backend.com/api/events", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) throw new Error("Event creation failed.");
      const createdEvent = await response.json();
      alert("Event created successfully!");
      navigate(`/events/${createdEvent.id}`);
    } catch (err) {
      setError(err.message);
    }
    setUploading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 bg-gradient-to-br from-blue-600 to-purple-700 p-8">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">Create an Event</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" name="name" placeholder="Event Name" value={eventData.name} onChange={handleChange} required className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400" />
          <textarea name="description" placeholder="Description" value={eventData.description} onChange={handleChange} required className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 resize-none h-32" />
          <div className="grid grid-cols-2 gap-4">
            <input type="date" name="date" value={eventData.date} onChange={handleChange} required className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400" />
            <input type="time" name="time" value={eventData.time} onChange={handleChange} required className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400" />
          </div>
          <input type="text" name="location" placeholder="Location" value={eventData.location} onChange={handleChange} required className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400" />
          <input type="file" name="image" accept="image/*" onChange={handleChange} required className="w-full px-4 py-3 border rounded-lg shadow-sm bg-white" />

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-800">Ticket Pricing</h3>
            {Object.keys(eventData.tickets).map((category) => (
              <div key={category} className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="price"
                  placeholder={`${category.charAt(0).toUpperCase() + category.slice(1)} Price`}
                  value={eventData.tickets[category].price}
                  onChange={(e) => handleTicketChange(e, category)}
                  className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  name="quantity"
                  placeholder={`${category.charAt(0).toUpperCase() + category.slice(1)} Quantity`}
                  value={eventData.tickets[category].quantity}
                  onChange={(e) => handleTicketChange(e, category)}
                  className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
          </div>

          <button type="submit" disabled={uploading} className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all shadow-md">
            {uploading ? "Creating Event..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
