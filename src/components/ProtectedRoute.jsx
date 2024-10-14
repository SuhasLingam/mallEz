import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-mainBackgroundColor">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-mainBackgroundColor">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="mb-8 text-9xl font-bold text-mainTextColor">
            Access Restricted
          </p>
          <p className="mb-8 text-5xl font-semibold text-mainTextColor">
            Please log in to view this page.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded bg-blue-500 px-11 py-5 text-4xl font-bold text-white hover:bg-blue-700"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Go to Login
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
