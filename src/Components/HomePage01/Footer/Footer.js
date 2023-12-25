import React from "react";
import classes from "./Footer.module.css";
import {ImYoutube2} from "react-icons/im"
import{RiTelegramLine} from "react-icons/ri"
import {GrLanguage} from "react-icons/gr"
import{MdOutlineLanguage} from "react-icons/md"

export default function Footer() {
  return (
    <div className={classes.Footer_fullPage}>
      <div className={classes.para}>
        <div>
          <p>About us</p>
          <p>Download App</p>
          <p>Contact us</p>
        </div>
      </div>
      <div className={classes.para}>
        <div>
          <p>Terms and conditions</p>
          <p>Privacy policy</p>
          <p>Refund and cancellation policy</p>
        </div>
      </div>
      <div className={classes.para}>
        <div>
          <p>Printed Books</p>
          <p>Digital books</p>
          <p>Test Portal</p>
        </div>
      </div>
      <div className={classes.para}>
        <div>
            <ImYoutube2 size={25}/>
            <p>Youtube channel</p>
          <RiTelegramLine size={25}/>
          <p>Telegram channel</p>
        </div>
      </div>
      <div className={classes.para}>
        <div>
          <button className={classes.language_btn}> <MdOutlineLanguage size={20}className={classes["language-icon"]} />English</button>
          <p>@2023 Pinnacle</p>
        </div>
      </div>
    </div>
  );
}
