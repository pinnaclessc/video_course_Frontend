import React, { useState } from "react"
import courseContentData from "./courseContentData.json"
import styles from "./CourseOverview.module.css"

const CourseOverview = () => {
  const [showContent, setShowContent] = useState(false)

  return (
    <div className={styles.overview}>
      <div className={styles.overview_heading_container}>
        <p className={styles.overview_heading}>About this course</p>
        <p>
          In this course SSC Maths 6800 TCS MCQ book is discussed through
          videos. In this course videos and class notes of each chapter are
          provided. The complete book is covered in a systematic manner.
        </p>
      </div>
      <hr />
      <div className={styles.courseInfo}>
        <div className={styles.courseData}>
          <p className={styles.overview_subheading}>Course Status:</p>
        </div>
        <div className={styles.courseData1}>
          <ul>
            <li>Students: 2339</li>
            <li>Language: Hinglish</li>
            <li>Captions: Yes</li>
          </ul>
        </div>
        <div className={styles.courseData2}>
          <ul>
            <li>Lectures: 76</li>
            <li>Duration: 168 total hours</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className={styles.newSection}>
        <div className={styles.column}>
          <p>Access:</p>
        </div>
        <div className={styles.availability}>
          <ul>
            <li>Available on Pinnacle exam preparation mobile app</li>
            <li>Laptop </li>
            <li>Desktop </li>
            <li>TV</li>
          </ul>
        </div>
      </div>
      <hr />

      {/* Description Section */}
      <div className={styles.descriptionSection}>
        <p>Description:</p>
        <div className={styles.description_data}>
          <p>
            There are 22 chapters given below in this course. In staring of the
            chapter concepts are explained, after that varieties questions are
            explained, After that practice questions are explained of the book.
          </p>
          <ul>
            <li>1. Number system</li>
            <li>2. LCM HCM</li>
            <li>3. Simplification</li>
            <li>4. Average</li>
            <li>5. Ratio and proportion</li>
            <li>6. Work and time</li>
            <li>7. Pipe and cistern</li>
            <li>8. ages</li>
            <li>9. Percentage</li>
            <li>10. Discount</li>
            <li>11. Profit and loss</li>
            <li>.</li>
            <li>.</li>
            <li>.</li>
            <li>22. Statistics</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className={styles.instructorSection}>
        <div className={styles.instructorInfo}>
          <img
            src="/images/RamNiwas sir.png"
            alt="Instructor"
            width={10}
            height={10}
          />
          <div className={styles.instructorname}>
            <li className={styles.faculty_name}>Ramniwas Sir</li>
            <li className={styles.faculty_desig}>Maths Faculty</li>
          </div>
        </div>

        <div className={styles.instructorDetails}>
          <p>
            Ram niiwas sir is a renowed name in competitive exams math field. He
            has taught 20,000 students. Many students are now working in various
            government jobs.
          </p>
          {showContent ? (
            <>
              <p>
                Ram niiwas sir is a renowed name in competitive exams math
                field. He has taught 20,000 students. Many students are now
                working in various government jobs.
              </p>
              <p>
                Ram niiwas sir is a renowed name in competitive exams math
                field. He has taught 20,000 students. Many students are now
                working in various government jobs.
              </p>
              <p>
                Ram niiwas sir is a renowed name in competitive exams math
                field. He has taught 20,000 students. Many students are now
                working in various government jobs.
              </p>
              <p>
                Ram niiwas sir is a renowed name in competitive exams math
                field. He has taught 20,000 students. Many students are now
                working in various government jobs.
              </p>
              <button
                className={styles.showless_btn}
                onClick={() => setShowContent(false)}
              >
                Show Less
              </button>
              <i className={styles.arrowUp}></i>
            </>
          ) : (
            <button
              className={styles.showMore_btn}
              onClick={() => setShowContent(true)}
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseOverview
