import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService, dbService } from "fBase";
import { signOut } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

function Profile({ setUserObj, userObj }) {
  const history = useNavigate();
  const onLogOutClick = () => {
    signOut(authService)
      .then(() => {
        setUserObj(null);
        history("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const nweets = [];
    querySnapshot.forEach((doc) => {
      nweets.push(doc);
    });
    console.log(nweets);
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;
