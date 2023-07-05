import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import "../styles/Auth.css";
import Cookies from "universal-cookie";
import Button from '@mui/material/Button';
import * as React from 'react';
import LoginDialog from "./LoginDialog"

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const [open, setOpen] = React.useState(false);
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithFacebook = async () => {
    try {
      setOpen(true)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth">
      <p> Sign In With Facebook To Continue </p>

      <Button onClick={signInWithFacebook} variant="contained"> Sign In With Facebook </Button>
      {open ? <LoginDialog open={open} setOpen={setOpen} setIsAuth={setIsAuth} /> : <></>}
    </div>
  );
};
