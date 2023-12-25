import React, { useState } from "react"
import SchedulePopup from "./SchedulePopup"
import classes from "./LearningTools.module.css"

export default function LearningTools() {
  const [showSchedulePopup, setShowSchedulePopup] = useState(false)

  const handleScheduleClick = () => {
    setShowSchedulePopup(true)
  }

  const handleClosePopup = () => {
    setShowSchedulePopup(false)
  }
  return (
    <div className={classes.learning_container}>
      <div className={classes.learning_heading}>
        <p>Learning Reminder</p>
      </div>
      <div className={classes.calender_event}>
        <h4>Calender Events</h4>
        <p>
          Learning a little each day adds up. Research shows that students who
          make learning a habit are more likely to reach their goals. Set time
          aside to learn and get reminders using your learning scheduler.
        </p>
      </div>
      <div className={classes.add_btn_container}>
        <button className={classes.add_btn} onClick={handleScheduleClick}>
          Schedule Learning Time +
        </button>
      </div>
      {showSchedulePopup && <SchedulePopup onClose={handleClosePopup} />}
      <div className={classes.notification_container}>
        <h2>Push notifications</h2>
        <p>
          Don’t want to schedule time blocks? Set a learning reminder to get
          push notifications from the Udemy mobile app.
        </p>
      </div>
      <div>
        <p>Text me a link to download the app</p>
      </div>
      <div className={classes.country}>
        <select className={classes.country_name}>
          <option defaultValue="All Lectures">Select Language</option>
          <option defaultValue="Current Lectures">India</option>
        </select>
      </div>
      <div className={classes.num_container}>
        <input
          className={classes.num_input}
          type="tel"
          name="telphone"
          pattern="[0-9]{10}"
          placeholder="1257582"
          title="Ten digits code"
        />
        <button className={classes.send_btn}>Send</button>
      </div>
    </div>
  )
}
