import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Auth from "./Auth";
import Signup from "./Signup";
import UserProfile from "./UserProfile";

function AIChatHistory() {
  const [session, setSession] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleLogin = () => {
    // Refresh the session after login
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  };

  const handleSignup = () => {
    setShowSignup(false);
  };

  const handleLogout = () => {
    supabase.auth.signOut();
    setSession(null);
  };

  // Your existing chat history logic here

  if (!session) {
    return (
      <div>
        {showSignup ? (
          <Signup onSignup={handleSignup} />
        ) : (
          <Auth onLogin={handleLogin} />
        )}
        <button onClick={() => setShowSignup(!showSignup)}>
          {showSignup ? "Back to Login" : "Create an Account"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <UserProfile session={session} onLogout={handleLogout} />
      {/* Your existing chat history UI components */}
    </div>
  );
}

export default AIChatHistory;
