import React, { useState, useEffect } from 'react';
import { Link, useLocation,useParams } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import styles from './VideoPlayerNavBar.module.css';

const VideoPlayerNavBar = ({ sidebarVisible,setSidebarVisible, onToggleSidebar }) => {
  const{courseId}=useParams();
  console.log(courseId)
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  // const handleCourseContentClick = () => {
  //   onCourseContentClick(); // This should trigger the Sidebar to render in the outlet
  // };
  

  return (
    <>
    <div className={styles.videoNavbar}>
      <Link to="#search" className={`${styles.navlinks} ${activeLink === '#search' ? styles.active : ''}`}>
        <AiOutlineSearch size={25} />
      </Link>
      {!sidebarVisible && (
        <Link
        to="#coursesContent"
       
        className={`${styles.navlinks} ${activeLink === '#coursescontent' ? styles.active : ''}`}
      >
        Course Content
      </Link>
      )}
      <Link to="#overview" className={`${styles.navlinks} ${activeLink === '#overview' ? styles.active : ''}`}>
        Overview
      </Link>
      <Link to="#q&a" className={`${styles.navlinks} ${activeLink === '#q&a' ? styles.active : ''}`}>
        Q&A
      </Link>
      <Link to="#notes" className={`${styles.navlinks} ${activeLink === '#notes' ? styles.active : ''}`}>
        Notes
      </Link>
      <Link to="#announcement" className={`${styles.navlinks} ${activeLink === '#announcement' ? styles.active : ''}`}>
        Announcement
      </Link>
      <Link to="#reviews" className={`${styles.navlinks} ${activeLink === '#reviews' ? styles.active : ''}`}>
        Reviews
      </Link>
      <Link to="#learningtools" className={`${styles.navlinks} ${activeLink === '#learningtools' ? styles.active : ''}`}>
        Learning Tools
      </Link>
    </div>
    <hr/>
    </>
  );
};

export default VideoPlayerNavBar;
