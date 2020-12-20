import React, { useEffect, useState } from 'react'
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonIcon from '@material-ui/icons/Person';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIcon from '@material-ui/icons/Search';
import LaunchIcon from '@material-ui/icons/Launch';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Sidebar.css'
import SidebarChat from './SidebarChat';
import db from "../firebase";
import firebase from "firebase"

function Sidebar() {

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('rooms').orderBy('timestamp', 'desc').onSnapshot((snapshot) =>
      setRooms(snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      }))
      )
    );
    return () => {
      unsubscribe();
    }
  }, [])

  const createChat = () => {
    const roomName = prompt("Please enter a name for chat room");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  };

  return (
    <div className='sidebar'>
      <div className="sidebar__header">
        <div className="sidebar__headerIconGroup" >
          <ChatRoundedIcon style={{ borderRadius: '20px' }}
            className="sidebar__header__active" />
          <ArrowDropDownIcon className="sidebar__header__arrow" />
        </div>
        <div className="sidebar__headerIconGroup" >
          <PersonIcon />
        </div>
        <div className="sidebar__headerIconGroup" >
          <MoreHorizIcon />
        </div>

      </div>

      <div className="sidebar__searchRow">
        <div className="sidebar__searchInput">
          <SearchIcon className="sidebar__searchIcon" />
          <input type="text" className="sidebar__searchInputField" placeholder="Search..." />
        </div>
        <LaunchIcon onClick={createChat} className="sidebar__launchIcon" />
      </div>

      <div className="sidebar__favorites">
        <p>Favorites</p>
        <ExpandMoreIcon />
      </div>

      <div className="sidebar__chats">
        {rooms.map(room => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>


    </div>
  )
}

export default Sidebar
