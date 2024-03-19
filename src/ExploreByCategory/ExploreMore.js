// ExploreMore For SSC
import React, { useState,useEffect,useRef } from "react";
import styles from "./ExploreMore.module.css";
import sscLogo from "./ssc-logo.webp";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { AiFillLeftCircle , AiFillRightCircle } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
export default function ExploreMore() {
  const [cgl, setCgl] = useState(true);
  const [chsl, setChsl] = useState(false);
  const [mts, setMts] = useState(false);
  const [sten, setSten] = useState(false);
  const [cpo, setCpo] = useState(false);
  const [je, setJe] = useState(false);
  const [jht, setJht] = useState(false);

  const cglHandler = () => {
    setCgl(true);
    setChsl(false);
    setMts(false);
    setCpo(false);
    setJe(false);
    setJht(false);
    setSten(false);
  };
  const chslHandler = () => {
    setCgl(false);
    setChsl(true);
    setMts(false);
    setCpo(false);
    setJe(false);
    setJht(false);
    setSten(false);
  };
  const mtsHandler = () => {
    setCgl(false);
    setChsl(false);
    setMts(true);
    setCpo(false);
    setJe(false);
    setJht(false);
    setSten(false);
  };
  const stenHandler = () => {
    setCgl(false);
    setChsl(false);
    setMts(false);
    setCpo(false);
    setJe(false);
    setJht(false);
    setSten(true);
  };
  const cpoHandler = () => {
    setCgl(false);
    setChsl(false);
    setMts(false);
    setCpo(true);
    setJe(false);
    setJht(false);
    setSten(false);
  };
  const jeHandler = () => {
    setCgl(false);
    setChsl(false);
    setMts(false);
    setCpo(false);
    setJe(true);
    setJht(false);
    setSten(false);
  };
  const jhtHandler = () => {
    setCgl(false);
    setChsl(false);
    setMts(false);
    setCpo(false);
    setJe(false);
    setJht(true);
    setSten(false);
  };

    // copy from most popular course
    const navigate = useNavigate();
    const [isHovering2, setIsHovering2] = useState(false);
    // const [comments, setComments] = useState([])
    const [course, setCourse] = useState();
    const scrollRef = useRef(null);
  
    useEffect(() => {
      fetch("http://13.200.156.92:8000/courses/ssc")
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
    <>
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
      <div className={styles["ssc-category-div"]}>
        <div className={styles["BackBtn"]}>
          <Link to="/exploreByCategory" className={styles["BackBtn-Link"]}>
            <IoMdArrowBack />
            &nbsp;&nbsp;Back&nbsp;&nbsp;
          </Link>
        </div>
        <div className={styles["EM-header"]}>
          <div className={styles["EM-header-container01"]}>
            <img src={sscLogo} alt="sscLogo" className={styles["EM-image"]}></img>
          </div>
          <div className={styles["EM-header-container02"]}>
            <div className={styles["EM-header-heading"]}>
              SSC(Staff Selection Commission)
            </div>
            <div className={styles["EM-header-para"]}>
              SSC is a highly competitive exam in India because lakhs of students
              appear for the exam to fulfill thousands of vacancies. The level of
              competition is quite high. hence the preparation should be done
              beforehand to ace the exam.
            </div>
          </div>
        </div>

        <div className={styles["EM-body"]}>
          <div className={styles["EM-body-container1"]}>
            <div className={styles["EM-body-buttons"]}>
              <button
                className={styles["EM-header-indi-butBtn"]}
                onClick={cglHandler}
              >
                SSC CGL (Combined Graduate Level)
              </button>
            </div>
            <div className={styles["EM-body-buttons"]}>
              <button
                className={styles["EM-header-indi-butBtn"]}
                onClick={chslHandler}
              >
                SSC CHSL (Combined Higher Secondary Level)
              </button>
            </div>
            <div className={styles["EM-body-buttons"]}>
              <button
                className={styles["EM-header-indi-butBtn"]}
                onClick={mtsHandler}
              >
                SSC Multitasking (Non-Technical)
              </button>
            </div>
            <div className={styles["EM-body-buttons"]}>
              <button
                className={styles["EM-header-indi-butBtn"]}
                onClick={stenHandler}
              >
                SSC Stenographers Grade 'C' & 'D'
              </button>
            </div>
            <div className={styles["EM-body-buttons"]}>
              <button
                className={styles["EM-header-indi-butBtn"]}
                onClick={cpoHandler}
              >
                SSC CPO(Central Police Organization)
              </button>
            </div>
            <div className={styles["EM-body-buttons"]}>
              <button
                className={styles["EM-header-indi-butBtn"]}
                onClick={jeHandler}
              >
                SSC JE(Junior Engineer)
              </button>
            </div>
            <div className={styles["EM-body-buttons"]}>
              <button
                className={styles["EM-header-indi-butBtn"]}
                onClick={jhtHandler}
              >
                SSC Junior Hindi Translator
              </button>
            </div>
          </div>
          <div className={styles["EM-body-container2"]}>
            {/* cgl handler */}
            {cgl && (
              <div>
                SSC CGL is conducted to recruit candidates to various posts in
                departments, ministries, and organizations of the Government of
                India. SSC CGL examination is conducted by Staff Selection
                Commission to select staff for various Group B and Group C posts.
                <div className={styles["EM-header-heading"]}>
                  SSC CGL Recruitment Process
                </div>
                <div className={styles["EM-header-para"]}>
                  a) Tier 1: Preliminary Examination (Online)
                </div>
                <div className={styles["EM-header-para"]}>
                  b) Tier 2: Mains Examination (Online)
                </div>
                <div className={styles["EM-header-para"]}>
                  c) Tier 3: Descriptive Examination (Offline)
                </div>
                <div className={styles["EM-header-para"]}>
                  d) Tier 4: Data Entry Skill Test/ Computer Proficiency Test
                </div>
              </div>
            )}
            {/* chsl handler */}
            {chsl && (
              <div>
                <div>
                  Every year, SSC conducts recruitment for the posts of Data Entry
                  Operator (DEO), Lower Division Clerk (LDC), Postal
                  Assistants/Sorting Assistants (PA/SA) in various Central
                  Government Departments and Ministries.
                </div>
                <div className={styles["EM-header-heading"]}>
                  SSC CHSL Recruitment Process
                </div>
                <div className={styles["EM-header-para"]}>
                  a) Tier 1 (Computer Based Test)
                </div>
                <div className={styles["EM-header-para"]}>
                  b) Tier 2 (Descriptive Paper)
                </div>
                <div className={styles["EM-header-para"]}>
                  c) Tier 3 (Typing and Skill Test)
                </div>
              </div>
            )}
            {/* mts handler */}
            {mts && (
              <div>
                <div>
                  The Staff Selection Commission conducts the MTS exam to recruit
                  Multi Tasking Staff (MTS), a General Central Service Group C
                  Non-Gazetted, Non-Ministerial post in various departments,
                  ministries, and offices of the Government of India, in different
                  States and Union Territories.
                </div>
                <div className={styles["EM-header-heading"]}>
                  SSC Multitasking Recruitment Process
                </div>
                <div className={styles["EM-header-para"]}>
                  a) Paper-I (Computer Based Exam, Objective Type)
                </div>
                <div className={styles["EM-header-para"]}>
                  b) Paper-II (Descriptive)
                </div>
              </div>
            )}
            {/* cgl handler */}
            {sten && (
              <div>
                <div>
                  The SSC conducts an Open Competitive Examination every year to
                  recruit Stenographer Grade' C' (Group 'B', Non Gazetted) and
                  Stenographer Grade 'D' (Group 'C') for various ministries,
                  departments, and organizations in the Government of India.
                </div>
                <div className={styles["EM-header-heading"]}>
                  SSC Stenographers Grade 'C' & 'D' Recruitment Process
                </div>
                <div className={styles["EM-header-para"]}>
                  a) Online Computer Based Exam
                </div>
                <div className={styles["EM-header-para"]}>b) Skill Test</div>
              </div>
            )}
            {/* junior Engineer handler */}
            {je && (
              <div>
                <div>
                  The SSC JE examination is conducted to recruit Junior Engineers
                  (Civil, Electrical, Mechanical, and Quantity Surveying &
                  Contracts) for various departments, ministries, and
                  organizations in the Government of India.{" "}
                </div>
                <div className={styles["EM-header-heading"]}>
                  SSC JE Recruitment Process
                </div>
                <div className={styles["EM-header-para"]}>
                  a) Paper-I (Computer Based Examination)
                </div>
                <div className={styles["EM-header-para"]}>
                  b) Paper-II (Descriptive Type)
                </div>
              </div>
            )}
            {/* junior hindi Translator handler */}
            {jht &&(
              <div>
                <div>
                  The Staff Selection Commission conducts this examination to
                  recruit Junior Translator, Junior Hindi Translator, Senior Hindi
                  Translator, and Hindi Pradhyapak for various government
                  departments. The various posts are:
                </div>
                <div className={styles["EM-header-para"]}>
                  a) Junior Translator in Central Secretariat Official Language
                  Service (CSOLS).
                </div>
                <div className={styles["EM-header-para"]}>
                  b) Junior Translator in Armed Forces Headquarters (AFHQ)
                </div>
                <div className={styles["EM-header-para"]}>
                  c) Junior Translator in M/o Railways (Railway Board)
                </div>
                <div className={styles["EM-header-para"]}>
                  d) Hindi Pradhyapak in Central Hindi Training Institute (CHTI)
                </div>
                <div className={styles["EM-header-para"]}>
                  e) Senior Hindi Translator in several Central Government
                  departments, ministries, and offices.
                </div>
                <div className={styles["EM-header-heading"]}>
                  SSC Junior Hindi Translator Recruitment Process
                </div>
                <div className={styles["EM-header-para"]}>
                  a) Paper 1: (Computer-Based Examination-Objective Type)
                </div>
                <div className={styles["EM-header-para"]}>
                  b) Paper-2: Translation and Essay
                </div>
              </div>
            )}
            {/* cpo handler */}
            {cpo &&(
              <div>
                <div>
                  The SSC CPO examination is conducted to recruit candidates for
                  the post of Sub-inspector (SI) and Central Armed Police Forces
                  (CAPFs) of Police. The exam is conducted on a national level for
                  various Police Organisations like ITBP, BSF, CRPF, and SI in
                  Delhi Police, etc.
                </div>
                <div className={styles["EM-header-heading"]}>
                  SSC CPO Recruitment Process
                </div>
                <div className={styles["EM-header-para"]}>a) Paper-I</div>
                <div className={styles["EM-header-para"]}>
                  b) Physical Standard Test (PST)/ Physical Endurance Test (PET)
                </div>
                <div className={styles["EM-header-para"]}>c) Paper-II</div>
                <div className={styles["EM-header-para"]}>
                d) Medical Examination(DME).
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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
    </>
  );
}
