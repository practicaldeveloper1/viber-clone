import React from 'react'
import "./ChatDate.css"

function ChatDate({ date }) {
  const dateToFullDateString = (date) => {
    const options = { weekday: 'long', day: 'numeric', year: 'numeric', month: 'long', };
    if (date) {
      const dateMonthYearString = date.toLocaleDateString([], options);     //   format(date, 'EEEE dd MMMM y');
      return dateMonthYearString;
    }
  }

  return (
    <div className="chatDate">
      {dateToFullDateString(date)}
    </div>
  )
}

export default ChatDate
