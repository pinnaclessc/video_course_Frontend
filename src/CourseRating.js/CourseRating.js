import React from "react";
import CourseData from "./CourseRaing.json";
import Styles from "./CourseRating.module.css";
import { BsStarFill } from "react-icons/bs";
import { Link} from "react-router-dom";




export default function CourseRating() {

  return (
    <>
      <div className={Styles["CourseRating-heading"]}>
        <div className={Styles["Total-Ratings"]}>
          <BsStarFill className={Styles["Rating-Star"]} />
          {4.7} Course rating
        </div>
        <div className={Styles["Total-Ratings"]}>{1298} Ratings</div>
      </div>
      <div className={Styles["CourseRating-fullPage"]}>
        {CourseData.map((data) =>(
          <div className={Styles["CourseRating-mainDiv"]}>
            <div className={Styles["CourseRating-SubHeading"]}>
              <div className={Styles["user-black-div"]}>
                {data.username.charAt(0)}
              </div>
              <div className={Styles["username-rating-div"]}>
                <div className={Styles[""]}>{data.username}</div>
                <div className={Styles[""]}>
                  {data.rating} <BsStarFill className={Styles["Rating-Star"]} />
                  Rated
                </div>
              </div>
            </div>
            <div className={Styles["comment-div"]}>{data.comment}</div>
          </div>
        ))}
      </div>
    </>
  );
}
