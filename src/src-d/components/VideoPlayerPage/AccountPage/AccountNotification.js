import React, { useState } from "react"
import classes from "./AccountNotification.module.css"

function AccountNotification() {
  const [checked, setChecked] = useState(false)
  const [promotionChecked, setPromotionChecked] = useState(false)
  const [announcementChecked, setAnnouncementChecked] = useState(false)
  const [noPromotionChecked, setNoPromotionChecked] = useState(false)

  const handlePromotionChange = () => {
    setPromotionChecked(!promotionChecked)
    setAnnouncementChecked(false)
    setNoPromotionChecked(false)
  }

  const handleAnnouncementChange = () => {
    setPromotionChecked(false)
    setAnnouncementChecked(!announcementChecked)
    setNoPromotionChecked(false)
  }

  const handleNoPromotionChange = () => {
    setPromotionChecked(false)
    setAnnouncementChecked(false)
    setNoPromotionChecked(!noPromotionChecked)
  }

  const handleChange = () => {
    setChecked(!checked)
  }
  return (
    <div className={classes.main_container}>
      <div className={classes.notify_title}>
        <h3 className={classes.notify_heading}>Notifications</h3>
        <h4 className={classes.notify_para}>
          Turn promotional email notifications from Udemy on or off
        </h4>
      </div>
      <hr />
      <div className={classes.body_heading}>
        <h3 className={classes.notify_heading2}>I want to receive:</h3>
      </div>
      <div className={classes.body_container1}>
        <label className={classes.label1}>
          <input
            type="checkbox"
            checked={promotionChecked}
            onChange={handlePromotionChange}
          />
          <h4 className={classes.heading_label1}>
            Promotions, course recommendations, and helpful resources from
            Udemy.
          </h4>
        </label>
      </div>
      <div className={classes.body_container2}>
        <label className={classes.label2}>
          <input
            type="checkbox"
            checked={announcementChecked}
            onChange={handleAnnouncementChange}
          />
          <h4 className={classes.heading_label2}>
            Announcements from instructors whose course(s) I’m enrolled in.
          </h4>{" "}
        </label>
        <div className={classes.label_para}>
          To adjust this preference by course, leave this box checked and go to
          the course dashboard and click on "Options" to opt in or out of
          specific announcements.
        </div>
      </div>
      <div className={classes.body_container3}>
        <label className={classes.label3}>
          <input
            type="checkbox"
            checked={noPromotionChecked}
            onChange={handleNoPromotionChange}
          />
          <h4 className={classes.heading_label3}>
            Don't send me any promotional emails.
          </h4>
        </label>
        <div className={classes.label_para}>
          If this box is checked, please note that you will continue to receive
          important transactional emails like purchase receipts.
        </div>
      </div>
      <div className={classes.body_container4}>
        <button className={classes.save_btn}>Save</button>
      </div>
    </div>
  )
}

export default AccountNotification
