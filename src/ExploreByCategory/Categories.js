import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ExplorCategory.module.css'

export default function Categories() {
  return (
    <>
        <div className={styles["navBar-wraper"]}>
        <div className={styles["navLink-Wraper"]}>
        <Link to="/sscDetails" className={styles["EC-navLink"]}>SSC</Link>
        </div>

        <div className={styles["navLink-Wraper"]}>
          <Link to="/railwayDetails" className={styles["EC-navLink"]}>Railway</Link>
        </div>
        <div className={styles["navLink-Wraper"]}>
        <Link to="/BankDetails" className={styles["EC-navLink"]}>Bank</Link>
        </div>

        <div className={styles["navLink-Wraper"]}>
          <Link to="/BankDetails" className={styles["EC-navLink"]}>
            UPSC
          </Link>
        </div>
      </div>
    </>
  )
}
