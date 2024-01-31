import React, { useRef, useEffect, useState } from "react";
import styles from "./UpcomingCourse.module.css";
import coverImage1 from "./coverImage0101.svg";
import coverImage2 from "./coverImage0102.svg";
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
    fetch("http://13.200.156.92:8000/api/courses")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        if (Array.isArray(data)) {
          setCourse(data);
        } else {
          console.error("Data is not an array:", data);
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

  const cartHandler = () => {};
  const wishlistHandler = () => {};

  return (
    <div className={styles["UpcomingCourse-firstDiv"]}>
      <div className={styles.forbutton_div}>
        <button onClick={scrollLeft} className={styles["sliderButton-left"]}>
          <AiFillLeftCircle size={30} />
        </button>
        <div className={styles.Course_Heading}>
          &nbsp;&nbsp;Courses recommended for upcoming exams
        </div>
        <div className={styles["scroll-container"]} ref={scrollRef}>
          <div className={styles["card-wrapper"]}>
            {course &&
              course.map((data, index) => (
                <div key={data.id} className={styles["card"]}>
                  <div className={styles["Upcomming-course-fullPage"]}>
                    <div className={styles["Image-section"]}>
                      <img
                        src={coverImage1}
                        alt=""
                        width="90"
                        height="90"
                      ></img>
                      <img
                        src={coverImage2}
                        alt=""
                        width="90"
                        height="90"
                      ></img>
                    </div>
                    <div
                      className={styles["description-section"]}
                      onClick={() => navigate("/CourseDescription/" + data._id)}
                    >
                      <div className={styles["title"]}>{data.courseTitle}</div>
                      <div className={styles["teacher"]}>
                        Mr./Ms.{data.teacherName}
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
                        <div>&#8377; {data.price * 0.9}</div>
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
        <button onClick={scrollRight} className={styles["sliderButton-right"]}>
          <AiFillRightCircle size={30} />
        </button>
      </div>
    </div>
  );
}

