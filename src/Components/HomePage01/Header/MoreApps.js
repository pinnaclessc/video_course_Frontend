import React from "react";
import classes from "./MoreApps.module.css";

export default function MoreApps() {
  return (
    <div className={classes.moreApps_full_Page}>
      <div className={classes.all_icons}>
      <a href="/">
        <div className={classes.individual_icons}>
          <img
            src="/image/playstore.png"
            alt=""
            width="30px"
            height="30px"
          ></img>
          Topper Guidance
        </div>
      </a>
      <a href="/">
        <div className={classes.individual_icons}>
          <img
            src="/image/playstore.png"
            alt=""
            width="30px"
            height="30px"
          ></img>
         Pinnacle Digital Books
        </div>
      </a>

      <a href="/">
        <div className={classes.individual_icons}>
          <img
            src="/image/playstore.png"
            alt=""
            width="30px"
            height="30px"
          ></img>
        Pinnacle ERP
        </div>
      </a>

      <a href="/">
        <div className={classes.individual_icons}>
          <img
            src="/image/playstore.png"
            alt=""
            width="30px"
            height="30px"
          ></img>
        Pinnacle Topper-Varification
        </div>
      </a>
      <a href="/">
        <div className={classes.individual_icons}>
          <img
            src="/image/playstore.png"
            alt=""
            width="30px"
            height="30px"
          ></img>
          Pinnacle Bussiness
        </div>
      </a>
      <a href="/">
        <div className={classes.individual_icons}>
          <img
            src="/image/playstore.png"
            alt=""
            width="30px"
            height="30px"
          ></img>
         Teach On Pinnacle
        </div>
      </a>
      </div>
    </div>
  );
}
/*  */