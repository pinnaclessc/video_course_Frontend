import React from "react"
import classes from "./BottomNav.module.css"
import { IoIosArrowDropleft } from "react-icons/io"
import { IoIosArrowDropright } from "react-icons/io"

function BottomNav() {
  return (
    <div className={classes.bottombar}>
      <div className={classes.left_arrow}>
        <a href="/">
          <IoIosArrowDropleft size={30} />
        </a>
      </div>
      <div className={classes.numbers}>
        <div className={classes.num1}>
          {" "}
          <a href="/">1</a>
        </div>
        <div className={classes.num1}>
          {" "}
          <a href="/">2</a>
        </div>
        <div className={classes.num1}>
          {" "}
          <a href="/">3</a>
        </div>
        <div className={classes.num1}>
          {" "}
          <a href="/">4</a>
        </div>
      </div>
      <div className={classes.right_arrow}>
        <a href="/">
          <IoIosArrowDropright size={30} />
        </a>
      </div>
    </div>
  )
}

export default BottomNav
