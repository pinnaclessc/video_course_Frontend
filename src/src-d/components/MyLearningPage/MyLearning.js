import React from "react"
import { NavLink } from "react-router-dom"
import styles from "./MyLearning.module.css"
import { useNavigate } from "react-router-dom"

function Mylearning() {
  
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Learning</h1>
      <nav className={styles.navbar}>
        <ul className={styles.unorderedlist}>
          <li className={styles.list11}>
            <h2 className={styles.heading2}>All Courses</h2>
          </li>
          <li className={styles.list11}>
           
            <h2 className={styles.heading2}>My List</h2>
            
          </li>
          <li className={styles.list11}>
           
            <h2 className={styles.heading2}>Wishlist </h2>
        
          </li>
          <li className={styles.list11}>
           
            <h2 className={styles.heading2}> Archived </h2>
            
          </li>
          <li className={styles.list11}>
            
            <h2 className={styles.heading2}>Learning Tools </h2>
         
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Mylearning
