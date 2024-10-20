import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  updateEmail,
  updateProfile,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { motion } from "framer-motion";
import ProfileComponent from "../components/ProfileComponent";
import Navbar from "../components/navbar";
import { sendPasswordReset } from "../firebase/auth";
import { getUserData, updateUser } from "../firebaseOperations";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [vehicleNumbers, setVehicleNumbers] = useState([]);
  const [newVehicle, setNewVehicle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [editField, setEditField] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserData(currentUser);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (currentUser) => {
    try {
      const data = await getUserData("user", currentUser.uid);
      if (data) {
        setUserData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: currentUser.email || "",
          phoneNumber: data.phoneNumber || "",
        });
        setVehicleNumbers(data.vehicleNumbers || []);
      } else {
        // If user document doesn't exist, create it with default values
        const defaultData = {
          firstName: "",
          lastName: "",
          phoneNumber: "",
          vehicleNumbers: [],
          role: "user",
        };
        await updateUser("user", currentUser.uid, defaultData);
        setUserData({
          ...defaultData,
          email: currentUser.email || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setMessage("Error fetching user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateField = async (field) => {
    setMessage("");
    setLoading(true);

    try {
      if (!user) {
        throw new Error("User not authenticated");
      }

      await updateUser("user", user.uid, { [field]: userData[field] });

      if (field === "email") {
        await updateEmail(user, userData.email);
        await sendEmailVerification(user);
        setMessage("Email updated. Please check your inbox for verification.");
      } else if (field === "firstName" || field === "lastName") {
        await updateProfile(user, {
          displayName: `${userData.firstName} ${userData.lastName}`,
        });
      }

      setMessage(
        `${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`,
      );
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      setMessage(`Error updating ${field}: ${error.message}`);
    } finally {
      setLoading(false);
      setEditField(null);
    }
  };

  const handleAddVehicle = async () => {
    if (newVehicle && !vehicleNumbers.includes(newVehicle)) {
      try {
        const updatedVehicleNumbers = [...vehicleNumbers, newVehicle];
        await updateUser("user", user.uid, {
          vehicleNumbers: updatedVehicleNumbers,
        });
        setVehicleNumbers(updatedVehicleNumbers);
        setNewVehicle("");
        setMessage("Vehicle number added successfully!");
      } catch (error) {
        console.error("Error adding vehicle number:", error);
        setMessage(`Error adding vehicle number: ${error.message}`);
      }
    }
  };

  const handleRemoveVehicle = async (vehicle) => {
    try {
      const updatedVehicleNumbers = vehicleNumbers.filter((v) => v !== vehicle);
      await updateUser("user", user.uid, {
        vehicleNumbers: updatedVehicleNumbers,
      });
      setVehicleNumbers(updatedVehicleNumbers);
      setMessage("Vehicle number removed successfully!");
    } catch (error) {
      console.error("Error removing vehicle number:", error);
      setMessage(`Error removing vehicle number: ${error.message}`);
    }
  };

  const handleEdit = (field, value) => {
    setUserData({ ...userData, [field]: value });
    setEditField(field);
  };

  const handleChangePassword = async () => {
    setMessage("");
    setLoading(true);

    try {
      if (!user || !user.email) {
        throw new Error("User email not available");
      }

      const result = await sendPasswordReset(user.email);
      setMessage(result);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setMessage(`Error sending password reset email: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-mainBackground flex h-screen items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-white"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-mainBackground flex h-screen items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-white"
        >
          Please log in to view your profile.
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mainBackgroundColor">
      <Navbar />
      <div className="container mx-auto max-w-2xl p-4 sm:p-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-center text-3xl font-bold text-mainTextColor sm:mb-8 sm:text-4xl"
        >
          User Profile
        </motion.h1>
        <ProfileComponent
          userData={userData}
          editField={editField}
          onEdit={handleEdit}
          onUpdate={handleUpdateField}
          vehicleNumbers={vehicleNumbers}
          onRemoveVehicle={handleRemoveVehicle}
          newVehicle={newVehicle}
          setNewVehicle={setNewVehicle}
          onAddVehicle={handleAddVehicle}
          message={message}
          onChangePassword={handleChangePassword}
        />
      </div>
    </div>
  );
};

export default Profile;
