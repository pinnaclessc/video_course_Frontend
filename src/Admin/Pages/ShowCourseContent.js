import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ShowCourseContent.module.css";

const ChaptersList = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://13.200.156.92:8000/api/courses"
        );
        setCourses(response.data);

        if (response.data.length > 0) {
          setSelectedCourse(response.data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        if (selectedCourse) {
          const response = await axios.get(
            `http://13.200.156.92:8000/vc/api/chapters/${selectedCourse}`
          );
          setChapters(response.data);
        }
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    if (selectedCourse) {
      fetchChapters();
    }
  }, [selectedCourse]);

  const handleUpdateTopic = async (chapterId, topicId, newData) => {
    try {
      const response = await axios.put(
        `http://13.200.156.92:8000/chapters/${chapterId}/topics/${topicId}`,
        newData
      );

      if (response.status === 200) {
        setChapters((prevChapters) =>
          prevChapters.map((chapter) =>
            chapter._id === chapterId
              ? {
                  ...chapter,
                  topics: chapter.topics.map((topic) =>
                    topic._id === topicId ? { ...topic, ...newData } : topic
                  ),
                }
              : chapter
          )
        );
      }
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  const handleDeleteTopic = async (chapterId, topicId) => {
    try {
      const response = await axios.delete(
        `http://13.200.156.92:8000/chapters/${chapterId}/topics/${topicId}`
      );

      if (response.status === 200) {
        setChapters((prevChapters) =>
          prevChapters.map((chapter) =>
            chapter._id === chapterId
              ? {
                  ...chapter,
                  topics: chapter.topics.filter(
                    (topic) => topic._id !== topicId
                  ),
                }
              : chapter
          )
        );
      }
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  return (
    <div className={styles["Show-container"]}>
      <label className={styles.selectLabel}>
        Select Course:
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className={styles.selectInput}
        >
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.courseTitle}
            </option>
          ))}
        </select>
      </label>

      {chapters.length > 0 && (
        <div className={styles.chapterContainer}>
          {chapters.map((chapter) => (
            <div key={chapter._id} className={styles["Show-chapter"]}>
              <div className={styles["Show-chapterTitle"]}>
                Chapter Title: {chapter.chapterTitle}
              </div>
              <ul className={styles.topicList}>
                {chapter.topics.map((topic) => (
                  <li key={topic._id} className={styles.topicItem}>
                    <div className={styles.topicTitle}>
                      <strong>Topic Title:</strong> {topic.videoTitle}
                      <button
                        className={styles["Show-editLink"]}
                        onClick={() => {
                          const newData = {
                            videoTitle: prompt(
                              "Enter new video title:",
                              topic.videoTitle
                            ),
                            selectedVideo: prompt(
                              "Enter new video URL:",
                              topic.selectedVideo
                            ),
                            pdfTitle: prompt(
                              "Enter new PDF title:",
                              topic.pdfTitle
                            ),
                            selectedPdf: prompt(
                              "Enter new PDF URL:",
                              topic.selectedPdf
                            ),
                          };

                          if (
                            newData.videoTitle &&
                            newData.selectedVideo &&
                            newData.pdfTitle &&
                            newData.selectedPdf
                          ) {
                            handleUpdateTopic(chapter._id, topic._id, newData);
                          }
                        }}
                      >
                        Update Topic
                      </button>
                      <button
                        className={styles["Show-DeleteBTN"]}
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this topic?"
                            )
                          ) {
                            handleDeleteTopic(chapter._id, topic._id);
                          }
                        }}
                      >
                        Delete Topic
                      </button>
                    </div>
                    <div>
                      <strong>Video URL:</strong> {topic.selectedVideo}
                    </div>
                    <div>
                      <strong>PDF Title:</strong> {topic.pdfTitle}
                    </div>
                    <div>
                      <strong>PDF URL:</strong> {topic.selectedPdf}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChaptersList;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './ShowCourseContent.module.css';

// const ChaptersList = () => {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [chapters, setChapters] = useState([]);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [updatingChapterId, setUpdatingChapterId] = useState(null);
//   const [newChapterTitle, setNewChapterTitle] = useState('');

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get('http://13.200.156.92:8000/api/courses');
//         setCourses(response.data);
//         if (response.data.length > 0) {
//           setSelectedCourse(response.data[0]._id);
//         }
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//       }
//     };
//     fetchCourses();
//   }, []);

//   const fetchChapters = async () => {
//     if (selectedCourse) {
//       try {
//         const response = await axios.get(`http://13.200.156.92:8000/vc/api/chapters/${selectedCourse}`);
//         setChapters(response.data);
//       } catch (error) {
//         console.error('Error fetching chapters:', error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchChapters();
//   }, [selectedCourse]);

//   const handleUpdateChapter = async (chapterId) => {
//     await axios.put(`http://13.200.156.92:8000/api/chapters/${chapterId}`, { chapterTitle: newChapterTitle });
//     setIsUpdating(true);
//     setUpdatingChapterId(chapterId);
//     // Here you would typically show a form to input the new chapter title
//     // and then send a request to your backend. This is a simplified placeholder.
//     const updatedTitle = newChapterTitle; // This should be set from your form input
//     try {
//       await axios.put(`http://localhost:8000/api/chapters/${chapterId}`, { chapterTitle: updatedTitle });
//       fetchChapters(); // Refresh chapters list
//     } catch (error) {
//       console.error('Error updating chapter:', error);
//     } finally {
//       setIsUpdating(false);
//       setUpdatingChapterId(null);
//     }
//   };

//   const handleDeleteChapter = async (chapterId) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/chapters/${chapterId}`);
//       fetchChapters();
//     } catch (error) {
//       console.error('Error deleting chapter:', error);
//     }
//   };

//   return (
//     <div className={styles["Show-container"]}>
//       <label className={styles.selectLabel}>
//         Select Course:
//         <select
//           value={selectedCourse}
//           onChange={(e) => setSelectedCourse(e.target.value)}
//           className={styles.selectInput}
//         >
//           {courses.map((course) => (
//             <option key={course._id} value={course._id}>
//               {course.courseTitle}
//             </option>
//           ))}
//         </select>
//       </label>

//       {chapters.length > 0 && (
//         <div className={styles.chapterContainer}>
//           {chapters.map((chapter) => (
//             <div key={chapter._id} className={styles["Show-chapter"]}>
//               <div className={styles["Show-chapterTitle"]}>
//                 {isUpdating && updatingChapterId === chapter._id ? (
//                   <input
//                     type="text"
//                     value={newChapterTitle}
//                     onChange={(e) => setNewChapterTitle(e.target.value)}
//                   />
//                 ) : (
//                   <>
//                     Chapter Title: {chapter.chapterTitle}
//                     <button onClick={() => setUpdatingChapterId(chapter._id)}>Edit</button>
//                   </>
//                 )}
//                 {isUpdating && updatingChapterId === chapter._id && (
//                   <button onClick={() => handleUpdateChapter(chapter._id)}>Update</button>
//                 )}
//                 <button onClick={() => handleDeleteChapter(chapter._id)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
// export default ChaptersList;

// merged code

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './ShowCourseContent.module.css';

// const ChaptersList = () => {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [chapters, setChapters] = useState([]);
//   const [isUpdatingChapter, setIsUpdatingChapter] = useState(false);
//   const [updatingChapterId, setUpdatingChapterId] = useState(null);
//   const [newChapterTitle, setNewChapterTitle] = useState('');

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/courses');
//         setCourses(response.data);
//         if (response.data.length > 0) {
//           setSelectedCourse(response.data[0]._id);
//         }
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//       }
//     };
//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     const fetchChapters = async () => {
//       if (selectedCourse) {
//         try {
//           const response = await axios.get(`http://localhost:8000/vc/api/chapters/${selectedCourse}`);
//           setChapters(response.data);
//         } catch (error) {
//           console.error('Error fetching chapters:', error);
//         }
//       }
//     };
//     fetchChapters();
//   }, [selectedCourse]);

//   const handleUpdateChapterTitle = async (chapterId) => {
//     try {
//       await axios.put(`http://localhost:8000/api/chapters/${chapterId}`, {
//         chapterTitle: newChapterTitle,
//       });
//       setNewChapterTitle('');
//       setUpdatingChapterId(null);
//       setIsUpdatingChapter(false);
//       // Refresh chapters list
//       const response = await axios.get(`http://localhost:8000/vc/api/chapters/${selectedCourse}`);
//       setChapters(response.data);
//     } catch (error) {
//       console.error('Error updating chapter title:', error);
//     }
//   };

//   const handleDeleteChapter = async (chapterId) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/chapters/${chapterId}`);
//       // Refresh chapters list
//       const response = await axios.get(`http://localhost:8000/vc/api/chapters/${selectedCourse}`);
//       setChapters(response.data);
//     } catch (error) {
//       console.error('Error deleting chapter:', error);
//     }
//   };

//   const handleUpdateTopic = async (chapterId, topicId, updatedTopic) => {
//     try {
//       await axios.put(`http://localhost:8000/api/chapters/${chapterId}/topics/${topicId}`, updatedTopic);
//       // Refresh chapters list
//       const response = await axios.get(`http://localhost:8000/vc/api/chapters/${selectedCourse}`);
//       setChapters(response.data);
//     } catch (error) {
//       console.error('Error updating topic:', error);
//     }
//   };

//   const handleDeleteTopic = async (chapterId, topicId) => {
//     try {
//       await axios.delete(`http://localhost:8000/api/chapters/${chapterId}/topics/${topicId}`);
//       // Refresh chapters list
//       const response = await axios.get(`http://localhost:8000/vc/api/chapters/${selectedCourse}`);
//       setChapters(response.data);
//     } catch (error) {
//       console.error('Error deleting topic:', error);
//     }
//   };

//   return (
//     <div className={styles.ShowContainer}>
//       <label className={styles.selectLabel}>
//         Select Course:
//         <select
//           value={selectedCourse}
//           onChange={(e) => setSelectedCourse(e.target.value)}
//           className={styles.selectInput}
//         >
//           {courses.map((course) => (
//             <option key={course._id} value={course._id}>
//               {course.courseTitle}
//             </option>
//           ))}
//         </select>
//       </label>

//       {chapters.length > 0 && (
//         <div className={styles.chapterContainer}>
//           {chapters.map((chapter) => (
//             <div key={chapter._id} className={styles.ShowChapter}>
//               <div className={styles.ShowChapterTitle}>
//                 {isUpdatingChapter && updatingChapterId === chapter._id ? (
//                   <>
//                     <input
//                       type="text"
//                       value={newChapterTitle}
//                       onChange={(e) => setNewChapterTitle(e.target.value)}
//                     />
//                     <button onClick={() => handleUpdateChapterTitle(chapter._id)}>Update</button>
//                     <button onClick={() => {
//                       setIsUpdatingChapter(false);
//                       setUpdatingChapterId(null);
//                     }}>Cancel</button>
//                   </>
//                 ) : (
//                   <>
//                     Chapter Title: {chapter.chapterTitle}
//                     <button onClick={() => {
//                       setIsUpdatingChapter(true);
//                       setUpdatingChapterId(chapter._id);
//                       setNewChapterTitle(chapter.chapterTitle);
//                     }}>Edit</button>
//                     <button onClick={() => handleDeleteChapter(chapter._id)}>Delete</button>
//                   </>
//                 )}
//               </div>
//               <ul className={styles.topicList}>
//                 {chapter.topics.map((topic) => (
//                   <li key={topic._id} className={styles.topicItem}>
//                     <div className={styles.topicTitle}>
//                       <strong>Topic Title:</strong> {topic.videoTitle}
//                       <button
//                         className={styles.ShowEditLink}
//                         onClick={() => {
//                           const updatedTopic = {
//                             videoTitle: prompt("Enter new video title:", topic.videoTitle),
//                             selectedVideo: prompt("Enter new video URL:", topic.selectedVideo),
//                             pdfTitle: prompt("Enter new PDF title:", topic.pdfTitle),
//                             selectedPdf: prompt("Enter new PDF URL:", topic.selectedPdf),
//                           };
//                           handleUpdateTopic(chapter._id, topic._id, updatedTopic);
//                         }}
//                       >
//                         Update
//                       </button>
//                       <button
//                         className={styles.ShowDeleteBTN}
//                         onClick={() => handleDeleteTopic(chapter._id, topic._id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

// };

// export default ChaptersList;
