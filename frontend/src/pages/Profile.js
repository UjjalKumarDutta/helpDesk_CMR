import React from "react";
import useAuth from "../auth/useAuth";

function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <h2>My Profile</h2>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}

export default Profile;

