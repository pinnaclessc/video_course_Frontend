import React, { useState, useEffect } from "react";
import styles from "./Details.module.css";
import { MdLanguage, MdOutlineClosedCaptionOff } from "react-icons/md";
import { BsStarHalf } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
export default function Details() {
  const [courseTitle, setCourseTitle] = useState();
  const [courseDetails, setCourseDetails] = useState();
  const [teacherName, setTeacherName] = useState();
  const [rating, setRating] = useState();
  const [price, setPrice] = useState();
  const [mrp, setMrp] = useState();
  const params = useParams();
  useEffect(() => {
    getCourseDetails();
  }, []);
    const getCourseDetails = async () => {
    let result = await fetch(`http://13.200.156.92:8000/course/${params.id}`);
    result = await result.json();
    console.log(result);
    setCourseTitle(result.title);
    setCourseDetails(result.shortDescription);
    setTeacherName(result.instructorName);
    setRating(result.rating);
    setPrice(result.price);
    setMrp(result.mrp);
  };
  return (

    <div className={styles["Details-fullpage"]}>
      <div>
        <div className={styles["heading"]}>
          {courseTitle}
        </div>
        <div className={styles["description"]}>
          {courseDetails}
        </div>
        <div className={styles["Faculty"]}>Faculty : {teacherName}</div>
        <div className={styles["bestSeler-div"]}>
          <div>
            <button className={styles["bestSeler-btn"]}>Best Seller</button>
          </div>
          <div className={styles["rate"]}>
            <AiFillStar className={styles.ratingStar} />
            <AiFillStar className={styles.ratingStar} />
            <AiFillStar className={styles.ratingStar} />
            <AiFillStar className={styles.ratingStar} />
            <BsStarHalf className={styles.ratingStar} />
            &nbsp;&nbsp;232 Rating
          </div>
          <div className={styles["Students"]}>6219 students</div>
        </div>
        <div className={styles["language-caption-div"]}>
          <div className={styles["language-icon"]}>
            <MdLanguage size={30} />
          </div>
          <div>Hinglish</div>
          <div>
            <MdOutlineClosedCaptionOff size={30} />
          </div>
          <div>Hindi, English,Bengali,Telgu,Tamil, 3 more</div>
        </div>
      </div>
    </div>
  );
}
