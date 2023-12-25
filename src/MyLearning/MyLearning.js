import React, { useState,useEffect,useRef } from "react";
import styles from "./MyLearning.module.css";
// import sscLogo from "./ssc-logo.webp";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { AiFillLeftCircle , AiFillRightCircle } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const MyLearning = () => {
    const userId=JSON.parse(localStorage.getItem("user"))._id
    console.log(userId)

    const navigate = useNavigate();
    const [isHovering2, setIsHovering2] = useState(false);
    // const [comments, setComments] = useState([])
    const [course, setCourse] = useState();
    const scrollRef = useRef(null);
  
    useEffect(() => {
      fetch(`http://localhost:8000/purchased-courses/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched data:", data);
          if (Array.isArray(data)) {
            setCourse(data);
          } else {
            console.log("Data is not an array:", data);
            setCourse([]);
          }
        })
        .catch((error) => console.error("Error fetching products:", error));
    }, []);
  
    const scrollLeft = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({
          left:-270,
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
    <div className={styles["myLearning-fullPage"]}>
        <div className={styles["relatated-course"]}>
        {/* **********copy from most popular course******** */}
        <div className={styles["mostPopular-div"]}>
          <button onClick={scrollLeft} className={styles["sliderButton-left"]}>
            <AiFillLeftCircle size={30} />
          </button>
          <div className={styles["Course_Heading"]}>
            Courses to get you started
          </div>
          <div className={styles["scroll-container"]} ref={scrollRef}>
            <div className={styles["card-wrapper"]}>

              {/* $$$$$$$$$$$$$ */}
              {course &&
              course.map((data, index) =>(
                <div
                  key={data.id}
                  className={styles["card"]}
                  onClick={() => navigate("/CourseDescription/"+data._id)}
                >
                  <div className={styles["Upcomming-course-fullPage"]}>
                    <div className={styles["Image-section"]}>
                      <img src='https://randompicturegenerator.com/img/national-park-generator/g8ba441dcbd0fce39f3219eb3ccce28dbe9933717974761332aabc6197b71c5757eda52389e730a94a7498971c5b6ecde_640.jpg' alt="" width="90" height="90"></img>
                      <img src='https://randompicturegenerator.com/img/national-park-generator/gca0d3064a837b1f03550658a44aa1a0054c1da3ad0f423377380f1920f2a2362bc5e5a9fb8b5b7bf2fe0e970cf532570_640.jpg' alt="" width="90" height="90"></img>
                    </div>
                    <div className={styles["description-section"]}>
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
                      <div className={styles["StarRating"]}>
                        {/* {isHovering2 && <Star/>} */}
                      </div>
                      <div className={styles["price-fprice-div"]}>
                        <div>&#8377;{data.price}</div>
                        <div>
                          &nbsp;&nbsp;&nbsp;&nbsp;<s>&#8377;{data.mrp}</s>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}


              {/* ############# */}
            </div>
          </div>
          <button
            onClick={scrollRight}
            className={styles["sliderButton-right"]}
          >
            <AiFillRightCircle size={30} />
          </button>
        </div>
        {/* ******************************************** */}
      </div>
        
    </div>
  )
}

export default MyLearning
