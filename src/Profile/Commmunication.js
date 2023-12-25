import React, { useState } from "react";
import Styles from "./Communication.module.css";
import { IoIosNotificationsOutline } from "react-icons/io";
import QandA from "./QandA";
import Message from "./Message";
import Assignments from "./Assignments";
import Announcement from "./Announcement";
import Footer from "../Components/HomePage01/Footer/Footer";

export default function Commmunication() {
  const [showQA, setShowQA] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [showAssignments, setShowAssignments] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  const QAHandler = () => {
    setShowQA(true);
    setShowMessage(false);
    setShowAssignments(false);
    setShowAnnouncement(false);
  };
  const MessageHandler = () => {
    setShowQA(false);
    setShowMessage(true);
    setShowAssignments(false);
    setShowAnnouncement(false);
  };
  const AssignmentsHandler = () => {
    setShowQA(false);
    setShowMessage(false);
    setShowAssignments(true);
    setShowAnnouncement(false);
  };
  const AnnouncementHandler = () => {
    setShowQA(false);
    setShowMessage(false);
    setShowAssignments(false);
    setShowAnnouncement(true);
  };

  return (
    <>
    <div className={Styles["Commmunication-fullPage"]}>
      <div className={Styles["Commmunication-container1"]}>
        <div className={Styles["container1-box1"]}></div>
        <div className={Styles["container1-box2"]}>
          <div className={Styles["heading"]} onClick={QAHandler}>
            Q&A
          </div>
          <div className={Styles["heading"]} onClick={MessageHandler}>
            Message
          </div>
          <div className={Styles["heading"]} onClick={AssignmentsHandler}>
            Assignments
          </div>
          <div className={Styles["heading"]} onClick={AnnouncementHandler}>
            Announcement
          </div>
        </div>
      </div>
      <div className={Styles["Commmunication-container2"]}>
        <div className={Styles["container2-box1"]}>
          <div className={Styles["Profile-header"]}>
            <div>Student</div>
            <div>
              <IoIosNotificationsOutline size={30} />
            </div>
            <div className={Styles["Profile-small-image"]}>
              <div className={Styles["Profile-small-text"]}>BP</div>
            </div>
          </div>
        </div>
        <div className={Styles["container2-box2"]}>
          {showQA && <QandA />}
          {showMessage && <Message />}
          {showAssignments && <Assignments />}
          {showAnnouncement && <Announcement />}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
