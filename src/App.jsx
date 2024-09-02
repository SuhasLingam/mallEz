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
import AccountForm from "./pages/SignUp";

const pageTransition = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
  transition: { duration: 0.3 },
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              key="home" // Use a static key for Home page
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
          path="/signup"
          element={
            <motion.div
              key="signup" // Use a static key for Signup page
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              <AccountForm />
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div
              key="login" // Use a static key for Login page
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              <LoginForm />
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
