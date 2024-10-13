import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import LoginForm from "./pages/Login";
import SignupForm from "./pages/SignUp";
import { pageTransition } from "./animation";
import AboutUs from "./pages/AboutUs";
import Malls from "./pages/malls";
import ProtectedRoute from "./components/ProtectedRoute";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
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
          path="/malls"
          element={
            <motion.div
              key="aboutus"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              <Malls />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
