import React from "react"
import { FiFlag } from "react-icons/fi"
import classes from "./Announcements.module.css"

export default function Announcements() {
  return (
    <div className={classes.announce_container}>
      <div className={classes.announce_section}>
        <div className={classes.ins_image}>
          <img
            alt="instructor"
            className={classes.instructor_image}
            src="/images/Baljitsir_image.png"
          />
        </div>

        <div className={classes.ins_details}>
          <div className={classes.ins_name}> Baljit Dhaka</div>
          <div className={classes.ins}>
            {" "}
            posted an announcement. 1month ago. <FiFlag size={15} />
          </div>
          <div className={classes.heading}>Govt. Exam Preparation.</div>
          <h4 className={classes.heading1}>Pinnacle Learning Courses.</h4>
        </div>
      </div>
      <section className={classes.ins_sections}>
        <p className={classes.ins_section_para}>Hi Everyone!</p>
        <p className={classes.ins_section_para}>
          A few weeks ago, We released a brand-new SSC CGL reasoning course that
          helps you clear your exam.
        </p>
        <p className={classes.ins_section_para}>
          This course will help you build your concept and will provide all the
          knowledge required to crack this exam. With the video courses you
          could also take help of pinnacle SSC CGL books.
        </p>
        <p className={classes.ins_section_para}>
          For Digital Books visit www.ssccglpinnacledigitalcontent.com.
        </p>
        <p className={classes.ins_section_para}>
          Also if you wanna interact with our toppers visit{" "}
          <a href="https://ssccglpinnacle.com/books.php">
            www.ssccglpinnacletoppersguidance.com{" "}
          </a>
        </p>{" "}
        <p className={classes.ins_section_para}>
          If you wanna buy the books visit{" "}
          <a href="https://ssccglpinnacle.com/books.php">
            https://ssccglpinnacle.com/books.php
          </a>
        </p>
        <p className={classes.ins_section_para}>
          I hope you'll enjoy these courses!{" "}
        </p>
        Happy learnings! <p className={classes.ins_section_para}>:-)</p>
      </section>
    </div>
  )
}
