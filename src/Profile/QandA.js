import React from "react";
import Styles from "./QandA.module.css";

export default function QandA() {
  const QandAdata = [
    // {
    //   id: "q1",
    //   question:
    //     "I Have Only 3 Months To PrePaire for SSC(CHSL) please Guide Me",
    //   answer:
    //     "You Can PrePaire With The Help Of Pinnacle video Course in Less Time",
    //   student: "Monika",
    //   Teacher: "Ramniwash Sir",
    //   studentImage: "/image/studentImage.svg",
    //   TeacherImage: "/image/teachersImage.svg",
    // },
    // {
    //   id: "q2",
    //   question:
    //     "Explain More About Dom-manipulation",
    //   answer:
    //     "Please watch Video-lecture-768",
    //   student: "Shree",
    //   Teacher: "Ramniwash Sir",
    //   studentImage: "/image/studentImage.svg",
    //   TeacherImage: "/image/teachersImage.svg",
    // },
  ];
  if (QandAdata.length === 0) {
    return (
      <div className={Styles["QandA-empty-fullPage"]}>
        <div className={Styles["HEADING"]}> Q&A</div>
        <div className={Styles["empty-body-div"]}>
          <div>
            <img src="/image/carousel02.jpg" alt="" className={Styles["qna-image"]}></img>
          </div>

          {/* <p>
            <b>
              <i>“Without questions, there is no learning.”</i> : W. Edwards
              Deming
            </b>
          </p> */}
          <div>
            <p className={Styles["qna-para"]}>
              Q&A is a forum where your students can ask questions,
              <br /> hear your responses, and respond to one another.
              <br /> Here’s where you’ll see your courses’ Q&A threads
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {QandAdata.map((data) => {
        return (
          <div className={Styles["QandA-fullPage"]}>
            <div className={Styles["student-Question-div"]}>
              <div className={Styles["Student-div"]}>
                <div className={Styles["Student-img-div"]}>
                  <img
                    src={data.studentImage}
                    alt=""
                    className={Styles["Student-img"]}
                  ></img>
                </div>
                <div className={Styles["Student-name"]}>
                  Question Asked By :<b>{data.student}</b>
                </div>
              </div>
              <div className={Styles["Question-div"]}>{data.question}</div>
            </div>
            <div className={Styles["student-Question-div"]}>
              <div className={Styles["Student-div"]}>
                <div className={Styles["Student-img-div"]}>
                  <img
                    src={data.TeacherImage}
                    alt=""
                    className={Styles["Student-img"]}
                  ></img>
                </div>
                <div className={Styles["Teachers-name"]}>
                  Answered By :<b>{data.Teacher}</b>
                </div>
              </div>
              <div className={Styles["Question-div"]}>{data.answer}</div>
            </div>
          </div>
        );
      })}
    </>
  );
}
