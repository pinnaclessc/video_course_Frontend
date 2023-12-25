import React from "react";
import Styles from "./Assignments.module.css";

export default function Assignments() {
  const AssignmenetData = [];

  if (AssignmenetData.length === 0) {
    return (
      <div className={Styles["Assignmenets-fullPage"]}>
        <div className={Styles["Assignmenets-Heading"]}>Assignments</div>
        <div className={Styles["checkbox-divSection"]}>
          <div>
            <input type="checkbox"></input> Unread
          </div>
          <div>
            Sharing Prefrence :
            <select className={Styles["Select-Section"]}>
              <option>All</option>
              <option>Instructor only</option>
              <option>Public</option>
            </select>
          </div>
          <div>
            Feedback Type :{" "}
            <select className={Styles["Select-Section"]}>
              <option>All</option>
              <option>No Feedback</option>
              <option>Student Only</option>
              <option>Instructor Only</option>
              <option>Student And Instructor</option>
            </select>
          </div>
          <div>
            Sort by :
            <select className={Styles["Select-Section"]}>
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>
        </div>
        <div className={Styles["checkbox-empty-div"]}>
          <div className={Styles["checkbox-empty-image-div"]}>
            <div className={Styles["emptyCart-imageDiv"]}>
              <img
                src="/image/carousel02.jpg"
                alt=""
                className={Styles["emptyCart-image"]}
              ></img>
               <h4>No results</h4>
            <p>Try a different filter</p>
            </div>
           
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={Styles["Assignmenets-fullPage"]}>
      <div className={Styles["Assignmenets-Heading"]}>Assignments</div>
      <div className={Styles["checkbox-divSection"]}>
        <div>
          <input type="checkbox"></input> Unread
        </div>
        <div>
          Sharing Prefrence :
          <select className={Styles["Select-Section"]}>
            <option>All</option>
            <option>Instructor only</option>
            <option>Public</option>
          </select>
        </div>
        <div>
          Feedback Type :{" "}
          <select className={Styles["Select-Section"]}>
            <option>All</option>
            <option>No Feedback</option>
            <option>Student Only</option>
            <option>Instructor Only</option>
            <option>Student And Instructor</option>
          </select>
        </div>
        <div>
          Sort by :
          <select className={Styles["Select-Section"]}>
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
        </div>
      </div>
    </div>
  );
}
