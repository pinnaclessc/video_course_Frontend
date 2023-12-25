import React, { useRef, useEffect, useState } from "react";
import commentsData from "./comments.json";
import styles from "./MostPopularCourses.module.css";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import Star from "../Star/Star";
import { useNavigate } from "react-router-dom";

export default function UpcomingCourse() {
  const navigate = useNavigate();
  const [isHovering2, setIsHovering2] = useState(false);
  const [comments, setComments] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    setComments(commentsData);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -270,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 270,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles["mostPopular-div"]}>
      <button onClick={scrollLeft} className={styles["sliderButton-left"]}>
        <AiFillLeftCircle size={30} />
      </button>
      <div className={styles.Course_Heading}>
        &nbsp;&nbsp;Most popular courses{" "}
      </div>
      <div className={styles["scroll-container"]} ref={scrollRef}>
        <div className={styles["card-wrapper"]}>
          {comments.map((data) => (
            <div
              key={data.id}
              className={styles["card"]}
              onClick={() => navigate("/page02")}
            >
              <div className={styles["Recently-launched-course-fullPage"]}>
                <div className={styles["Image-section"]}>
                  <img src={data.image} alt="" width="90" height="90"></img>
                  <img src={data.imageUrl} alt="" width="90" height="90"></img>
                </div>
                <div className={styles["description-section"]}>
                  <div className={styles["title"]}>{data.title}</div>
                  <div className={styles["teacher"]}>
                    Mr./Ms. {data.teacher}
                  </div>
                  <div className={styles["try-for-free"]}>
                    <div className={styles["Rating"]}>
                      <div className={styles["Star-Rating"]}>
                        4.8
                        <div className={styles["For-Star-div"]}>
                          {" "}
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
                  <div className={styles["StarRating"]}>
                    {isHovering2 && <Star />}
                  </div>
                  <div className={styles["price-fprice-div"]}>
                    <div>&#8377;{data.price}</div>
                    <div>
                      &nbsp;&nbsp;&nbsp;&nbsp;<s>&#8377;{data.fprice}</s>
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
  );
}
