import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  FieldValue,
} from "firebase/firestore";

const db = getFirestore();

// Function to get a user's data
async function getUserData(userType, userId) {
  const userRef = doc(db, `platform_users/${userType}/${userType}/${userId}`);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    console.log("No such user!");
    return null;
  }
}

// Function to create a new user
async function createUser(userType, userId, userData) {
  const userRef = doc(db, `platform_users/${userType}/${userType}/${userId}`);
  await setDoc(userRef, userData);
}

// Function to update a user's data
async function updateUser(userType, userId, updateData) {
  const userRef = doc(db, `platform_users/${userType}/${userType}/${userId}`);
  await updateDoc(userRef, updateData);
}

// Example usage for a regular user
async function addVehicleNumber(userId, vehicleNumber) {
  const userRef = doc(db, `platform_users/user/user/${userId}`);
  await updateDoc(userRef, {
    vehicleNumbers: FieldValue.arrayUnion(vehicleNumber),
  });
}

export { getUserData, createUser, updateUser, addVehicleNumber };
