import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { supabase } from "./supabaseClient";
import LoginForm from "./pages/Login";
import AccountForm from "./pages/SignUp";
import Home from "./pages/Home";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!session ? <LoginForm /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!session ? <AccountForm /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={session ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
