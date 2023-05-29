import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  const onLogout = () => {
    signOut(authService).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });

  }
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Init..."}
      <footer>
        <div>
          <button onClick={onLogout}>Logout</button>
        </div>
        &copy; {new Date().getFullYear()} Nwitter
      </footer>
    </>
  );
}

export default App;
