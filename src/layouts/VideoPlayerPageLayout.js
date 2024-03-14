// VideoPlayerPageLayout.js
import React, { useState } from 'react';
import VideoPlayer from '../src-d/components/VideoPlayerPage/VideoPlayer/VideoPlayer';
import Sidebar from '../src-d/components/VideoPlayerPage/VideoPlayer/SideBar';
import VideoPlayerNavBar from './VideoPlayerNavBar';
import styles from './VideoPlayerPageLayout.module.css';
import { Outlet } from 'react-router-dom';
import VideoHeader from './VideoHeader';

const apiUrl = 'http://localhost:8000';

const VideoPlayerPageLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const videoPlayerWrapperClass = sidebarVisible
    ? styles.videoPlayerWrapper
    : `${styles.videoPlayerWrapper} ${styles.fullWidthVideoPlayer}`;

  return (
    <div className={styles.container}>
      <VideoHeader />
      <div className={styles.videoArea}>
        <div className={videoPlayerWrapperClass}>
          <VideoPlayer apiUrl={apiUrl} onToggleSidebar={handleToggleSidebar} isSidebarVisible={sidebarVisible} />
          <VideoPlayerNavBar sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} />
          
          <div className={styles.outletArea}>
          <Outlet />  
        </div>
        </div>
        {sidebarVisible && (
          <Sidebar apiUrl={apiUrl} onClose={handleToggleSidebar} />
        )}
      </div>
    </div>
  );
};

export default VideoPlayerPageLayout;
