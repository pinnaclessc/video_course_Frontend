import React from "react"
import classes from "./TroubleshootingHelp.module.css"

function TroubleshootingHelp() {
  return (
    <div className={classes.troubleshooting_container}>
      <header className={classes.SignUp_Page}>
        <ul className={classes.unordered_list}>
          <li className={classes.ordered_list}>Back to Pinnacle</li>
          <li className={classes.ordered_list1}>
            <img
              className={classes.header_img}
              src="/images/Pinnacle logo colored.svg"
            />
          </li>
          <li className={classes.ordered_list}>UserName</li>
          <li className={classes.ordered_list}>
            <button className={classes.signin_btn}>Sign in</button>
          </li>
        </ul>
      </header>
      <hr />
      <h3 className={classes.troubleshooting_heading}>
        How to Troubleshoot Audio & Video Issues (on a Browser)
      </h3>
      <hr />
    </div>
  )
}

export default TroubleshootingHelp
