import React, { useState } from "react";
import coursesData from "./courses.json";
import styles from "./Frequently_Bought_Together.module.css";
import MoreFrequentlyBought from "./MoreFrequentlyBought";
import { BsStarHalf } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import {IoIosAdd} from 'react-icons/io'

const Frequently_Bought_Together = () => {
  // const addToCart = (courseId) => {
  //   console.log(`Added course with ID ${courseId} to cart.`);
  // };
  const [showComponent, setShowComponent] = useState(false);
  const toggleComponent = () => {
    setShowComponent(!showComponent);
  };

  return (
    <>
      <div className={styles["Frequently-Bought-Together-fullpage"]}>
        <div className={styles.heading}>Frequently Bought Together</div>
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
      <div className={styles["Show-More-FullPage"]}>
        {!showComponent && (
          <button onClick={toggleComponent} className={styles["Show-More-btn"]}>
            Show More
          </button>
        )}
        {showComponent && (
          <div>
            <MoreFrequentlyBought/>
            <button
              onClick={toggleComponent}
              className={styles["Show-More-btn"]}
            >
              Show Less
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Frequently_Bought_Together;
