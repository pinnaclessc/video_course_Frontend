// import React, { useState, useEffect } from 'react';
// import { useVideo } from '../../../../context/VideoContext';
// import { RiCloseLine, RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
// import { MdCheckBox, MdCheckBoxOutlineBlank, MdOndemandVideo } from "react-icons/md";
// import styles from './Sidebar.module.css'
// import { useParams } from 'react-router-dom';

// const Sidebar = ({ apiUrl, onClose }) => {

//   const { selectedVideoId, setSelectedVideoId, completedVideos } = useVideo();
//   const [chapters, setChapters] = useState([]);
//   const [activeMenuIds, setActiveMenuIds] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const { courseId } = useParams();

//   const { markVideoAsCompleted } = useVideo();

// useEffect(() => {
//   const fetchChapters = async () => {
//     try {
//       const response = await fetch(`${apiUrl}/api/chapters/course/${courseId}`);
//       setIsLoading(true);
//       let data = await response.json();
//       // After setting chapters:
//       if (data.length > 0 && data[0].topics.length > 0) {
//         const firstVideoId = data[0].topics[0].selectedVideo;
//         setSelectedVideoId(firstVideoId);
//       }

//       // Fetch durations for all videos in the chapters
//       const videoIds = data.flatMap(chapter => chapter.topics.map(topic => topic.selectedVideo));
//       const uniqueVideoIds = [...new Set(videoIds)];
//       const durationsPromises = uniqueVideoIds.map(id =>
//         fetch(`${apiUrl}/videos/${id}`).then(res => res.json())
//       );
//       const durations = await Promise.all(durationsPromises);
//       const durationsMap = durations.reduce((acc, video) => {
//         acc[video._id] = video.duration;
//         return acc;
//       }, {});

//       // Include durations in topics and calculate total chapter durations
//       data = data.map(chapter => {
//         let chapterDurationSeconds = 0;
//         const updatedTopics = chapter.topics.map(topic => {
//           const duration = durationsMap[topic.selectedVideo] || 0;
//           chapterDurationSeconds += duration;
//           return { ...topic, duration };
//         });
//         const chapterDurationFormatted = formatDuration(chapterDurationSeconds);
//         return { ...chapter, topics: updatedTopics, chapterDuration: chapterDurationFormatted }; // Append total duration to chapter
//       });
//       setChapters(data);
//     } catch (error) {
//       console.error("Failed to fetch chapters or video details:", error);
//     }
//     finally {
//       setIsLoading(false);
//     }
//   };

//   fetchChapters();
// }, [apiUrl, setSelectedVideoId]);

//   const toggleCompletion = async (topicId, selectedVideo) => {
//     const isCompleted = completedVideos[selectedVideo];
//     markVideoAsCompleted(selectedVideo, !isCompleted);
//   };

//   const toggleChapter = (chapterId) => {
//     setActiveMenuIds(currentIds =>
//       currentIds.includes(chapterId)
//         ? currentIds.filter(id => id !== chapterId)
//         : [...currentIds, chapterId]
//     );
//   };

//   // Assuming duration is provided in seconds
//   const formatDuration = (durationInSeconds) => {
//     const hours = Math.floor(durationInSeconds / 3600);
//     const minutes = Math.floor((durationInSeconds % 3600) / 60);
//     const seconds = Math.floor(durationInSeconds % 60);
//     return `${hours > 0 ? `${hours}hr ` : ''}${minutes > 0 ? `${minutes}min ` : ''}${seconds}s`;
//   };

//   const calculateChapterDuration = (topics) => {
//     const totalDurationSeconds = topics.reduce((acc, topic) => acc + topic.duration, 0);
//     return formatDuration(totalDurationSeconds);
//   };

//   const calculateCompletionStatus = (topics) => {
//     const completedCount = topics.filter(t => t.completed).length;
//     return `${completedCount} / ${topics.length}`;
//   };

//   return (
//     <div className={styles.sidebar}>
//       <div className={styles.sidebarHeading}>
//         <h3>Course Content</h3>
//         <RiCloseLine size={24} onClick={onClose} className={styles.closeIcon} />
//       </div>
//       {isLoading ? (
//       <div className={styles.loader}></div> 
//     ) : (
//       <div className={styles.content}>
//         {chapters.map((chapter) => (
//           <div key={chapter._id} className={styles.accordion}>
//             <div
//               className={styles.accordion_title_container}
//               onClick={() => toggleChapter(chapter._id)}
//             >
//               <div className={styles.accordion_title}>
//                 {chapter.chapterTitle}

//                 <div className={styles.chapterInfo}>
//                   {calculateCompletionStatus(chapter.topics)} | {calculateChapterDuration(chapter.topics)}
//                 </div>

//               </div>
//               {activeMenuIds.includes(chapter._id) ? (
//                 <RiArrowDropUpLine className={styles.arrow_icon} size={26} />
//               ) : (
//                 <RiArrowDropDownLine className={styles.arrow_icon} size={26} />
//               )}
//             </div>
//             {activeMenuIds.includes(chapter._id) && (
// <ul className={styles.submenu_list}>
//   {chapter.topics.map((topic, index) => (
//     <li key={topic._id} className={styles.submenu_item}>
//       <div className={styles.options_container}>
//         {completedVideos[topic.selectedVideo] ? (
//           <MdCheckBox className={styles.checkbox_icon} size={20} onClick={() => toggleCompletion(topic._id, topic.selectedVideo)} />
//         ) : (
//           <MdCheckBoxOutlineBlank className={styles.checkbox_icon} size={20} onClick={() => toggleCompletion(topic._id, topic.selectedVideo)} />
//         )}
//         <span className={styles.topic_number}>{index + 1}.</span>
//         <div
//           className={`${styles.submenu_button} ${selectedVideoId === topic.selectedVideo ? styles.active : ''}`}
//           onClick={() => setSelectedVideoId(topic.selectedVideo)}
//         >
//           {topic.videoTitle}
//         </div>

//         <MdOndemandVideo className={styles.video_icon} size={18} />
//         <span className={styles.video_duration}>{formatDuration(topic.duration)}</span>
//         <button
//           className={styles.resource_button}
//           onClick={() => window.open(topic.selectedPdf, '_blank')}
//           aria-label={`Resources for ${topic.videoTitle}`}
//         >
//           Resources
//         </button>

//       </div>
//     </li>
//   ))}
// </ul>
//             )}
//           </div>
//         ))}
//       </div>
//     )}
//     </div>
//   );
// };
// export default Sidebar;
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useVideo } from '../../../../context/VideoContext';
// import { RiCloseLine, RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
// import { MdCheckBox, MdCheckBoxOutlineBlank, MdOndemandVideo } from "react-icons/md";
// import styles from './Sidebar.module.css';

// const Sidebar = ({ apiUrl, onClose }) => {
//   const navigate = useNavigate();
//   const { courseId } = useParams();
//   const [chapters, setChapters] = useState([]);
//   const [activeMenuIds, setActiveMenuIds] = useState([]);
//   const { selectedVideoId, setSelectedVideoId, updateChapters, completedVideos } = useVideo();
//   const [isLoading, setIsLoading] = useState(true);
//   const [expandedChapters, setExpandedChapters] = useState({});
//   const { markVideoAsCompleted } = useVideo();

//   // useEffect(() => {

//   //   const fetchChapters = async () => {
//   //     setIsLoading(true);
//   //     try {
//   //       const response = await fetch(`${apiUrl}/api/chapters/course/${courseId}`);
//   //       if (!response.ok) throw new Error('Failed to fetch chapters');
//   //       const data = await response.json();
//   //       console.log("Fetched chapters data:", data); 
//   //       updateChapters(data);
//   //       setChapters(data); 
//   //       setIsLoading(false);
//   //     } catch (error) {
//   //       console.error("Failed to fetch chapters:", error);
//   //       setIsLoading(false);
//   //     }
//   //   };  fetchChapters();
//   // }, [apiUrl, courseId]);
//   /////////////////////////////////New for duration////////////////
//   const formatDuration = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = (seconds % 60).toFixed(2);//rounded sec in 2 decimal place
//     return [
//       hours ? `${hours}h` : null,
//       `${minutes}m`,
//       `${remainingSeconds}s`
//     ].filter(Boolean).join(' ');
//   };

//   useEffect(() => {
//     const fetchChapters = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(`${apiUrl}/api/chapters/course/${courseId}`);
//         if (!response.ok) throw new Error('Failed to fetch chapters');
//         let data = await response.json();

//         // Fetch durations for all videos in the chapters
//         const videoIds = data.flatMap(chapter => chapter.topics.map(topic => topic.selectedVideo));
//         const uniqueVideoIds = [...new Set(videoIds)]; // Ensure we only fetch unique video IDs

//         // Fetching durations for each video
//         const durationsPromises = uniqueVideoIds.map(id =>
//           fetch(`${apiUrl}/videos/${id}`).then(res => {
//             if (!res.ok) {
//               console.error(`Failed to fetch video details for video ID: ${id}`);
//               return { _id: id, duration: 0 }; // Fallback if specific video detail fetch fails
//             }
//             return res.json();
//           })
//         );
//         const durations = await Promise.all(durationsPromises);
//         const durationsMap = durations.reduce((acc, video) => {
//           acc[video._id] = video.duration || 0;
//           return acc;
//         }, {});

//         // Include durations in topics and calculate total chapter durations
//         data = data.map(chapter => {
//           let chapterDurationSeconds = 0;
//           const updatedTopics = chapter.topics.map(topic => {
//             const duration = durationsMap[topic.selectedVideo] || 0; // Fallback to 0 if duration is not found
//             chapterDurationSeconds += duration;
//             return { ...topic, duration };
//           });
//           const chapterDurationFormatted = formatDuration(chapterDurationSeconds);
//           return { ...chapter, topics: updatedTopics, chapterDuration: chapterDurationFormatted };
//         });

//         updateChapters(data); // Update the global chapters data
//         setChapters(data); // Also set the local state
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch chapters or video details:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchChapters();
//   }, [apiUrl, courseId]);

//   const toggleChapterVisibility = (chapterId) => {
//     setExpandedChapters(prevState => ({
//       ...prevState,
//       [chapterId]: !prevState[chapterId]
//     }));
//   };

//   const fetchAndOpenPdf = async (pdfId) => {
//     try {
//       const response = await fetch(`${apiUrl}/api/pdfs/${pdfId}`);
//       if (!response.ok) throw new Error('Failed to fetch PDF data');
//       const pdfData = await response.json();
//       window.open(pdfData.cloudFrontUrl, '_blank');
//     } catch (error) {
//       console.error("Failed to fetch PDF data:", error);
//     }
//   };

//   // Use navigate to redirect to PDFViewer page
//   const navigateToPdfViewer = (pdfId) => {
//     navigate(`/pdfviewer/${pdfId}`); // Use navigate for routing
//   };

//   // const handleToggleCompletion = (videoId) => {
//   //   // Toggle the completion status based on the current state
//   //   const isCurrentlyCompleted = !!completedVideos[videoId];
//   //   markVideoAsCompleted(videoId, !isCurrentlyCompleted);
//   // };

//   const calculateChapterDuration = (topics) => {
//     const totalDurationSeconds = topics.reduce((acc, topic) => acc + topic.duration, 0);
//     return formatDuration(totalDurationSeconds);
//   };

//   const auth = localStorage.getItem("user");

//   const getUserId = () => {
//     const user = localStorage.getItem("user");
//     return user ? JSON.parse(user)._id : null;
//   };

//   const userId = getUserId();
//   // const handleToggleCompletion = (videoId) => {
//   //   // Toggle the completion status based on the current state
//   //   const isCurrentlyCompleted = !!completedVideos[videoId];
//   //   markVideoAsCompleted(videoId, !isCurrentlyCompleted);

//   //   // Optionally update the backend with the new completion status
//   //   // and then fetch updated course details to reflect in the UI.
//   //   // This is assuming you have an API endpoint to update the video completion status.
//   //   const updateCompletionStatusAPI = `${apiUrl}/updateCompletionStatus`; // Example API endpoint
//   //   fetch(updateCompletionStatusAPI, {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify({
//   //       userId: getUserId(), // Assuming you have a function to get the current user's ID
//   //       videoId: videoId,
//   //       completed: !isCurrentlyCompleted,
//   //     }),
//   //   })
//   //   .then(response => response.json())
//   //   .then(data => {
//   //     // Trigger an event or call a function that fetches updated course details
//   //     // to reflect the new completion status in the VideoHeader component.
//   //   })
//   //   .catch(error => console.error('Error updating completion status:', error));
//   // };

//   const handleToggleCompletion = (videoId) => {
//     const newCompletionStatus = !completedVideos[videoId];
//     markVideoAsCompleted(videoId, newCompletionStatus);
//   };

//   // const calculateCompletionStatus = (topics) => {
//   //   const completedCount = topics.filter(t => t.completed).length;
//   //   return `${completedCount} / ${topics.length}`;
//   // };

//   const calculateCompletionStatus = (topics) => {
//     const completedCount = topics.reduce((acc, topic) => acc + (completedVideos[topic.selectedVideo] ? 1 : 0), 0);
//     return `${completedCount} / ${topics.length}`;
//   };

//   const toggleCompletion = async (topicId, selectedVideo) => {
//     const isCompleted = completedVideos[selectedVideo];
//     markVideoAsCompleted(selectedVideo, !isCompleted);
//   };

//   const toggleChapter = (chapterId) => {
//     setActiveMenuIds(currentIds =>
//       currentIds.includes(chapterId)
//         ? currentIds.filter(id => id !== chapterId)
//         : [...currentIds, chapterId]
//     );
//   };

//   // const fetchAndOpenPdf = async (pdfId) => {
//   //   try {
//   //     const response = await fetch(`${apiUrl}/api/pdf/${pdfId}`);
//   //     if (!response.ok) throw new Error('Failed to fetch PDF data');
//   //     const pdfData = await response.json();
//   //     window.open(pdfData.cloudFrontUrl, '_blank');
//   //   } catch (error) {
//   //     console.error("Failed to fetch PDF data:", error);
//   //   }
//   // };



//   let topicCounter = 0;

//   return (
//     <div className={styles.sidebar}>
//       <div className={styles.sidebarHeading}>
//         <h3>Course Content</h3>
//         <RiCloseLine size={24} onClick={onClose} className={styles.closeIcon} />
//       </div>
//       {isLoading ? (
//         <div className={styles.loader}></div>
//       ) : (
//         <div className={styles.content}>
//           {chapters.map((chapter) => (
//             <div key={chapter._id} className={styles.accordion}>
//               <div
//                 className={styles.accordion_title_container}
//                 onClick={() => toggleChapter(chapter._id)}
//               >
//                 <div className={styles.accordion_title}>
//                   {chapter.chapterTitle}
//                   <div className={styles.chapterInfo}>
//                     {calculateCompletionStatus(chapter.topics)} | {calculateChapterDuration(chapter.topics)}
//                   </div>
//                 </div>
//                 {activeMenuIds.includes(chapter._id) ? <RiArrowDropUpLine size={24} /> : <RiArrowDropDownLine size={24} />}
//               </div>
//               {activeMenuIds.includes(chapter._id) && (
//                 //   <ul className={styles.submenu_list}>
//                 //     {chapter.topics.map((topic, index) => (
//                 //       <li key={topic._id} className={styles.submenu_item}>
//                 //         <div className={styles.options_container}>
//                 //            {completedVideos[topic.selectedVideo] ? (
//                 //               <MdCheckBox size={20} onClick={() => handleToggleCompletion(topic.selectedVideo)} />
//                 //             ) : (
//                 //               <MdCheckBoxOutlineBlank size={20} onClick={() => handleToggleCompletion(topic.selectedVideo)} />
//                 //             )}
//                 //           <span className={styles.topic_number}>{index + 1}.</span>
//                 //           <div
//                 //             className={`${styles.submenu_button} ${selectedVideoId === topic.selectedVideo ? styles.active : ''}`}
//                 //             onClick={() => setSelectedVideoId(topic.selectedVideo)}
//                 //           >
//                 //             {topic.videoTitle}
//                 //           </div>
//                 //           <MdOndemandVideo size={18} />
//                 //           <span className={styles.video_duration}>{formatDuration(topic.duration)}</span>
//                 //           <button
//                 //             className={styles.resource_button}
//                 //             onClick={() => window.open(topic.selectedPdf, '_blank')}
//                 //           >
//                 //             Resources
//                 //           </button>
//                 //         </div>
//                 //       </li>
//                 //     ))}
//                 //   </ul>
//                 // )}
//                 <ul className={styles.submenu_list}>
//                   {chapter.topics.map((topic, index) => {
//                     topicCounter++;
//                     return (
//                       <li key={topic._id} className={styles.submenu_item}>
//                         <div className={styles.options_container}>
//                           {completedVideos[topic.selectedVideo] ? (
//                             <MdCheckBox size={20} onClick={() => handleToggleCompletion(topic.selectedVideo)} />
//                           ) : (
//                             <MdCheckBoxOutlineBlank size={20} onClick={() => handleToggleCompletion(topic.selectedVideo)} />
//                           )}

//                           {/* Use topicCounter for sequential numbering instead of index + 1 */}
//                           <span className={styles.topic_number}>{topicCounter}.</span>
//                           <div
//                             className={`${styles.submenu_button} ${selectedVideoId === topic.selectedVideo ? styles.active : ''}`}
//                             onClick={() => setSelectedVideoId(topic.selectedVideo)}
//                           >
//                             {topic.videoTitle}
//                           </div>
//                           <MdOndemandVideo size={18} />
//                           <span className={styles.video_duration}>{formatDuration(topic.duration)}</span>
//                           {/* <button
//                             className={styles.resource_button}
//                             onClick={() => window.open(topic.selectedPdf, '_blank')}
//                           >
//                             Resources
//                           </button> */}
//                           <button
//                             className={styles.resource_button}
//                             onClick={() => navigateToPdfViewer(topic.selectedPdf)} // Adjust the onClick handler
//                           >
//                             Resources
//                           </button>
//                         </div>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               )}
//             </div>
//           ))}

import React, { useState, useEffect } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { MdOndemandVideo } from "react-icons/md";
import { SiFiles } from "react-icons/si";
import Card from "../../BodyContent/Card/Card";
import styles from "./Sidebar.module.css";

const Sidebar = ({ onVideoSelect, onSubMenuSelect }) => {
  const [activeMenuIds, setActiveMenuIds] = useState([]);
  const [selectedResourceSubmenuId, setSelectedResourceSubmenuId] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [videoLengths, setVideoLengths] = useState({});

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/vc/api/chapters/65a62b88316e83e8570b7d42");
  //       const data = await response.json();
  //       console.log("Chapters:", data);
  //       setChapters(data);

  //       const lengths = {};
  //       for (const chapter of data) {
  //         for (const topic of chapter.topics) {
  //           if (topic.selectedVideo) {
  //             const videoLength = await getVideoLength(topic.selectedVideo, topic._id);
  //             lengths[topic._id] = videoLength;
  //           }
  //         }
  //       }
  //       console.log("Video Lengths:", lengths);
  //       setVideoLengths(lengths);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const [overallTopicIndex, setOverallTopicIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/vc/api/chapters/65a62b88316e83e8570b7d42");
        const data = await response.json();
        console.log("Chapters:", data);
        setChapters(data);

        const lengths = {};
        let topicIndex = 0;

        for (const chapter of data) {
          for (const topic of chapter.topics) {
            if (topic.selectedVideo) {
              const videoLength = await getVideoLength(topic.selectedVideo, topic._id);
              lengths[topic._id] = videoLength;
            }

            // Set a unique index for each topic
            topic.overallIndex = topicIndex;
            topicIndex++;
          }
        }

        console.log("Video Lengths:", lengths);
        setVideoLengths(lengths);
        setOverallTopicIndex(topicIndex);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const handleResourcesClick = (submenuId) => {
    setSelectedResourceSubmenuId((prevId) => (prevId === submenuId ? null : submenuId));
  };

  const getVideoLength = async (videoUrl, topicId) => {
    const timestampedVideoUrl = `${videoUrl}?t=${Date.now()}`;

    const videoElement = document.createElement("video");
    videoElement.src = timestampedVideoUrl;

    return new Promise((resolve) => {
      videoElement.addEventListener("loadedmetadata", () => {
        const videoLengthInSeconds = videoElement.duration;
        const formattedVideoLength = formatVideoLength(videoLengthInSeconds);
        resolve(formattedVideoLength);
      });

      videoElement.load();
    });
  };

  const formatVideoLength = (lengthInSeconds) => {
    const hours = Math.floor(lengthInSeconds / 3600);
    const minutes = Math.floor((lengthInSeconds % 3600) / 60);
    const seconds = Math.floor(lengthInSeconds % 60);

    const formattedHours = hours > 0 ? `${hours}h` : "";
    const formattedMinutes = minutes > 0 ? `${minutes}m` : "";
    const formattedSeconds = seconds > 0 ? `${seconds}s` : "";

    return `${formattedHours} ${formattedMinutes} ${formattedSeconds}`;
  };

  const handlePdfTitleClick = (pdfUrl) => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className={styles.sidebar}>
      {chapters.map((chapter) => (
        <div
          key={chapter._id}
          className={`${styles.accordion} ${activeMenuIds.includes(chapter._id) ? styles.active : ""
            }`}
        >
          <div
            className={styles.accordion_title_container}
            onClick={() =>
              setActiveMenuIds((prevMenuIds) =>
                prevMenuIds.includes(chapter._id)
                  ? prevMenuIds.filter((id) => id !== chapter._id)
                  : [...prevMenuIds, chapter._id]
              )
            }
          >
            <div className={styles.accordion_title}>
              {chapter.chapterTitle}
              {activeMenuIds.includes(chapter._id) ? (
                <RiArrowDropUpLine className={styles.arrow_icon} size={26} />
              ) : (
                <RiArrowDropDownLine className={styles.arrow_icon} size={26} />
              )}
            </div>
          </div>
          {activeMenuIds.includes(chapter._id) && (
            <ul className={styles["submenu-list"]}>
              {chapter.topics.map((topic, index) => (
                <li key={topic._id} className={styles["submenu-item"]}>
                  <div className={styles.submenu_content}>
                    <button
                      className={styles["submenu-button"]}
                      onClick={() => {
                        onVideoSelect(topic.selectedVideo);
                        onSubMenuSelect(topic.videoTitle);
                      }}
                    >
                      {/* {topic.videoTitle} */}
                      {`${topic.overallIndex + 1}. ${topic.videoTitle}`}

                    </button>
                    <div className={styles.options_container}>
                      <MdOndemandVideo
                        className={styles.video_icon}
                        onClick={() => onVideoSelect(topic.selectedVideo)}
                      />
                      <p className={styles.video_length}>
                        {videoLengths[topic._id] && `${videoLengths[topic._id]}`}
                      </p>
                      <div className={styles.dropdown_container}>
                        <label
                          className={styles.dropdown_container1}
                          onClick={() => handleResourcesClick(topic._id)}
                        >
                          <SiFiles className={styles.pdf_icon} size={10} />
                          Resources
                        </label>
                        {selectedResourceSubmenuId === topic._id && (
                          <Card className={styles.pdf_dropdown}>
                            <ul>
                              <li>
                                <a href={topic.selectedPdf} target="_blank" rel="noopener noreferrer">
                                  {topic.pdfTitle || "Untitled PDF"}
                                </a>
                              </li>
                            </ul>
                          </Card>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
      </div>
  )}
export default Sidebar;

