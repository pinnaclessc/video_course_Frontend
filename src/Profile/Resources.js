import React from "react";
import Styles from "./Tools.module.css";
import { GiTeacher } from "react-icons/gi";
import { AiOutlineComment } from "react-icons/ai";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import Footer from "../Components/HomePage01/Footer/Footer";
export default function Resources() {
  return (
    <div className={Styles["Tools-fullPage"]}>
      <div className={Styles["heading"]}>Resources</div>
      <div className={Styles["Main-Body"]}>
        <div className={Styles["Body-part-01"]}>
          <GiTeacher size={40} />
          <h4>Teaching Center</h4>
          <p className={Styles["tools-Para"]}>
            Find articles on Pinnacle teaching — from course creation to
            marketing.
          </p>
        </div>
        <div className={Styles["Body-part-01"]}>
          <AiOutlineComment size={40} />
          <h4>Instructor Community</h4>
          <p className={Styles["tools-Para"]}>
            Share your progress and ask other instructors questions in our
            community.
          </p>
        </div>
        <div className={Styles["Body-part-01"]}>
          <BsFillQuestionSquareFill size={40} />
          <h4>Help and Support</h4>
          <p className={Styles["tools-Para"]}>
            Can’t find what you need? Our support team is happy to help..
          </p>
        </div>
      </div>
    </div>
  );
}
