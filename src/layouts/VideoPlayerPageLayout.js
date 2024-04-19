// // // VideoPlayerPageLayout.js
// // import React, { useState } from 'react';
// // import VideoPlayer from '../src-d/components/VideoPlayerPage/VideoPlayer/VideoPlayer';
// // import Sidebar from '../src-d/components/VideoPlayerPage/VideoPlayer/SideBar';
// // import VideoPlayerNavBar from './VideoPlayerNavBar';
// // import styles from './VideoPlayerPageLayout.module.css';
// // import { Outlet,useParams } from 'react-router-dom';
// // import VideoHeader from './VideoHeader';
// // import { useVideo } from '../context/VideoContext';

// // const apiUrl = 'http://13.200.156.92:8000';

// // const VideoPlayerPageLayout = () => {
// //   const { courseId } = useParams();
// //   console.log(courseId);

// //   const [sidebarVisible, setSidebarVisible] = useState(true);
// //   const { markVideoAsCompleted } = useVideo();

// //   const handleToggleSidebar = () => {
// //     setSidebarVisible(!sidebarVisible);
// //   };

// //   const handleVideoProgress = (videoId) => {
// //     markVideoAsCompleted(videoId);
// //   };

// //   const videoPlayerWrapperClass = sidebarVisible
// //     ? styles.videoPlayerWrapper
// //     : `${styles.videoPlayerWrapper} ${styles.fullWidthVideoPlayer}`;

// //   return (
// //     <div className={styles.container}>
// //       <VideoHeader />
// //       <div className={styles.videoArea}>
// //         <div className={videoPlayerWrapperClass}>
// //           <VideoPlayer apiUrl={apiUrl} onToggleSidebar={handleToggleSidebar} isSidebarVisible={sidebarVisible} onVideoProgress={handleVideoProgress} />
// //           <VideoPlayerNavBar sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} />
// //           <div className={styles.outletArea}>
// //           <Outlet />  
// //         </div>
// //         </div>
// //         {sidebarVisible && (
// //           <div className={styles.sidebar_container} ><Sidebar apiUrl={apiUrl} onClose={handleToggleSidebar} /></div>
// //         )}
// //  </div>
// //     </div>
// //   );
// // };

// // export default VideoPlayerPageLayout;



// import React, { useState, useEffect } from 'react';
// import VideoPlayer from '../src-d/components/VideoPlayerPage/VideoPlayer/VideoPlayer';
// import Sidebar from '../src-d/components/VideoPlayerPage/VideoPlayer/SideBar';
// import VideoPlayerNavBar from './VideoPlayerNavBar';
// import styles from './VideoPlayerPageLayout.module.css';
// import { useParams, useLocation } from 'react-router-dom';
// import VideoHeader from './VideoHeader';
// import { useVideo } from '../context/VideoContext';
// import SearchBar from "../src-d/components/VideoPlayerPage/Navigations Components/SearchBar";
// import CourseOverview from '../src-d/components/VideoPlayerPage/Navigations Components/CourseOverview';
// import NoteEditor from '../src-d/components/VideoPlayerPage/Navigations Components/NotesEditor/NoteEditor';
// import QandA from '../src-d/components/VideoPlayerPage/Navigations Components/Q&A/QandA';
// import Announcements from '../src-d/components/VideoPlayerPage/Navigations Components/Announcements/Announcements';
// import CourseContent from '../src-d/components/VideoPlayerPage/Navigations Components/CourseContent';
// import LearningTools from '../src-d/components/VideoPlayerPage/Navigations Components/LearningTools/LearningTools';
// import Review from '../src-d/components/VideoPlayerPage/Navigations Components/Review/Review';

// const apiUrl = 'https://videocoursebackend.ssccglpinnacle.com';

// const VideoPlayerPageLayout = () => {
//   const { courseId } = useParams();
//   const location = useLocation();
//   const [sidebarVisible, setSidebarVisible] = useState(true);
//   const { markVideoAsCompleted } = useVideo();
//   const [sidebarInOutlet, setSidebarInOutlet] = useState(false);
//   const [renderSidebarInOutlet, setRenderSidebarInOutlet] = useState(false);

//   // Extract hash directly from location.hash
//   const currentHash = location.hash;

//   // const handleToggleSidebar = () => {
//   //   setSidebarVisible(!sidebarVisible);
//   // };

//   const handleToggleSidebar = () => {
//     if (currentHash === '#courseContent') {
//       setRenderSidebarInOutlet(false);
//     }
//     setSidebarVisible(!sidebarVisible);
//   };
//   // const handleCourseContentClick = () => {
//   //   // Assuming setRenderSidebarInOutlet is your state setter for controlling
//   //   // whether the Sidebar should render in the outlet.
//   //   setRenderSidebarInOutlet(true);
//   // };


//   const handleCourseContentClick = () => {
//     setRenderSidebarInOutlet(true);
//     setSidebarVisible(true);
//   };

//   const handleVideoProgress = (videoId) => {
//     markVideoAsCompleted(videoId);
//   };

//   const renderComponentBasedOnHash = (hash) => {
//     switch (hash) {
//       case '#search': return <SearchBar />;
//       case '#overview': return <CourseOverview />;
//       case '#notes': return <NoteEditor />;
//       case '#q&a': return <QandA />;
//       case '#announcement': return <Announcements />;
//       case '#coursesContent': return <CourseContent />;
//       case '#learning-tools': return <LearningTools />;
//       case '#reviews': return <Review />;
//       default: return <CourseOverview />;
//     }
//   };

//   const videoPlayerWrapperClass = sidebarVisible ? styles.videoPlayerWrapper : `${styles.videoPlayerWrapper} ${styles.fullWidthVideoPlayer}`;

//   return (
//     <div className={styles.container}>
//       <VideoHeader />
//       <div className={styles.videoArea}>
//         <div className={videoPlayerWrapperClass}>
//           <VideoPlayer apiUrl={apiUrl} onToggleSidebar={handleToggleSidebar} isSidebarVisible={sidebarVisible} onVideoProgress={handleVideoProgress} />
//           <VideoPlayerNavBar
//             sidebarVisible={sidebarVisible}
//             setSidebarVisible={setSidebarVisible}
//             onCourseContentClick={handleCourseContentClick}
//           />
//           <div className={styles.outletArea}>
//             {renderSidebarInOutlet ? <Sidebar apiUrl={apiUrl} onClose={handleToggleSidebar} /> : renderComponentBasedOnHash(currentHash)}
//           </div>
//         </div>
//         {!sidebarInOutlet && sidebarVisible && <Sidebar apiUrl={apiUrl} onClose={handleToggleSidebar} />}
//         {sidebarVisible && <Sidebar apiUrl={apiUrl} onClose={handleToggleSidebar} />}
//         {!renderSidebarInOutlet && sidebarVisible && <Sidebar apiUrl={apiUrl} onClose={handleToggleSidebar} />}
//       </div>
//     </div>
//   );
// };

// export default VideoPlayerPageLayout;

//////////////////////////////////////WORKING////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import VideoPlayer from '../src-d/components/VideoPlayerPage/VideoPlayer/VideoPlayer';
import Sidebar from '../src-d/components/VideoPlayerPage/VideoPlayer/SideBar';
import VideoPlayerNavBar from './VideoPlayerNavBar';
import styles from './VideoPlayerPageLayout.module.css';
import { useParams, useLocation } from 'react-router-dom';
import VideoHeader from './VideoHeader';
import { useVideo } from '../context/VideoContext';
import SearchBar from "../src-d/components/VideoPlayerPage/Navigations Components/SearchBar";
import CourseOverview from '../src-d/components/VideoPlayerPage/Navigations Components/CourseOverview';
import NoteEditor from '../src-d/components/VideoPlayerPage/Navigations Components/NotesEditor/NoteEditor';
import QandA from '../src-d/components/VideoPlayerPage/Navigations Components/Q&A/QandA';
import Announcements from '../src-d/components/VideoPlayerPage/Navigations Components/Announcements/Announcements';
import CourseContent from '../src-d/components/VideoPlayerPage/Navigations Components/CourseContent';
import LearningTools from '../src-d/components/VideoPlayerPage/Navigations Components/LearningTools/LearningTools';
import Review from '../src-d/components/VideoPlayerPage/Navigations Components/Review/Review';


const apiUrl = 'https://videocoursebackend.ssccglpinnacle.com';

const VideoPlayerPageLayout = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const { markVideoAsCompleted } = useVideo();
  const [renderSidebarInOutlet, setRenderSidebarInOutlet] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    if (renderSidebarInOutlet) {
      setRenderSidebarInOutlet(false);
    }
  };

  const handleCourseContentClick = () => {
    setRenderSidebarInOutlet(true);  
    setSidebarVisible(true); 
  };

  const handleVideoProgress = (videoId) => {
    markVideoAsCompleted(videoId);
  };

  const renderComponentBasedOnHash = () => {
    switch (location.hash) {
      case '#search': return <SearchBar />;
      case '#overview': return <CourseOverview />;
      case '#notes': return <NoteEditor />;
      case '#q&a': return <QandA />;
      case '#announcement': return <Announcements />;
      case '#coursesContent': return <CourseContent />;
      case '#learning-tools': return <LearningTools />;
      case '#reviews': return <Review />;
      default: return <CourseOverview />;
    }
  };

  const videoPlayerWrapperClass = sidebarVisible ? styles.videoPlayerWrapper : `${styles.videoPlayerWrapper} ${styles.fullWidthVideoPlayer}`;

  return (
    <div className={styles.container}>
      <VideoHeader />
    
      <div className={styles.videoArea}>
        <div className={videoPlayerWrapperClass}>
          <VideoPlayer
            apiUrl={apiUrl}
            onToggleSidebar={handleToggleSidebar}
            isSidebarVisible={sidebarVisible}
            onVideoProgress={handleVideoProgress}
          />
            <VideoPlayerNavBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        onCourseContentClick={handleCourseContentClick}
      />
          <div className={styles.outletArea}>
           <Sidebar apiUrl={apiUrl} onClose={handleToggleSidebar} /> 
          </div>
        </div>
        {!renderSidebarInOutlet && sidebarVisible && <Sidebar apiUrl={apiUrl} onClose={handleToggleSidebar} />}
      </div>
    </div>
  );
};

export default VideoPlayerPageLayout;
//////////////////////////////////////////////////////////////////////////////////////////