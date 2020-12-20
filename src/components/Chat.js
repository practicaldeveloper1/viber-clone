import React, { useState, useRef, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PhoneInTalkOutlinedIcon from '@material-ui/icons/PhoneInTalkOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import GifIcon from '@material-ui/icons/Gif';
import MicNoneTwoToneIcon from '@material-ui/icons/MicNoneTwoTone';
import './Chat.css'
import Message from './Message';
import ChatDate from './ChatDate';
import db from '../firebase'
import firebase from "firebase"
import { useParams } from 'react-router-dom'
import { useStateValue } from '../context/StateProvider'

function Chat() {

  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [{ user }] = useStateValue();
  const inputRef = useRef(null);
  const [seed, setSeed] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {

    setSeed(Math.floor(Math.random() * 1000));

    const cleanUp1 = db.collection('rooms')
      .doc(roomId)
      .onSnapshot((snapshot) => {
        if (snapshot.data()) {
          setRoomName(snapshot.data().name)
        }
      });

    const cleanUp2 = db.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map(doc => doc.data()))
      });

    return () => {
      cleanUp1();
      cleanUp2();
    }

  }, [roomId])


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection('rooms').doc(roomId).collection('messages').add({
      message: inputRef.current.value,
      name: user.displayName,
      uid: user.uid,
      profilePic: user.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    db.collection('rooms').doc(roomId).update({
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    inputRef.current.value = "";

  };
  return (
    <div className='chat'>
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen {(
            messages[messages.length - 1]?.timestamp?.toDate()
          )?.toLocaleString()}
          </p>
        </div>
        <div className="chat__headerIcons">
          <PersonAddOutlinedIcon />
          <PhoneInTalkOutlinedIcon />
          <VideocamOutlinedIcon />
          <InfoOutlinedIcon />
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message, index) => {
          const prevMessage = messages[index - 1];
          const showDate = (prevMessage?.timestamp?.toDate().getDate() !== message.timestamp?.toDate().getDate()) ||
            (prevMessage?.timestamp?.toDate().getMonth() !== message.timestamp?.toDate().getMonth()) ||
            (prevMessage?.timestamp?.toDate().getYear() !== message.timestamp?.toDate().getYear())
          return (
            <React.Fragment key={message.timestamp + message.uid} >
              { showDate && <ChatDate date={message.timestamp?.toDate()} />}
              <Message
                renderReceiverMessageInfo={(!prevMessage || message.uid !== prevMessage.uid) && message.uid !== user.uid}
                name={message.name}
                text={message.message}
                profilePicSrc={message.profilePic}
                timestamp={message.timestamp?.toDate()}
                uid={message.uid}
              />
            </React.Fragment>
          )
        }
        )}

        <div ref={messagesEndRef} />

      </div>

      <div className="chat__footer">
        <AddOutlinedIcon />
        <GifIcon />
        <InsertEmoticonIcon />
        <form>
          <input ref={inputRef} type="text" placeholder='Type a message...' />
          <button onClick={sendMessage} ></button>
        </form>
        <MicNoneTwoToneIcon />
      </div>

    </div>
  )
}

export default Chat
