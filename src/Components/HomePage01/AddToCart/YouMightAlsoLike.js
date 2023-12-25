import React, { useRef, useEffect, useState } from "react";
import commentsData from "../Body/comments.json";
import styles from "./YouMightAlsoLike.module.css";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import Star from "../Star/Star";
import {useNavigate } from "react-router-dom";

export default function UpcomingCourse() {
  const navigate=useNavigate();
  const [isHovering2, setIsHovering2] = useState(false);
  const [comments, setComments] = useState([]);
  const scrollRef = useRef(null);


  useEffect(() => {
    setComments(commentsData);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200,
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
        <div className={styles["scroll-container"]} ref={scrollRef}>
          <div className={styles["card-wrapper"]}>
            {comments.map((data) => (
              <div key={data.id} className={styles["card"]}>
                <div className={styles["Upcomming-course-fullPage"]}>
                  <div className={styles["Image-section"]}>
                    <img src={data.image} width="90" height="90" alt=""></img>
                    <img src={data.imageUrl} width="90" height="90" alt=""></img>
                  </div>
                  <div className={styles["description-section"]} onClick={()=>navigate("/page02")}>
                    <div className={styles["title"]}>{data.title}</div>
                    <div className={styles["teacher"]}>
                      Mr./Ms. {data.teacher}
                    </div>
                    {/* <div className={styles["rating"]}>{data.rating} Rated</div> */}
                    <div className={styles["try-for-free"]}>
                      <div
                        className={styles["Rating"]}

                        // onMouseOver={handleMouseOver2}
                        // onMouseOut={handleMouseOut2}
                      >
                        <div className={styles["Star-Rating"]}>
                          {" "}
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
                      {/* <button className="button-for-digital button5">
                      Try for free now
                    </button> */}
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
    </div>
  );
}
