import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import styles from './VideoPlayerNavBar.module.css';

const VideoPlayerNavBar = ({ sidebarVisible,setSidebarVisible }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const handleCourseContentClick = (e) => {
    e.preventDefault(); 
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
    <div className={styles.videoNavbar}>
      <Link to="/myplayer/search" className={`${styles.navlinks} ${activeLink === '/myplayer/search' ? styles.active : ''}`}>
        <AiOutlineSearch size={25} />
      </Link>
      {!sidebarVisible && (
        <Link
        to="/myplayer/coursesContent"
       
        className={`${styles.navlinks} ${activeLink === '/myplayer/coursescontent' ? styles.active : ''}`}
      >
        Course Content
      </Link>
      )}
      <Link to="/myplayer/overview" className={`${styles.navlinks} ${activeLink === '/myplayer/overview' ? styles.active : ''}`}>
        Overview
      </Link>
      <Link to="/myplayer/q&a" className={`${styles.navlinks} ${activeLink === '/myplayer/q&a' ? styles.active : ''}`}>
        Q&A
      </Link>
      <Link to="/myplayer/notes" className={`${styles.navlinks} ${activeLink === '/myplayer/notes' ? styles.active : ''}`}>
        Notes
      </Link>
      <Link to="/myplayer/announcement" className={`${styles.navlinks} ${activeLink === '/myplayer/announcement' ? styles.active : ''}`}>
        Announcement
      </Link>
      <Link to="/myplayer/reviews" className={`${styles.navlinks} ${activeLink === '/myplayer/reviews' ? styles.active : ''}`}>
        Reviews
      </Link>
      <Link to="/myplayer/learningtools" className={`${styles.navlinks} ${activeLink === '/myplayer/learningtools' ? styles.active : ''}`}>
        Learning Tools
      </Link>
    </div>
    <hr/>
    </>
  );
};

export default VideoPlayerNavBar;
