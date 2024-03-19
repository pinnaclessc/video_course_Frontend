import React, { useEffect } from "react";
import CourseDetails from "./CourseDetails";
import {Link}from 'react-router-dom';
import styles from './Page.module.css';
export default function Page02() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <CourseDetails/>
      <div className={styles['reportAbuse-div']}>
      <Link to='/reportAbuse' className={styles['reportAbuse-Link']}>Report Abuse</Link>
      </div>
    </div>
  );
}
