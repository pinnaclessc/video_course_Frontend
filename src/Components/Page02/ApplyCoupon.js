import React from "react";
import Styles from './ApplyCoupon.module.css'

export default function ApplyCoupon() {
  return (
    <div className={Styles["ApplyCoupon-fullPage"]}>
      <input className={Styles["inputBox"]}></input>
      <button className={Styles["apply-btn"]}>Apply</button>
    </div>
  );
}
