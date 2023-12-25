import React from "react"
import { NavLink } from "react-router-dom"
import styles from "./MyLearning.module.css"
import { useNavigate } from "react-router-dom"

function Mylearning() {
  // const navigate = useNavigate()

  // const handleNavigation = () => {
  //   // Programmatically navigate to the "/all-courses" route
  //   navigate("/all-courses")
  // }
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Learning</h1>
      <nav className={styles.navbar}>
        <ul className={styles.unorderedlist}>
          <li className={styles.list11}>
            {/* <NavLink
              className={styles.link11}
              exact
              to="/all-courses"
              activeClassName={styles.active}
              onClick={handleNavigation}
            > */}
            <h2 className={styles.heading2}>All Courses</h2>
            {/* </NavLink> */}
          </li>
          <li className={styles.list11}>
            {/* <NavLink
              className={styles.link11}
              to="/learning/my-list"
              activeClassName={styles.active}
            > */}
            <h2 className={styles.heading2}>My List</h2>
            {/* </NavLink> */}
          </li>
          <li className={styles.list11}>
            {/* <NavLink
              className={styles.link11}
              to="/learning/wishlist"
              activeClassName={styles.active}
            > */}
            <h2 className={styles.heading2}>Wishlist </h2>
            {/* </NavLink> */}
          </li>
          <li className={styles.list11}>
            {/* <NavLink
              className={styles.link11}
              to="/learning/archived"
              activeClassName={styles.active}
            > */}
            <h2 className={styles.heading2}> Archived </h2>
            {/* </NavLink> */}
          </li>
          <li className={styles.list11}>
            {/* <NavLink
              className={styles.link11}
              to="/learning/learning-tools"
              activeClassName={styles.active}
            > */}
            <h2 className={styles.heading2}>Learning Tools </h2>
            {/* </NavLink> */}
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Mylearning
