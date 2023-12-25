import React, { useState } from "react"
import classes from "./Messages.module.css"
import { CgSearch } from "react-icons/cg"
import { BiStar } from "react-icons/bi"
import ComposeMessage from "./ComposeMessage"

function Messages() {
  const [checked, setChecked] = useState(false)
  const [showCompose, setShowCompose] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }

  const ComposeHandler = () => {
    setShowCompose(!showCompose)
  }

  return (
    <div className={classes.main_container}>
      <h3 className={classes.msg_heading}>Messages</h3>
      <div className={classes.msg_text}>You have 1 unread message.</div>
      <hr />
      <div className={classes.options_container}>
        <div className={classes.compose_container}>
          <button className={classes.compose_btn} onClick={ComposeHandler}>
            Compose
          </button>
        </div>
        <div className={classes.unread_container}>
          <select className={classes.select_container}>
            <option className={classes.allmsg_container} value="all messages">
              All Messages
            </option>

            <option className={classes.unread1_container} value="unread">
              Unread
            </option>

            <option className={classes.nores_container} value="no response">
              No response
            </option>
            <option className={classes.imp_container} value="important">
              Important
            </option>
          </select>
        </div>
      </div>
      <div className={classes.search_container}>
        <input
          className={classes.search_input}
          type="text"
          placeholder="Search"
        />
        <CgSearch className={classes.search_icon} size={25} />
      </div>
      <hr />
      <div className={classes.subheading_container}>
        <div className={classes.user_container}>
          <input
            className={classes.checkbox}
            type="checkbox"
            checked={checked}
            onChange={handleChange}
          />
          <img
            className={classes.user_image}
            src="/images/Baljitsir_image.PNG"
          ></img>
          <span className={classes.username}>USER_NAME</span>
          <span className={classes.time}>time</span>
        </div>
        <div className={classes.comment}>
          <BiStar className={classes.star_icon} size={20} />
          <span className={classes.comment_text}>
            Hi, Welcome to ‘Machine Learning with Python and R’. We are very
            excited to have you with us.......
          </span>
        </div>
      </div>
      <div className={classes.compose_container}>
        {showCompose && <ComposeMessage />}
      </div>
    </div>
  )
}

export default Messages
