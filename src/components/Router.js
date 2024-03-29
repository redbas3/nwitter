import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "components/Navigation";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj, setUserObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}

      {isLoggedIn ? (
        <div
          style={{
            maxWidth: 890,
            width: "100%",
            margin: "0 auto",
            marginTop: 80,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Routes>
            <Route exact path="/" element={<Home userObj={userObj} />}></Route>
            <Route
              exact
              path="/profile"
              element={<Profile setUserObj={setUserObj} userObj={userObj} />}
            ></Route>
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route exact path="/" element={<Auth />}></Route>
        </Routes>
      )}
    </Router>
  );
};
export default AppRouter;
