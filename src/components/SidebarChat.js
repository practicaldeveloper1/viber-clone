import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import { Link } from "react-router-dom"
import { useStateValue } from '../context/StateProvider';
import db from "../firebase";
import './SidebarChat.css'
import notificationAudio from '../audio/viber_message.mp3'

function SidebarChat({ id, name }) {
  const [{ user }] = useStateValue();
  const [messages, setMessages] = useState('');
  const [seed, setSeed] = useState('');
  const [audio] = useState(new Audio(notificationAudio));
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const { roomId } = useParams();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 1000));

    const cleanUp = db.collection('rooms')
      .doc(id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .limit(1)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) =>
          doc.data()))
        setInitialDataFetched(true);
      }
      );
    return () => {
      cleanUp();
    }
  }, [])


  useEffect(() => {
    if (initialDataFetched) {
      if (messages[0]?.uid !== user.uid) {
        audio.play();
      }
    }
  }, [messages])

  const dateToDateMonthString = (date) => {
    if (date) {
      const dateMonthYearString = date.toLocaleDateString();
      return dateMonthYearString;
    }
  }

  return (
    <Link to={`/rooms/${id}`}>
      <div className={`sidebarChat ${id === roomId && "active"} `}>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{`${user.uid === messages[0]?.uid ? 'Me' : messages[0]?.name}:  ${messages[0]?.message}`}</p>
        </div>
        <div className='sidebarChat__timestamp'>
          {dateToDateMonthString((
            messages[0]?.
              timestamp?.toDate()
          ))}
        </div>
      </div>
    </Link>
  )
}

export default SidebarChat
