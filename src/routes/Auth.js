import React, { useState } from "react";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "fBase";
import AuthForm from "components/AuthForm";

const Auth = () => {
  const onSocialClcik = (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    signInWithPopup(authService, provider)
      .then((result) => {})
      .catch((error) => {});
  };
  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={onSocialClcik}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClcik}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
