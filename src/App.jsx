import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import LoginForm from "./pages/Login";
import SignupForm from "./pages/SignUp";
import { pageTransition } from "./animation";
import AboutUs from "./pages/AboutUs";
import Malls from "./pages/malls";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./components/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IndividualMall from "./pages/IndividualMall";
import Theater from "./pages/Theater";
import Recharge from "./pages/recharge";
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <motion.div
              key="home-page"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div
              key="login-page"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              <LoginForm />
            </motion.div>
          }
        />
        <Route
          path="/signup"
          element={
            <motion.div
              key="signup-page"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              <SignupForm />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              key="aboutus"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              <AboutUs />
            </motion.div>
          }
        />
        <Route
          path="/recharge"
          element={
            <motion.div
              key="recharge"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              <Recharge />
            </motion.div>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <motion.div
              key="forgot-password"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              <ForgotPassword />
            </motion.div>
          }
        />

        {/* Protected routes */}
        <Route
          path="/malls"
          element={
            <ProtectedRoute>
              <motion.div
                key="malls"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <Malls />
              </motion.div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mall/:mallId/:locationId"
          element={
            <ProtectedRoute>
              <motion.div
                key="individual-mall"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <IndividualMall />
              </motion.div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <motion.div
                key="profile"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <Profile />
              </motion.div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/theaters"
          element={
            <ProtectedRoute>
              <motion.div
                key="theaters"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <Theater />
              </motion.div>
            </ProtectedRoute>
          }
        />

        {/* Redirect all other routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={5000} />
      <Router>
        <AnimatedRoutes />
      </Router>
    </div>
  );
}

export default App;
