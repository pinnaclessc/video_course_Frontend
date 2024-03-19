import React, { useState } from 'react';
import style from './AdminPage.module.css';
import AllCourses from './Pages/AllCourses';
import AllStudent from './Pages/AllStudent';
import AddCourseContent from './Pages/AddCourseContent';
import ViewCourseContent from './Pages/ShowCourseContent';
import AddCourse from './Pages/AddCourse';

export default function AdminPage() {
  const [activeComponent, setActiveComponent] = useState('allCourses');

  const handleNavigation = (component) => {
    setActiveComponent(component);
  };
  
  const renderComponent = () => {
    switch (activeComponent) {
      case 'allCourses':
        return <AllCourses/>;
      case 'allStudent':
        return <AllStudent />;
      case 'addCourse':
        return <AddCourse/>;
      case 'courseContent':
        return <AddCourseContent />;
      case 'viewCourseContent':
        return <ViewCourseContent/>;
      default:
        return <AllCourses />;
    }
  };

  return (
    <div className={style["admin-wraper"]}>
      <div className={style["admin-navbar"]}>
        <div className={style["admin-navItems"]} onClick={() => handleNavigation('allCourses')}>All Courses</div>
        <div className={style["admin-navItems"]} onClick={() => handleNavigation('allStudent')}>All Students</div>
        <div className={style["admin-navItems"]} onClick={() => handleNavigation('viewCourseContent')}>View Course Content</div>
        <div className={style["admin-navItems"]} onClick={() => handleNavigation('addCourse')}>Add New Course</div>
        <div className={style["admin-navItems"]} onClick={() => handleNavigation('courseContent')}>Add Course Content</div>
      </div>
      {renderComponent()}
    </div>
  );
}