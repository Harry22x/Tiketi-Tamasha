"use client";
import { useState, useEffect } from "react";
import { auth, db, storage } from "./FireBase";
import { updateProfile, updatePassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { useNavigate } from "react-router-dom"; // React Router's useNavigate for navigation
import LogoutButton from "./LogoutPage";

export default function ProfilePage() {
  const [userData, setUserData] = useState({ name: "", email: "", role: "", profilePic: "" });
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate(); // useNavigate from react-router-dom

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) {
        navigate("/login"); // Redirect to login if user is not logged in
        return;
      }
      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData(data);
          setNewName(data.name);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, [navigate]); // Re-run useEffect if navigate changes

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      if (newName !== userData.name) {
        await updateProfile(auth.currentUser, { displayName: newName });
        await updateDoc(doc(db, "users", auth.currentUser.uid), { name: newName });
        setUserData((prev) => ({ ...prev, name: newName }));
      }

      if (newPassword.length > 0) {
        await updatePassword(auth.currentUser, newPassword);
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile Update Error:", error.message);
      alert("Failed to update profile: " + error.message);
    }
    setLoading(false);
  };

  const handleUploadImage = async () => {
    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: Add progress tracking here
        },
        (error) => {
          console.error("Upload Error:", error.message);
          alert("Image upload failed.");
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Update Firestore with the new profile picture URL
          await updateDoc(doc(db, "users", auth.currentUser.uid), { profilePic: downloadURL });
          setUserData((prev) => ({ ...prev, profilePic: downloadURL }));

          alert("Profile picture updated!");
          setUploading(false);
        }
      );
    } catch (error) {
      console.error("Image Upload Error:", error.message);
      alert("Failed to upload image.");
      setUploading(false);
    }
  };

  const handleRemoveProfilePicture = async () => {
    if (!userData.profilePic) {
      alert("No profile picture to remove.");
      return;
    }

    if (!window.confirm("Are you sure you want to remove your profile picture?")) {
      return;
    }

    try {
      const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
      await deleteObject(storageRef);
      await updateDoc(doc(db, "users", auth.currentUser.uid), { profilePic: "" });
      setUserData((prev) => ({ ...prev, profilePic: "" }));

      alert("Profile picture removed successfully.");
    } catch (error) {
      console.error("Remove Picture Error:", error.message);
      alert("Failed to remove profile picture: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Profile Settings</h2>

        <div className="mt-4 flex flex-col items-center">
          {userData.profilePic ? (
            <>
              <img src={userData.profilePic} alt="Profile" className="w-24 h-24 rounded-full border border-gray-300" />
              <button
                onClick={handleRemoveProfilePicture}
                disabled={uploading}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                {uploading ? "Removing..." : "Remove Picture"}
              </button>
            </>
          ) : (
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
              No Image
            </div>
          )}
          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} className="mt-2" />
          <button onClick={handleUploadImage} disabled={uploading} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        <div className="mt-4">
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Role:</strong> {userData.role}</p>
        </div>

        <div className="mt-4">
          <label className="block font-bold">Full Name</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mt-4">
          <label className="block font-bold">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleUpdateProfile}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>

        <div className="mt-4 text-center">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
