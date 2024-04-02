import React, { useState ,useEffect} from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { IoIosShareAlt, IoLogoFacebook, IoLogoTwitter, IoIosMail, IoLogoWhatsapp,IoMdClose } from "react-icons/io";
import styles from './VideoHeader.module.css';

const VideoHeader = () => {
  const apiUrl ="http://localhost:8000/"
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [error,setError] = useState();
  const [courseDetails,setCourseDetails] = useState()
  const navigate = useNavigate();
  const { courseId } = useParams();
  console.log(courseId);
  const totalCourseLength = 30;
  const userProgress = 20;
  // const courseTitle = 'SSC CGL MATHEMATICS';
  const shareUrl = `https://www.videos.ssccglpinnacle.com/course/${courseId}`;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}course/${courseId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCourseDetails(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching video details:", error);
        setError(error.toString());
      }
    };
  
    fetchCourseDetails();
  }, [courseId, apiUrl]); // Also, add `apiUrl` to the dependencies array
  
  const handleShareClick = () => {
    setShareModalOpen(true);
    console.log('Share button clicked');
  };

  const closeShareModal = () => {
    setShareModalOpen(false);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  const progressPercentage = (userProgress / totalCourseLength) * 100;

  const shareOnWhatsApp = () => {
    const text = `Check out this course I'm taking on SSC CGL MATHEMATICS! ${shareUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={styles.courseHeader}>
      
      <button onClick={() => navigate('/courses')} className={styles.backButton}>
        <img src="https://dgkwgu5olgqh6.cloudfront.net/Image/pinnacleWhiteLogo.png" alt="Back to courses" />
      </button>
      {/* <h1 className={styles.courseTitle}>{courseDetails ? courseDetails.title : 'Loading...'}</h1> */}

      <h1 className={styles.courseTitle}>{courseDetails ? courseDetails.title: "Loading...."}</h1>

      <div className={styles.progressContainer}>
        <progress className={styles.videoContentProgress} value={userProgress} max={totalCourseLength}></progress>
        <span>{progressPercentage.toFixed(0)}% of course completed</span>
      </div>

      <button onClick={handleShareClick} className={styles.shareButton}>
        Share <IoIosShareAlt size={20} />
      </button>

      {isShareModalOpen && (
        <div className={styles.shareModalOverlay}>
          <div className={styles.shareModal}>
            <div className={styles.shareModalHeader}>
              <h2>Share this course</h2>
              <button onClick={closeShareModal} className={styles.closeButton}><IoMdClose size={20}/></button>
            </div>
            <div className={styles.urlCopy}><input type="text" value={shareUrl} readOnly className={styles.shareInput} />
            <button onClick={handleCopyClick} className={styles.copyButton}> Copy </button></div>
            <div className={styles.socialMediaIcons}>
              <button className={styles.iconButton}><IoLogoFacebook className={styles.mediaIcons} size={20} /></button>
              <button className={styles.iconButton}><IoLogoTwitter className={styles.mediaIcons} size={20} /></button>
              <button className={styles.iconButton} onClick={shareOnWhatsApp}><IoLogoWhatsapp className={styles.mediaIcons} size={20} /></button>
              <button className={styles.iconButton}><IoIosMail size={20} className={styles.mediaIcons} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default VideoHeader;