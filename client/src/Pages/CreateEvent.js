import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    id: "",
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    image: null,
  });

  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [userRole, setUserRole] = useState(""); // Track user role
  const navigate = useNavigate();

  // 🔹 Fetch logged-in user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://your-backend.com/api/user", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          navigate("/login");
          return;
        }

        const user = await response.json();
        setUserRole(user.role);

        if (user.role !== "organizer") {
          alert("Access denied! Only organizers can create events.");
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Error fetching user:", err.message);
      }
    };

    fetchUser();
  }, [navigate]);

  // 🔹 Handle form input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setEventData({ ...eventData, [name]: e.target.files[0] });
    } else {
      setEventData({ ...eventData, [name]: value });
    }
  };

  // 🔹 Handle event creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      Object.keys(eventData).forEach((key) => {
        formData.append(key, eventData[key]);
      });

      const response = await fetch("https://your-backend.com/api/events", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) throw new Error("Event creation failed.");
      alert("Event created successfully!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
    setUploading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create an Event</h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          {/* Event ID */}
          <div>
            <label className="block text-gray-700 font-medium">Event ID</label>
            <input
              type="text"
              name="id"
              placeholder="Enter event ID"
              value={eventData.id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Event Name */}
          <div>
            <label className="block text-gray-700 font-medium">Event Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter event name"
              value={eventData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Event Description */}
          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Describe the event"
              value={eventData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 resize-none h-24"
            />
          </div>

          {/* Event Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Time</label>
              <input
                type="time"
                name="time"
                value={eventData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter event location"
              value={eventData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Event Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium">Upload Event Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg bg-white"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all font-semibold"
          >
            {uploading ? "Creating Event..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
