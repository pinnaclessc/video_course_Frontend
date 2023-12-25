import React from "react"
import classes from "./Options.module.css"
import { IoIosShareAlt } from "react-icons/io"
import { IoMdAdd } from "react-icons/io"
import { AiFillStar } from "react-icons/ai"
import { IoMdArchive } from "react-icons/io"

const Options = (props) => {
  return (
    <div className={classes.main}>
      <div className={classes.modal}>
        <div className={classes.content}>Lists</div>
        <div className={classes.content1}>You have no list</div>

        <div className={classes.line}></div>
        <div className={classes.content_list}>
          <ul className={classes.ulist}>
            <li className={classes.list}>
              <a href="/" className={classes.hypertext}>
                <IoIosShareAlt /> Share{" "}
              </a>
            </li>
            <li className={classes.list}>
              <a href="/" className={classes.hypertext}>
                <IoMdAdd /> Create New List{" "}
              </a>
            </li>
            <li className={classes.list}>
              <a href="/" className={classes.hypertext}>
                <AiFillStar /> Favorite{" "}
              </a>
            </li>
            <li className={classes.list}>
              <a href="/" className={classes.hypertext}>
                <IoMdArchive /> Archive{" "}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Options
