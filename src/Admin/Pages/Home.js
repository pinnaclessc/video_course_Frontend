import React from 'react';
// import styles from ''
import { Link } from 'react-router-dom';

export default function Home() {
  return (
<>
<Link to='/admin/createCourse'>Create Course</Link>
<Link to='/admin/allCourses'>All Courses</Link>
</>)}
