import React from "react"
import { CgMail } from "react-icons/cg"
// import { BiLogoFacebook } from "react-icons/bi"
import classes from "./SignUpHelp.module.css"

function SignUpHelp() {
  return (
    <div className={classes.SignUp_Page}>
      <header className={classes.SignUp_Page}>
        <ul className={classes.unordered_list}>
          <li className={classes.ordered_list}>Back to Pinnacle</li>
          <li className={classes.ordered_list1}>
            <img
              className={classes.header_img}
              src="/images/Pinnacle logo colored.svg"
              alt=""
            />
          </li>
          <li className={classes.ordered_list}>UserName</li>
          <li className={classes.ordered_list}>
            <button className={classes.signin_btn}>Sign in</button>
          </li>
        </ul>
      </header>
      <hr />
      <div className={classes.signup_container}>
        <img
          className={classes.sd_image}
          src="./images/help-desk.png"
          alt=""
          width={60}
          height={60}
        />
        <h3 className={classes.signup_heading}>
          How to Sign up With Pinnacle and Log in or Log out (on a Browser)
        </h3>
      </div>
      <hr />{" "}
      <div className={classes.signup_main_container}>
        <div className={classes.signup_content1}>
          <h4 className={classes.signup_heading1}>
            Register yourself with an email and password
          </h4>
          <img className={classes.signup_image} src="/images/login_email.png"  alt=""/>
          <ul>
            <li>
              Click Sign Up at the top right of your desktop or laptop browser.
            </li>
            <li>Enter your email address, and a unique password.</li>
            <li>
              Select whether you wish to receive new courses/batch announcements
              and promotional emails from Pinnacle,
            </li>
            <li>Click Sign up.</li>
            <img
              className={classes.signup_image}
              src="/images/login_register page.png"
              alt=""
            />
          </ul>
        </div>

        <div className={classes.signup_content3}>
          <h4 className={classes.signup_heading2}>
            Log in with an email and password:
          </h4>
          <img
            className={classes.signup_image}
            src="/images/login_email_entered.png"
            alt=""
          />
          <ul>
            <li>On your browser, click Log in at the top right.</li>
            <li>Enter the credentials you used to sign up.</li>
            <li>Click Log in with Google or Facebook.</li>
            <li>
              If you have previously signed up for Pinnacle using the , Facebook
              or Google option, click Log in at the top right of your browser.
            </li>
            <li>Select Continue with Facebook or Google.</li>
            <li>
              Follow the prompts to complete the sign in process. How to log out
              of your Pinnacle account
            </li>
            <li>
              If you’re accessing your Pinnacle account from a public or shared
              device, be sure to log out of your account when you’re finished
              studying.
            </li>
            <li>
              Move your cursor to your initials or profile image at the top
              right of the page.
            </li>
            <li>Click Log out in the dropdown menu.</li>
          </ul>
          <img
            className={classes.signup_image}
            src="/images/login_OTP_page.png"
            alt=""
          />
        </div>
        <div className={classes.signup_content2}>
          <h4 className={classes.signup_heading4}>Sign up using :</h4>
          <ul>
            <li>
              {" "}
              <CgMail size={20} />
              Google
            </li>
            <li>
              {/*<BiLogoFacebook size={20} /> */} Facebook
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SignUpHelp;
