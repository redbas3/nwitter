import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "fBase";
import { signOut } from "firebase/auth";

function Profile() {
  const history = useNavigate();
  const onLogOutClick = () => {
    signOut(authService)
      .then(() => {
        history("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;
