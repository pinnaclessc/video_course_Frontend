import React from "react";
import styles from "./Languages.module.css";

export default function Languages(props) {
  //   const Languages = [
  //     { id: "l1", lan: "Hinglish" },
  //     { id: "l2", lan: "English" },
  //     { id: "l3", lan: "Hindi" },
  //     { id: "l4", lan: "Bengali" },
  //     { id: "l5", lan: "Telgu" },
  //     { id: "l6", lan: "Tamil" },
  //   ];
  return (
    <div className={styles["Languages-fullPage"]}>
     
      <div className={styles["all-button-div"]}>
      <div className={styles["Languages-Heading"]}>Choose A Language</div>
        <div className={styles["button-div"]}>
          <button className={styles["btn"]}>Hinglish</button>
        </div>
        <div className={styles["button-div"]}>
          <button className={styles["btn"]}>English</button>
        </div>
        <div className={styles["button-div"]}>
          <button className={styles["btn"]}>Hindi</button>
        </div>
      </div>
    </div>
  );
}
