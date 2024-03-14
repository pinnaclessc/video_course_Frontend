import React, { useState } from 'react';
import style from './AdminDashboard.module.css';
import CourseList from './Courses/CourseList';
// import AllStudent from '../Admin/Pages/AllStudent';
import CourseForm from './Courses/CourseForm';
import AddCourseContent from './AddCourseContentData/AddCourseContentData';
import InstructorForm from "./Instructor/InstructorForm";
import InstructorDataList from "./Instructor/InstructorDataList"
import CategoryForm from './Courses/Category';
import EditChapterForm from './AddChapterData/EditChapterData';

export default function AdminDashboard() {
  const [activeComponent, setActiveComponent] = useState("CourseList");

  const handleNavigation = (component) => {
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'allCourses':
        return <CourseList/>;
      // case 'allStudent':
      //   return <AllStudent />;
      case 'addCourse':
        return <CourseForm />;
      case 'courseContent':
        return <AddCourseContent />;
        case 'addInstructor': 
        return <InstructorForm />;
      case 'instructorList': 
        return <InstructorDataList />;
      case 'addCategory':
        return <CategoryForm />;
      case 'editChapter':
        return <EditChapterForm />;
      default:
        return <CourseList/>;
    }
  };

  return (
    <div className={style["admin-wraper"]}>
      <div className={style["admin-navbar"]}>
        <div className={style["admin-navItems"]} onClick={() => handleNavigation('allCourses')}>All Courses</div>
        {/* <div className={style["admin-navItems"]} onClick={() => handleNavigation('allStudent')}>All Students</div> */}
        <div className={style["admin-navItems"]} onClick={() => handleNavigation('addCourse')}>Add New Course</div>
        <div className={style["admin-navItems"]} onClick={() => handleNavigation('courseContent')}>Add Course Content</div>
        <div className={style["admin-navItems"]} onClick={() => handleNavigation('addInstructor')}>Add Instructor</div>
        <div className={style["admin-navItems"]} onClick={() => handleNavigation('instructorList')}>Instructor List</div>
        <div className={style["admin-navItems"]} onClick={() => handleNavigation('addCategory')}>Add Category</div>
      </div>
      {renderComponent()}
    </div>
  );
}