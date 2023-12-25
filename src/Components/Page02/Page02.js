import React, { useEffect } from "react";
import Timer from "../HomePage01/Header/Timer";
import CourseDetails from "./CourseDetails";
import {Link}from 'react-router-dom';
import styles from './Page.module.css';
export default function Page02() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Timer />
      <CourseDetails/>
      <div className={styles['reportAbouse-div']}>
      <Link to='/reportAbouse' className={styles['reportAbouse-Link']}>Report Abouse</Link>
      </div>
    </div>
  );
}
