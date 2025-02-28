import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function MyEventCard({ name, location, id, time,description,image,date }) {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let [onLogin, user, check_session] = useOutletContext();
  
    
  
  const validationSchema = yup.object().shape({
    eventName: yup.string().required("Event name is required"),
    location: yup.string().required("Location is required"),
    date: yup.string().required("Date is required"),
  });

  
  const formik = useFormik({
    initialValues: {
      eventName: name,
      location: location,
      date: date,
      time: time,
      description: description,
      image: null, 
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setErrors([]);
  
      const formData = new FormData();
      formData.append("name", values.eventName);
      formData.append("description", values.description);
      formData.append("location", values.location);
      formData.append("date", values.date);
      formData.append("time", values.time);
      
      if (values.image) {
        formData.append("image", values.image);
      }
  
      try {
        const response = await fetch(`/events/${id}`, {
          method: "PATCH",
          body: formData, 
        });
  
        if (!response.ok) throw new Error("Failed to update event");
  
        const data = await response.json();
        //console.log("Update successful:", data);
        setIsEditing(false);
        check_session(localStorage.getItem("jwt")); 
      } catch (error) {
        setErrors([error.message]);
      } finally {
        setIsLoading(false);
      }
    },
  });
  
 
  const handleFileChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };
  function handleDelete() {
    fetch(`events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() =>check_session(localStorage.getItem("jwt")));
  }

  return (
    <div style={{  borderRadius: "10px" }}>
      <h1>Event Details:</h1>
      <h2>{name}</h2>
      <h6>{description}</h6>
      <h6>{location}</h6>
      <h6>{date}</h6>
      <h6>{time}</h6>
      <img src={image.image} alt="Event" style={{width:"50px"}}  />
      <Link to={`/events/${id}`}>
        <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"  style={{ marginBottom: "10px" }}>
          View More Details
        </button>
      </Link>
      <br />
      {isEditing ? (
        <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"  style={{ marginRight: "10px" }} onClick={() => setIsEditing(!isEditing)}>
          Cancel
        </button>
      ) : (
        <>
        <button className=" bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"  style={{ marginRight: "10px" }} onClick={() => setIsEditing(!isEditing)}>
          Edit
        </button>
        <br></br><br></br>
        </>
      )}
      <button className=" bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"  onClick={handleDelete}>
        Delete
      </button>

      {isEditing && (
       
          <form style={{maxHeight:"1000px"}}onSubmit={formik.handleSubmit}>
            
              <label htmlFor="eventName">Event Name</label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                autoComplete="off"
                className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                value={formik.values.eventName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.eventName && formik.errors.eventName && <p>{formik.errors.eventName}</p>}
            
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                className=" px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                autoComplete="off"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description && <p>{formik.errors.description}</p>}
            
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                autoComplete="off"
                className=" px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.location && formik.errors.location && <p>{formik.errors.location}</p>}
            

           
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                autoComplete="off"
                className=" px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.date && formik.errors.date && <p>{formik.errors.date}</p>}

              <label htmlFor="time">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                autoComplete="off"
                className=" px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                value={formik.values.time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.time && formik.errors.time && <p>{formik.errors.time}</p>}

              <label htmlFor="time">image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className=" px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.image && formik.errors.image && <p>{formik.errors.image}</p>}
            
            
            

            
              <button className=" bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"  variant="fill" color="primary" type="submit">
                {isLoading ? "Loading..." : "Submit"}
              </button>
            

            {errors.length > 0 && (
              <div> {errors.map((err) => (
                  <p >{err}</p>
                ))}</div>
               
              
            )}
          </form>
        
      )}
    </div>
  );
}

export default MyEventCard;

