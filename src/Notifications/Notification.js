import React, { useState } from "react";
import Styles from "./Notifications.module.css";
export default function Notification() {
  const [showInMessage, setShowInMessage] = useState(true);
  const [showStMessage, setShowStMessage] = useState(false);

  const InstructorMessageData = [
    {
      id: "01",
      senderName: "Balram Pandey",
      message: "This is a Instructor test Message(Keep Learning)",
      image: "/image/teachersImage.svg",
    }
  ];

  const StudentMessageData = [
    {
      id: "01",
      senderName: "Deepa Arya",
      message: "This is a Student test Message(Keep Learning)",
      image: "/image/teachersImage.svg",
    },
    {
      id: "02",
      senderName: " Balram Pandey",
      message: "This is a  Student test Message(Keep Learning)",
      image: "/image/studentImage.svg",
    },
  ];

  const InstructorMessageHandler = () => {
    setShowInMessage(true);
    setShowStMessage(false);
  };
  const StudentMessageHandler=()=>{
    setShowInMessage(false);
    setShowStMessage(true);
    
  };

  return (
    <div className={Styles["Notification-fullPage"]}>
      <div className={Styles["Notification-Heading"]}>Notifications</div>
      <div className={Styles["Instructor-Student-div"]}>
        <div
          className={Styles["InstructorDiv"]}
          onClick={InstructorMessageHandler}
        >
          Instructor({InstructorMessageData.length})
        </div>
        <div
          className={[`${Styles.InstructorDiv} ${Styles.margin}`]}
          onClick={StudentMessageHandler}
        >
          Student({StudentMessageData.length})
        </div>
      </div>
      <div className={Styles["main-notification"]}>
        {showInMessage && (
          <div>
            {InstructorMessageData.map((data) => {
              return (
                <div className={Styles["Student-message-div"]}>
                  <div className={Styles["image-div"]}>
                    <img
                      src={data.image}
                      alt=""
                      className={Styles["notification-image"]}
                    ></img>
                  </div>
                  <div className={Styles["message-div"]}>{data.message}</div>
                </div>
              );
            })}
          </div>
        )}
        {showStMessage &&(
          <div>
            {StudentMessageData.map((data) => {
              return (
                <div className={Styles["Student-message-div"]}>
                  <div className={Styles["image-div"]}>
                    <img
                      src={data.image}
                      alt=""
                      className={Styles["notification-image"]}
                    ></img>
                  </div>
                  <div className={Styles["message-div"]}>{data.message}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
