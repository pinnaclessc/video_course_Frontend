import React from "react"
import classes from "./TroubleshootingSideMenu.module.css"

function TroubleshootingSideMenu() {
  return (
    <div className={classes.troubleshootingSideMenu}>
      <ul className={classes.unordered_list}>
        <li className={classes.ordered_list}></li>
        <li className={classes.ordered_list}></li>
        <li className={classes.ordered_list}></li>
        <li className={classes.ordered_list}></li>
      </ul>
    </div>
  )
}

export default TroubleshootingSideMenu
