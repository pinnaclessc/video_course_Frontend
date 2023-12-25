import React from "react";
import Styles from "./Announcement.module.css";

export default function Announcement() {
  const AnnouncementData = [
 {}
  ];

  if (AnnouncementData.length === 0) {
    return (
      <div className={Styles["Announcement-empty-fullPage"]}>
        <div className={Styles["Announcement-heading"]}>Announcements</div>
        <div className={Styles["empty-cart-section"]}>
          <div className={Styles["emptyCart-imageDiv"]}>
            <img
              src="/image/carousel02.jpg"
              alt=""
              className={Styles["emptyCart-image"]}
            ></img>
          </div>
          <div>
            <h4>
              <i>No announcements yet</i>
            </h4>
          </div>
          <div className={Styles["emptyCart-description"]}>
            Here’s where you can send your students a few email announcements
            every month. Use educational emails to support your students’
            learning. Use promotional emails to market your courses.
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={Styles["Announcement-full-Page"]}>
      <div className={Styles["Announcement-heading"]}>Announcements</div>
      <div>This is run when AnnouncementData has Data</div>
    </div>
  );
}
