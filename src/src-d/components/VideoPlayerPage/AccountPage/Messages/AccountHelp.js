import React from "react"
import classes from "./AccountHelp.module.css"

function AccountHelp() {
  return (
    <div className={classes.accountMain_container}>
      <header className={classes.accountHelp_Page}>
        <ul className={classes.unordered_list}>
          <li className={classes.ordered_list}>Back to Pinnacle</li>
          <li className={classes.ordered_list1}>
            <img alt=""
              className={classes.header_img}
              src="/images/Pinnacle logo colored.svg"
            />
          </li>
          <li className={classes.username}>UserName</li>
          <li className={classes.ordered_list}>
            <button className={classes.signin_btn}>Sign in</button>
          </li>
        </ul>
      </header>
      <hr />
      <div className={classes.account_container}>
        <h3 className={classes.account_heading}>
          Creating and Editing Your Profile
        </h3>
        <hr />
      </div>
      <div className={classes.account_content}>
        <li className={classes.content_para}>
          Every Udemy account includes a profile page where you can share
          information about yourself. This article outlines how learners can
          create and edit their Pinnacle profile.
        </li>
      </div>
      <div className={classes.content_container}>
        <h4 className={classes.content_heading}>How to Edit Your Profile </h4>
        <li className={classes.content_para1}>
          To edit your profile, move your cursor to your initials or profile
          image at the top right of the page and click on your name in the
          drop-down menu. If you’re logged into your Udemy account, you can also
          head to your profile page directly via this link.
        </li>
        <img className={classes.content_image1} src="/images/acc snap.png" />
        <li className={classes.content_para2}>
          To edit your profile bio, simply type in your first and last name,
          your headline, and what you want your biography to say. Next, click
          Save at the bottom of the page.
        </li>
        <img
          className={classes.content_image2}
          src="/images/edit profile.png"
          alt="profile"
        />
        <h3 className={classes.content_heading}>
          How to Upload Your Profile Picture
        </h3>
        <li className={classes.content_para2}>
          To upload (or edit) your profile picture, click Photo on the left-hand
          side of your Profile page. Then choose an image from your computer to
          upload. Once it’s uploaded, you can crop it, if necessary, and then
          click Save.
        </li>
        <img
          className={classes.content_image2}
          src="/images/Edit picture.png"
          alt="pic"
        />
        <h3 className={classes.content_heading}>How to View Your Profile</h3>
        <li className={classes.content_para2}>
          If you wish to see how your profile will appear to other students and
          instructors, simply click View Public Profile on the left hand side of
          your Profile page.
        </li>
        <img
          className={classes.content_image2}
          src="/images/view profile.png"
          alt="view"
        />
        <h3 className={classes.content_heading}>
          Editing Your Privacy Settings
        </h3>
        <li className={classes.content_para_last}>
          You can access your privacy settings, and set whether you wish to have
          your profile visible to logged in students and instructors on the
          Privacy page. In addition, you can also set whether you wish to share
          what courses you’re enrolled in on this page. Only students and
          instructors who are logged into their Udemy accounts can view another
          student’s account profile. Profiles of instructors with published
          courses can be viewed by students and instructors when they are logged
          in and logged out. Your privacy settings can be accessed by clicking
          on Privacy on the left-hand side of your Profile page. To make your
          profile or enrolled courses private, simply click on the checkmark
          beside each option and click Save.
        </li>
      </div>
    </div>
  )
}

export default AccountHelp
