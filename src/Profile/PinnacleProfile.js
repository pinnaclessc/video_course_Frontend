import React from "react";
import Styles from "./PinnacleProfile.module.css";

export default function PinnacleProfile() {
  return (
    <div className={Styles["Pinnacle-Profile-fullPage"]}>
      <div className={Styles["Pinnacle-Profile-Container1"]}>
        <label className={Styles["Profile-label"]}>First Name</label>
        <input type="text" className={Styles["Profile-input"]}></input>
        <label className={Styles["Profile-label"]}>LastName</label>
        <input type="text" className={Styles["Profile-input"]}></input>
        <label className={Styles["Profile-label"]}>Heading</label>
        <input type="text" className={Styles["Profile-input"]}></input>
        <label className={Styles["Profile-label"]}>Biography</label>
        <input type="text" className={Styles["Profile-input"]}></input>
        <p className={Styles["Profile-para"]}>
          To help learners learn more about you, your bio should reflect your
          Credibility, Empathy, Passion, and Personality. Your biography should
          have at least 50 words, links and coupon codes are not permitted.
        </p>
        <label className={Styles["Profile-label"]}>Language</label>
        <select className={Styles["Profile-select"]}>
          <option>English</option>
          <option>Hindi</option>
          <option>Hinglish</option>
        </select>
        <button className={Styles["save-btn"]}>Save</button>
      </div>
      <div className={Styles["Pinnacle-Profile-Container2"]}>
        <label className={Styles["Profile-label"]}>Website</label>
        <input
          type="text"
          className={Styles["Profile-input"]}
          placeholder="Url"
        ></input>
        <label className={Styles["Profile-label"]}>Twitter</label>
        <input
          type="text"
          className={Styles["Profile-input"]}
          placeholder="http://www.twitter.com/"
        ></input>
        <label className={Styles["Profile-label"]}>Facebook</label>
        <input
          type="text"
          className={Styles["Profile-input"]}
          placeholder="http://www.facebook.com/"
        ></input>
        <label className={Styles["Profile-label"]}>LinkedIn</label>
        <input
          type="text"
          className={Styles["Profile-input"]}
          placeholder="http://www.linkedin.com/"
        ></input>
        <label className={Styles["Profile-label"]}>Youtube</label>
        <input
          type="text"
          className={Styles["Profile-input"]}
          placeholder="http://www.youtube.com/"
        ></input>
      </div>
    </div>
  );
}
