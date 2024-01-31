import React from "react"
import styles from "./AllCourses.module.css"

function AllCourses() {
  // Assuming you have some course data
  const courses = [
    { id: 1, title: "Course 1" },
    { id: 2, title: "Course 2" },
    { id: 3, title: "Course 3" },
  
  ]

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>All Courses</h2>
      <ul className={styles.courseList}>
        {courses.map((course) => (
          <li key={course.id} className={styles.courseItem}>
            {course.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AllCourses
