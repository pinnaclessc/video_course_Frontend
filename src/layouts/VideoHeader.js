import React, { useState ,useEffect} from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { IoIosShareAlt, IoLogoFacebook, IoLogoTwitter, IoIosMail, IoLogoWhatsapp,IoMdClose } from "react-icons/io";
import styles from './VideoHeader.module.css';
import { useVideo } from '../context/VideoContext';

const VideoHeader = () => {
  const apiUrl ="https://videocoursebackend.ssccglpinnacle.com"
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [error,setError] = useState();
  const [courseDetails,setCourseDetails] = useState()
  const navigate = useNavigate();
  const { courseId } = useParams();
  console.log(courseId);
  const totalCourseLength = 30;
  const userProgress = 20;
  const auth = localStorage.getItem("user");
  const getUserId = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user)._id : null;
  };

  const { completedVideos } = useVideo();
  const [progressPercentage, setProgressPercentage] = useState(0); 
  const userId = getUserId();
  // const courseTitle = 'SSC CGL MATHEMATICS';
  const shareUrl = `https://www.videos.ssccglpinnacle.com/course/${courseId}`;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/course/${courseId}`);
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
  }, [courseId, apiUrl]);
  
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

  
// const calculateProgress = () => {
//   if (!courseDetails) return 0;
//   const totalTopics = courseDetails.chapters.reduce((acc, curr) => acc + curr.topics.length, 0);
//   const completedTopics = courseDetails.chapters.flatMap(chapter => chapter.topics).filter(topic => topic.completedBy.includes(userId)).length; // Assuming you have a way to identify the current user's ID
//   return (completedTopics / totalTopics) * 100;
// };

const calculateProgress = () => {
  if (!courseDetails || !courseDetails.chapters) return 0;
  const totalTopics = courseDetails.chapters.reduce((acc, curr) => acc + curr.topics.length, 0);
  const completedTopics = courseDetails.chapters
    .flatMap(chapter => chapter.topics)
    .reduce((acc, topic) => acc + (completedVideos[topic.selectedVideo] ? 1 : 0), 0);

  return (completedTopics / totalTopics) * 100;
};
useEffect(() => {
  if (courseDetails?.chapters) {
    const totalTopics = courseDetails.chapters.reduce((acc, chapter) => acc + chapter.topics.length, 0);
    const completedTopics = courseDetails.chapters.flatMap(chapter => chapter.topics).reduce((acc, topic) => acc + (completedVideos[topic.selectedVideo] ? 1 : 0), 0);

    const percentage = (completedTopics / totalTopics) * 100;
    setProgressPercentage(percentage);
  }
}, [courseDetails, completedVideos]);
// const progressPercentage = calculateProgress();

// const progressPercentage = calculateProgress();
  // const progressPercentage = (userProgress / totalCourseLength) * 100;

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

      {/* <div className={styles.progressContainer}>
        <progress className={styles.videoContentProgress} value={userProgress} max={totalCourseLength}></progress>
        <span>{progressPercentage.toFixed(0)}% of course completed</span>
      </div> */}
<div className={styles.progressContainer}>
        <progress className={styles.videoContentProgress} value={progressPercentage} max={100}></progress>
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