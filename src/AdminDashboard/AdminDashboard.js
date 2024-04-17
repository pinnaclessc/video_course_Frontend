import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './AdminDashboard.module.css';
import CourseList from './Courses/CourseList';
import CourseForm from './Courses/CourseForm';
import { TbHome } from "react-icons/tb";
import AddCourseContent from './AddCourseContentData/AddCourseContentData';
import InstructorForm from "./Instructor/InstructorForm";
import InstructorDataList from "./Instructor/InstructorDataList"
import CategoryForm from './Courses/Category';
import ChaptersList from './ChapterFrom/ChapterList';


export default function AdminDashboard() {
  const [activeComponent, setActiveComponent] = useState("CourseList");

  const handleNavigation = (component) => {
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'allCourses':
        return <CourseList/>;
      case 'addCourse':
        return <CourseForm />;
        case 'courseContent':
          return <AddCourseContent />;
        case 'ViewCourseContent':
          return <ChaptersList />;
        case 'addInstructor': 
        return <InstructorForm />;
      case 'instructorList': 
        return <InstructorDataList />;
      case 'addCategory':
        return <CategoryForm />;
      default:
        return <CourseList/>;
    }
  };

  return (
    <div className={style["admin-wraper"]}>
      <div className={style["admin-navbar"]}>
      <Link to="/"v ><TbHome className={style["admin-navItems"]} size={20}/></Link>
        <div className={style["admin-navItems"]} onClick={() => handleNavigation('allCourses')}>All Courses</div>
        {/* <div className={style["admin-navItems"]} onClick={() => handleNavigation('allStudent')}>All Students</div> */}
        <div className={style["admin-navItems"]} onClick={() => handleNavigation('addCourse')}>Add New Course</div>
        <div className={style["admin-navItems"]} onClick={() => handleNavigation('ViewCourseContent')}>View Course Content</div>
        <div className={style["admin-navItems"]} onClick={() => handleNavigation('courseContent')}>Add Course Content</div>
        <div className={style["admin-navItems"]} onClick={() => handleNavigation('addInstructor')}>Add Instructor</div>
        <div className={style["admin-navItems"]} onClick={() => handleNavigation('instructorList')}>Instructor List</div>
        <div className={style["admin-navItems"]} onClick={() => handleNavigation('addCategory')}>Add Category</div>
      </div>
      {renderComponent()}
    </div>
  );
}