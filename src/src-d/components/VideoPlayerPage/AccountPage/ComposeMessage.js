import React from "react"
import classes from "./ComposeMessages.module.css"

function ComposeMessage() {
  return (
    <div className={classes.compose_container}>
      <div className={classes.heading_container}>
        <h3 className={classes.compose_heading}>Compose</h3>
        <h5>What do you have in your mind?</h5>
      </div>
      <div className={classes.option_container}>
        <h3 className={classes.option_container1}>
          Technical, payment or other platform issues
        </h3>
        <button className={classes.help_btn}>Visit Pinnacle help centre</button>
      </div>
      <div className={classes.option_container}>
        <h3 className={classes.option_container1}>
          Questions about course content
        </h3>
        <button className={classes.help_btn}>View course Q&A</button>
      </div>
      <div className={classes.option_container}>
        <h3 className={classes.option_container1}>Clear your doubts</h3>
        <button className={classes.help_btn}>Send message to us</button>
      </div>
    </div>
  )
}

export default ComposeMessage
