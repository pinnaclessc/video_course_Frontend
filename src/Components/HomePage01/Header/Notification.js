import React, { useState } from "react"
import Card from "./Card/Card"
import { MdNotifications } from "react-icons/md"
import classes from "./Notification.module.css"

function Notification() {
  const [showCard, setShowCard] = useState(false)

  const handleMouseEnter = () => {
    setShowCard(true)
  }

  const handleMouseLeave = () => {
    setShowCard(false)
  }
  return (
    <div
      className={classes.dropdown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={classes.notify_btn}>
        <MdNotifications size={30} />
      </button>
      {/* {showCard && (
        <Card className={classes.notify_card}>
          <div className={classes.notify_container}>
            <div className={classes.notify}>Notification</div>
            <div className={classes.settings}>Settings</div>
          </div>
          <div className={classes.notification_container}>
            <div className={classes.instructor}>Instructor</div>
            <div className={classes.students}>Students(17)</div>
          </div>
          <hr />
          <div className={classes.notify_item}>
            <ul className={classes.notify_unorderlist}>
              <li className={classes.notify_list}>No notifications</li>
            </ul>
          </div>
        </Card>
      )} */}
    </div>
  )
}
export default Notification
