import React from "react"
import classes from "./AccountClose.module.css"

function AccountClose() {
  return (
    <div className={classes.close_container}>
      <div className={classes.header_container}>
        <h3 className={classes.close_header}>Close Account</h3>
        <h4 className={classes.header_para}>Close your account permanently</h4>
      </div>
      <hr />
      <div className={classes.close_body_container}>
        <h4 className={classes.warning_text}>Warning: </h4>
        <p className={classes.warning_para}>
          {" "}
          If you close your account, you will be unsubscribed from all your 3
          courses, and will lose access forever.
        </p>
      </div>
      <div className={classes.close_btn_box}>
        <button className={classes.close_btn}>Close account</button>
      </div>
    </div>
  )
}

export default AccountClose
