import React from "react"
import { GoStarFill } from "react-icons/go"
import { AiFillFolder, AiFillStar } from "react-icons/ai"
import { IoMdGift, IoIosCheckbox } from "react-icons/io"
import classes from "./VerticaldotsOption.module.css"

function Verticaldots() {
  return (
    <div className={classes.optionsVdots}>
      <ul className={classes.option_unorder_list}>
        <li className={classes.option_list}>
          <AiFillStar size={20} />
          <span>Favourite this course</span>
        </li>
        <li className={classes.option_list}>
          <AiFillFolder size={20} />
          <span>Archive this course</span>
        </li>
        <li className={classes.option_list}>
          <IoMdGift size={20} />
          <span>Gift this course</span>
        </li>
        <hr />
        <li className={classes.option_list}>
          <IoIosCheckbox size={20} />
          New Announcement Emails
        </li>
        <li className={classes.option_list}>
          <IoIosCheckbox size={20} />
          Promotional Emails
        </li>
      </ul>
    </div>
  )
}

export default Verticaldots
