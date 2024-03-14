import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './VideoHeader.module.css';

const VideoHeader = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  
  const courseTitle = 'SSC CGL MATHEMATICS'; 

  return (
    <div className={styles.courseHeader}>
      <button onClick={() => navigate('/courses')} className={styles.backButton}>
        Back to courses
      </button>
      <h1 className={styles.courseTitle}>{courseTitle}</h1>
      <span className={styles.courseDraftStatus}>DRAFT</span>
      <span className={styles.videoContentTime}>22min of video content uploaded</span>
      <button className={styles.previewButton}>Preview ▼</button>
      <button className={styles.settingsButton}>⚙</button>
    </div>
  );
};

export default VideoHeader;