import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import "../styles/Chat.css";

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    margin: "2px",
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: localStorage.getItem('userName'),
      room,
    });

    setNewMessage("");
  };

  return (

    <Container maxWidth="lg" style={{ width: "1000px" }}>
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>


        <div>
          <div className="header">
            <h1>Welcome to: {room.toUpperCase()}</h1>
          </div>
          <div>
            {messages.map((message) => (

              <Grid container>
                {message.user != null && message.user.includes('isuru') ? <Grid item xs={12} textAlign="left">
                  <div><span className="user">{message.user}:</span> {message.text}</div>

                </Grid> : <Grid item xs={12} textAlign="right">
                  <div><span className="user">{message.text}:</span>{message.user}</div>
                </Grid>}

              </Grid>
              // <div key={message.id} className="message">
              //   <span className="user">{message.user}:</span> {message.text}
              // </div>
            ))}
          </div>

          <Container maxWidth="lg">
            <form onSubmit={handleSubmit} className="new-message-form">
              <input
                type="text"
                value={newMessage}
                onChange={(event) => setNewMessage(event.target.value)}
                className="new-message-input"
                placeholder="Type your message here..."
              />
              <button type="submit" className="send-button">
                Send
              </button>
            </form>
          </Container>
        </div>
      </Box>
    </Container>

  );
};
