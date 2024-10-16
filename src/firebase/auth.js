import { auth } from "./firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return "Password reset email sent. Please check your inbox.";
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};
