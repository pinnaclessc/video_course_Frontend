import React, { useState } from "react";
import coursesData from "./courses.json";
import styles from "./Cart.module.css";
import { AiFillStar } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import MoreCoursesToBuy from "./MoreCoursesToBuy";

const StudentAlsoBought = () => {
  const addToCart = (courseId) => {
    console.log(`Added course with ID ${courseId} to cart.`);
  };

  const [showComponent, setShowComponent] = useState(false);

  const toggleComponent = () => {
    setShowComponent(!showComponent);
  };

  return (
    <>
      <div className={styles.cart}>
        <div className={styles.heading}>Students also bought</div>
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
                <div className={styles.name}>{course.duration} hours</div>
              </div>

              <div className={styles.rating}>
                &nbsp;&nbsp;{course.rating}&nbsp;&nbsp;
                <AiFillStar />
              </div>
              <div className={styles.students}>
                <BsFillPeopleFill />
                &nbsp;&nbsp;{course.students}
              </div>
              <div className={styles.price}>
                &#8377;&nbsp;&nbsp;{course.price}
              </div>
              <button
                className={styles["Add-to-cart-button"]}
                onClick={() => addToCart(course.id)}
              >
                <FaCartPlus size={30} />
              </button>
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
            <MoreCoursesToBuy />
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

export default StudentAlsoBought;
