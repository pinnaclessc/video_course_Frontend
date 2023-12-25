import React from "react";
import Styles from "./PrivacySetting.module.css";

export default function PrivacySettings() {
  return (
    <div className={Styles["PrivacySettings-fullPage"]}>
      <div className={Styles["PrivacySettings-checkbox1"]}>
        <input type="checkbox" className={Styles["checkbox-ps"]}></input>
        <p>Show Your Profile to logged-in users</p>
      </div>
      <div className={Styles["PrivacySettings-checkbox2"]}>
        <input type="checkbox" className={Styles["checkbox-ps"]}></input>
        <p>Show Courses you're taking on your profile page</p>
      </div>
      <button className={Styles["save-btn"]}>Save</button>
    </div>
  );
}
