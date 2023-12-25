import React from "react";
import coursesData from "./courses.json";
import styles from "./Frequently_Bought_Together.module.css";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import { IoIosAdd } from "react-icons/io";
const MoreFrequentlyBought = () => {
  return (
    <>
      <div className={styles["Frequently-Bought-Together-fullpage"]}>
        {coursesData.map((course) => (
          <div className={styles.row} key={course.id}>
            <div className={styles.course}>
              <div className={styles["image-section"]}>
                <img
                  src={course.image1}
                  alt={course.name}
                  className={styles.image}
                />
                <img
                  src={course.image2}
                  alt={course.name}
                  className={styles.image}
                />
              </div>
              <div>
                <div className={styles.name}>{course.name}</div>
                <div className={styles.teachers}>{course.teacher}</div>
                <div className={styles["rating-student-div"]}>
                  <div className={styles["rating"]}>
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <BsStarHalf />
                    &nbsp;&nbsp;
                    {course.rating}
                  </div>
                  <div className={styles.students}>
                    {course.students}&nbsp;Students
                  </div>
                </div>
                <div className={styles["Add-icon"]}>
                  <IoIosAdd size={25} />
                </div>
              </div>
              <div className={styles.price}>&#8377;&nbsp;{course.price}</div>
              <div className={styles.fprice}>&#8377;&nbsp;{course.fPrice}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MoreFrequentlyBought;
