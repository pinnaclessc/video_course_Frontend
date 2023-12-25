import React from "react";
import classes from "./FacultyComponent.module.css";
import image from "./TeacherImage.svg";
import {BsFillStarFill} from "react-icons/bs";
import {BsSearch} from "react-icons/bs";
import{IoMdContacts} from "react-icons/io";
import{BiPlayCircle} from "react-icons/bi";

export default function FacultyComponent() {
  return (
    <div className={classes["FacultyComponent-fullPage"]}>
      <div className={classes["FacultyComponent-review"]}>
        <div className={classes["FacultyComponent-review-heading"]}>Faculty</div>
        <div className={classes["FacultyComponent-review-heading"]}>Ram Niwas sir</div>
        <div className={classes["sub-heading"]}>Senior faculty maths</div>
        <div className={classes["image-section"]}>
          <div className={classes["Image"]}>
            <img src={image} alt="Img" width="200" height="200"></img>
          </div>
          <div>
            <div className={classes["Name"]}> <BsFillStarFill size={20}/> &nbsp;&nbsp;4.7 faculty Rating</div>
            <div className={classes["reviews"]}><BsSearch size={20}/>&nbsp;&nbsp;2,356 Reviews</div>
            <div className={classes["student"]}><IoMdContacts size={20}/> &nbsp;&nbsp;9,178 Students</div>
            <div className={classes["courses"]}><BiPlayCircle size={20}/>&nbsp;&nbsp;4 Courses</div>
          </div>
        </div>
        <div className={classes["description-section"]}>
          My name is Ramniwas. I am teaching maths since last 8 years. I have
          mentored more than 1 lakh students for competitive exams online and
          offline.
        </div>
        <div className={classes["description-section"]}>
          My name is Ramniwas. I am teaching maths since last 8 years. I have
          mentored more than 1 lakh students for competitive exams online and
          offline.
        </div>
        <div className={classes["description-section"]}>
          My name is Ramniwas. I am teaching maths since last 8 years. I have
          mentored more than 1 lakh students for competitive exams online and
          offline.
        </div>
      
      </div>
    </div>
  );
}
