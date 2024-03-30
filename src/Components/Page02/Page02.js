import React, { useEffect } from "react";
import CourseDetails from "./CourseDetails";
import {Link}from 'react-router-dom';
import styles from './Page.module.css';
import Header from '../HomePage01/Header/Header'
export default function Page02() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header/>
      <CourseDetails/>
      <div className={styles['reportAbuse-div']}>
      <Link to='/reportAbuse' className={styles['reportAbuse-Link']}>Report Abuse</Link>
      </div>
    </div>
  );
}
