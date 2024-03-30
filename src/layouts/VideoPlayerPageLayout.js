// VideoPlayerPageLayout.js
import React, { useState } from 'react';
import VideoPlayer from '../src-d/components/VideoPlayerPage/VideoPlayer/VideoPlayer';
import Sidebar from '../src-d/components/VideoPlayerPage/VideoPlayer/SideBar';
import VideoPlayerNavBar from './VideoPlayerNavBar';
import styles from './VideoPlayerPageLayout.module.css';
import { Outlet,useParams } from 'react-router-dom';
import VideoHeader from './VideoHeader';
import { useVideo } from '../context/VideoContext';

const apiUrl = 'http://13.200.156.92:8000';

const VideoPlayerPageLayout = () => {
  const { courseId } = useParams();
  console.log(courseId);
  
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const { markVideoAsCompleted } = useVideo();

  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleVideoProgress = (videoId) => {
    markVideoAsCompleted(videoId);
  };

  const videoPlayerWrapperClass = sidebarVisible
    ? styles.videoPlayerWrapper
    : `${styles.videoPlayerWrapper} ${styles.fullWidthVideoPlayer}`;

  return (
    <div className={styles.container}>
      <VideoHeader />
      <div className={styles.videoArea}>
        <div className={videoPlayerWrapperClass}>
          <VideoPlayer apiUrl={apiUrl} onToggleSidebar={handleToggleSidebar} isSidebarVisible={sidebarVisible} onVideoProgress={handleVideoProgress} />
          <VideoPlayerNavBar sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} />
          <div className={styles.outletArea}>
          <Outlet />  
        </div>
        </div>
        {sidebarVisible && (
          <div className={styles.sidebar_container} ><Sidebar apiUrl={apiUrl} onClose={handleToggleSidebar} /></div>
        )}
 </div>
    </div>
  );
};

export default VideoPlayerPageLayout;
