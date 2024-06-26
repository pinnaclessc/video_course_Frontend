import React, { useRef, useEffect, useState } from "react";
import styles from "./UpcomingCourse.module.css";

import {
  AiFillLeftCircle,
  AiFillRightCircle,
  AiFillStar,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function UpcomingCourse() {
  // const userId = JSON.parse(localStorage.getItem('user'))._id;
  const navigate = useNavigate();
  const [course, setCourse] = useState();
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch("https://auth.ssccglpinnacle.com/api/recent-courses")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCourse(data);
        } else {
          setCourse([]);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -280,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 280,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles["UpcomingCourse-firstDiv"]}>
      <div className={styles.forbutton_div}>
        <button onClick={scrollLeft} className={styles["sliderButton-left"]}>
          <AiFillLeftCircle size={30} />
        </button>
        <div className={styles.Course_Heading}>Recently Launched Course
        </div>
        <div className ={styles["main-card-wrapper"]}>
        <div className={styles["scroll-container"]} ref={scrollRef}>
          <div className={styles["card-wrapper"]}>
            {course &&
              course.map((data) => (
                <div key={data._id} className={styles["card"]}>
                  <div className={styles["Upcomming-course-fullPage"]}>
                  <div className={styles["Image-section"]} onClick={() => navigate("/CourseDescription/" + data._id)}>
                    
                      <img className={styles.imagecard}
                        src={data.hindiCoverImage}
                        alt=""
                        width="90"
                        height="90"
                      ></img>
                      <img className={styles.imagecard}
                        src={data.englishCoverImage}
                        alt=""
                        width="90"
                        height="90"
                      ></img>
                    </div>
                    <div
                      className={styles["description-section"]}
                      onClick={() => 
                        navigate("/CourseDescription/" + data._id)}
                    >
                      <div className={styles["title"]}>{data.courseTitle}</div>
                      <div className={styles["teacher"]}>
                        Mr./Ms.{data.instructorName}
                      </div>
                      <div className={styles["try-for-free"]}>
                        <div className={styles["Rating"]}>
                          <div className={styles["Star-Rating"]}>
                            {data.rating}
                            <div className={styles["For-Star-div"]}>
                              <AiFillStar
                                className={styles["Star-Rating-1"]}
                                color="white"
                                fontSize="1em"
                              />
                            </div>
                          </div>
                          <div className={styles["Total-Rating"]}>(128)</div>
                        </div>
                      </div>
                      <div className={styles["price-fprice-div"]}>
                        <div>&#8377; {data.mrp}</div>
                        <div>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <s>&#8377;{data.price}</s>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        </div>
        <button onClick={scrollRight} className={styles["sliderButton-right"]}>
          <AiFillRightCircle size={30} />
        </button>
      </div>
    </div>
  );
}