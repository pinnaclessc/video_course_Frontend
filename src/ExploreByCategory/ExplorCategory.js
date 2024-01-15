import React, { useRef, useEffect, useState } from "react";
import Header from "../Components/HomePage01/Header/Header";
import Footer from "../Footer02.js/Footer";
import styles from "./ExplorCategory.module.css";
import image from "./ssc-logo.webp";
import { Link } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import data from "./data.json";
import { AiFillLeftCircle , AiFillRightCircle } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
export default function ExplorCategory() {
  // copy from most popular course
  const navigate = useNavigate();
  const [isHovering2, setIsHovering2] = useState(false);
  const [comments, setComments] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    setComments(data);
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
  // *********************

  return (
    <div className={styles["EC-page-wraper"]}>
      {/* EM-NavBar */}
      <div className={styles["EM-NavBar"]}>
      <div className={styles["EM-navLinks"]}><Link to='/exploreMore' className={styles["EM-navLink"]}>&nbsp;&nbsp;SSC&nbsp;&nbsp;</Link></div>
      <div><MdOutlineArrowForwardIos/></div>
      <div className={styles["EM-navLinks"]}><Link to='/railwayExploreMore' className={styles["EM-navLink"]}>&nbsp;&nbsp;Railway&nbsp;&nbsp;</Link></div>
      <div><MdOutlineArrowForwardIos/></div>
      <div className={styles["EM-navLinks"]}><Link to='/railwayExploreMore' className={styles["EM-navLink"]}>&nbsp;&nbsp;Bank&nbsp;&nbsp;</Link></div>
      <div><MdOutlineArrowForwardIos/></div>
      <div className={styles["EM-navLinks"]}><Link to='/railwayExploreMore' className={styles["EM-navLink"]}>&nbsp;&nbsp;Other Exams&nbsp;&nbsp;</Link></div>
      </div>
     {/* *****************/}
     {/* image and details section*/}
      <div className={styles["image-brifDetails-wraper"]}>
        <div className={styles["image-wraper"]}>
          <img
            src={image}
            alt="SSCLogo"
            className={styles["image-wraper"]}
          ></img>
        </div>
        <div className={styles["details-wraper"]}>
          <p>
            SSC is a highly competitive exam in India because lakhs of students
            appear for the exam to fulfill thousands of vacancies. The level of
            competition is quite high. hence the preparation should be done
            beforehand to ace the exam.
          </p>
          <div>
            <Link to="/exploremore" className={styles["EC-navLink"]}>Explore More</Link>
          </div>
        </div>
      </div>
      {/* Courses to get you started */}
      {/* <div className={styles["EC-heading"]}>Courses to get you started</div> */}
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
              {data.map((data) => (
                <div
                  key={data.id}
                  className={styles["card"]}
                  onClick={() => navigate("/page02")}
                >
                  <div className={styles["Recently-launched-course-fullPage"]}>
                    <div className={styles["Image-section"]}>
                      <img src={data.image} alt="" width="90" height="90"></img>
                      <img
                        src={data.imageUrl}
                        alt=""
                        width="90"
                        height="90"
                      ></img>
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
                      {/* <div className={styles["StarRating"]}>
                    {isHovering2 && <Star />}
                  </div> */}
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
          <button
            onClick={scrollRight}
            className={styles["sliderButton-right"]}
          >
            <AiFillRightCircle size={30} />
          </button>
        </div>
        {/* ******************************************** */}
      </div>
      <div className={styles["relatated-exam-List"]}>
        <div className={styles["EC-heading"]}> More Exams</div>
        <div className={styles["EC-examDiv"]}>
          <div className={styles["Indi-exam"]}>
            SSC CGL – Combined Graduate Level.
          </div>
          <div className={styles["Indi-exam"]}>
            SSC GD – Constable, General Duty.
          </div>
          <div className={styles["Indi-exam"]}>
            SSC CHSL – Combined Higher Secondary Level.
          </div>
          <div className={styles["Indi-exam"]}>SSC JE – Junior Engineer.</div>
          <div className={styles["Indi-exam"]}>
            SSC CPO – Central Police Organisation.
          </div>
          <div className={styles["Indi-exam"]}>
            SSC MTS – Multitasking Staff.
          </div>
          <div className={styles["Indi-exam"]}>
            SSC Stenographer 'C' and 'D'
          </div>
          <div className={styles["Indi-exam"]}>
            SSC JHT – Junior Hindi Translator.
          </div>
        </div>
      </div>
    </div>
  );
}
