import React from 'react'
import './Message.css'
import { Avatar } from "@material-ui/core";
import { useStateValue } from '../context/StateProvider'

function Message({ uid, name, text, timestamp, profilePicSrc, renderReceiverMessageInfo }) {
  const [{ user }] = useStateValue();

  const dateToHoursMinutesString = (date) => {
    if (date) {
      const hoursMinutes = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: 'h12',
      });
      return hoursMinutes;
    }
  };

  return (
    <div className={`message ${uid === user.uid && "message__sender"} `}>
      {renderReceiverMessageInfo && <div className="message__receiverAvatar">
        <Avatar src={profilePicSrc} />
      </div>
      }
      <div className="message__info">
        {renderReceiverMessageInfo &&
          <div className="message__name">{name}</div>}
        <div className="message__text">{text}</div>
        <div className="message__timestamp">{dateToHoursMinutesString(timestamp)} </div>
      </div>
    </div>
  )
}

export default Message
