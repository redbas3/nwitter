import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "fBase";
import { updateCurrentUser, updateProfile } from "firebase/auth";
import { signOut } from "firebase/auth";

function Profile({ setUserObj, userObj }) {
  const history = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    signOut(authService)
      .then(() => {
        history("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      await updateCurrentUser(authService, authService.currentUser);
      setUserObj(authService.currentUser);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            type="text"
            placeholder="Display name"
            value={newDisplayName ?? "User"}
            className="formInput"
            autoFocus
          />
          <input
            type="submit"
            value="Update Profile"
            className="formBtn"
            style={{
              marginTop: 10,
            }}
          />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
          Log Out
        </span>
      </div>
    </>
  );
}

export default Profile;
