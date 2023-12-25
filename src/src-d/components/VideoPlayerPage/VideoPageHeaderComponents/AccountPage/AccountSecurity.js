import React from "react"
import { MdEdit } from "react-icons/md"
import classes from "./AccountSecurity.module.css"

function AccountSecurity() {
  return (
    <>
      <div className={classes.account_container}>
        <div className={classes.heading_container}>
          <h4 className={classes.account_heading}>Account </h4>
          <h5 className={classes.heading_para}>
            Edit your account settings and change your password here.
          </h5>
        </div>
        <hr />
        <div className={classes.email_container}>
          <h3 className={classes.email_heading}>Email:</h3>
          <input
            className={classes.email_input}
            type="text"
            placeholder="Your email address is UserEmailAddress."
          ></input>
          <button className={classes.email_btn}>
            <MdEdit size={20} />
          </button>
        </div>
        <div className={classes.password_container}>
          <h3 className={classes.password_heading}>Password:</h3>
          <input
            className={classes.password_input}
            type="text"
            placeholder="Enter current password."
          ></input>
        </div>
        <div className={classes.password_container}>
          <input
            className={classes.new_password_input}
            type="text"
            placeholder="Enter new password."
          ></input>
        </div>
        <div className={classes.password_container}>
          <input
            className={classes.new_password_input}
            type="text"
            placeholder="Re-type new password."
          ></input>
        </div>
        <div className={classes.password_container}>
          <input
            className={classes.new_password_input}
            type="text"
            placeholder="Change Password."
          ></input>
        </div>

        <hr />
        <div className={classes.MFA_container}>
          <h4 className={classes.MFA_heading}>Multi-factor Authentication</h4>
          <p className={classes.MFA_para}>
            Increase your account security by requiring that a code emailed to
            you be entered when you log in. For more information on how
            multi-factor authentication works, refer to our Help Center article.
          </p>
          <button className={classes.enable_btn}>Enable</button>
        </div>
      </div>
    </>
  )
}

export default AccountSecurity
