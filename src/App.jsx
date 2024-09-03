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

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/login"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
              key={location.pathname} // Use pathname to ensure key uniqueness
            >
              <LoginForm />
            </motion.div>
          }
        />
        <Route
          path="/signup"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
              key={location.pathname} // Use pathname to ensure key uniqueness
            >
              <SignupForm />
            </motion.div>
          }
        />
        <Route
          path="/"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
              key={location.pathname} // Use pathname to ensure key uniqueness
            >
              <Home />
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
