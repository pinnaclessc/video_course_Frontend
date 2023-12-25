import React, { useState } from "react";
import Styles from "./Profile.module.css";
import { IoIosNotificationsOutline } from "react-icons/io";
import PinnacleProfile from "./PinnacleProfile";
import ProfilePicture from "./ProfilePicture";
import PrivacySettings from "./PrivacySettings";
import Footer from "../Components/HomePage01/Footer/Footer";
import { MdOndemandVideo, MdMessage } from "react-icons/md";
import {BsBarChartFill,BsQuestionCircle,BsTriangleFill,} from "react-icons/bs";
import { TbTool } from "react-icons/tb";
import Logo from "./Pinnacle-colored-logo.svg";
import { Link,useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate=useNavigate();
  const [showPinnacleProfile, setShowPinnacleProfile] = useState(true);
  const [showProfilePicture, setShowProfilePicture] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);

  const PinnacleProfileHandler = () => {
    setShowPinnacleProfile(true);
    setShowProfilePicture(false);
    setShowPrivacySettings(false);
  };
  const ProfilePictureHandler = () => {
    setShowPinnacleProfile(false);
    setShowProfilePicture(true);
    setShowPrivacySettings(false);
  };

  const PrivacySettingHandler = () => {
    setShowPinnacleProfile(false);
    setShowProfilePicture(false);
    setShowPrivacySettings(true);
  };

  return (
    <>
      <div className={Styles["Profile-fullPage"]}>
        <div className={Styles["container01"]}>
          <div className={Styles["Box1"]}>
            <div className={Styles["Box1a"]} id="container1">
              <div className={Styles["image-icon"]}>
                <BsTriangleFill />
              </div>
              <div className={Styles["icon"]}>
                <MdOndemandVideo />
              </div>
              <div className={Styles["icon"]}>
                <MdMessage />
              </div>
              <div className={Styles["icon"]}>
                <BsBarChartFill />
              </div>
              <div className={Styles["icon"]} onClick={()=>navigate("/tools")}>
                <TbTool />
              </div>
              <div className={Styles["icon"]} onClick={()=>navigate("/resources")}>
                <BsQuestionCircle />
              </div>
            </div>
            <div className={Styles["Box1b"]} id="container2">
              <div className={Styles["image-full-icon"]}>
                <img
                  src={Logo}
                  alt=""
                  width={100}
                  height={50}
                  className={Styles["image"]}
                ></img>
                <div></div>
              </div>
              <div className={Styles["icon"]}>Course</div>
              <div className={Styles["icon"]}>Communication</div>
              <div className={Styles["icon"]}>Performance</div>
              <div className={Styles["icon"]} onClick={()=>navigate("/tools")}>Tools</div>
              <div className={Styles["icon"]} onClick={()=>navigate("/resources")}>Resourse</div>
            </div>
          </div>
        </div>
        <div className={Styles["container02"]}>
          <div className={Styles["Profile-header"]}>
            <div>Student</div>
            <div>
              <IoIosNotificationsOutline size={30} />
            </div>
            <div className={Styles["Profile-small-image"]}>
              <div className={Styles["Profile-small-text"]}>BP</div>
            </div>
          </div>
          <div className={Styles["Heading"]}>Profile & settings</div>
          <div className={Styles["profile-picture-privacy-section"]}>
            <div
              className={Styles["individual-section"]}
              onClick={PinnacleProfileHandler}
            >
              Pinnacle Profile
            </div>
            <div
              className={Styles["individual-section"]}
              onClick={ProfilePictureHandler}
            >
              Profile Picture
            </div>
            <div
              className={Styles["individual-section"]}
              onClick={PrivacySettingHandler}
            >
              Privacy settings
            </div>
          </div>
          <div className={Styles["main-body-section"]}>
            {showPinnacleProfile && <PinnacleProfile />}
            {showProfilePicture && <ProfilePicture />}
            {showPrivacySettings && <PrivacySettings />}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
