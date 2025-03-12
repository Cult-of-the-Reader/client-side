import { useState, useEffect } from "react";
import api from "../services/api";
import ProfileForm from "../components/Profile/ProfileForm.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

const Profile = () => {
  const { user } = useAuth();
  const token = user?.token

  const [userData, setUserData] = useState({
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
    country: "",
    postalCode: "",
    city: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.getProfile(token);
        const data = await response.json();
        setUserData({
          user: data.user || "user",
          phoneNumber: data.phoneNumber || "",
          dateOfBirth: data.dateOfBirth || "",
          address: data.address || "",
          country: data.country || "",
          postalCode: data.postalCode || "",
          city: data.city || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;
    try {
      const response = await api.putProfile(token, userData);
      if (response.message) {
        setIsEditing(false);
      } else {
        console.error("Error updating profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <ProfileForm
        userData={userData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </>
  );
};

export default Profile; 