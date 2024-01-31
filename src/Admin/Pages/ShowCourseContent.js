import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ShowCourseContent.module.css';

const ChaptersList = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://13.200.156.92:8000/api/courses');
        setCourses(response.data);

        // Set default selectedCourse if there is at least one course
        if (response.data.length > 0) {
          setSelectedCourse(response.data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        if (selectedCourse) {
          const response = await axios.get(`http://13.200.156.92:8000/vc/api/chapters/${selectedCourse}`);
          setChapters(response.data);
        }
      } catch (error) {
        console.error('Error fetching chapters:', error);
      }
    };

    fetchChapters();
  }, [selectedCourse]);

//   const handleUpdateChapterTitle = async (courseId, chapterId, newTitle) => {
//     try {
//         console.log(`courseId:${courseId} and ChapterId:${chapterId}`)
//         console.log('courseId:', courseId);
// console.log('chapterId:', chapterId);

//       const response = await axios.put(`http://http://13.200.156.92:8000/:8000/course/${courseId}/update-chapter/${chapterId}`, {
//         chapterTitle: newTitle,
        
//       });
//       console.log('newChapterTitle:', newTitle)

//       if (response.status === 200) {
//         // Update the local state with the updated chapter title
//         setChapters((prevChapters) => {
//           return prevChapters.map((chapter) =>
//             chapter._id === chapterId ? { ...chapter, chapterTitle: newTitle } : chapter
//           );
//         });
//       }
//     } catch (error) {
//       console.error('Error updating chapter title:', error);
//     }
//   };

  const handleUpdateTopic = async (chapterId, topicId, newData) => {
    try {
      // Send a PUT request to the server to update the topic
      const response = await axios.put(`http://13.200.156.92:8000/chapters/${chapterId}/topics/${topicId}`, newData);

      if (response.status === 200) {
        // Update the local state with the updated topic data
        setChapters((prevChapters) => {
          return prevChapters.map((chapter) => {
            if (chapter._id === chapterId) {
              return {
                ...chapter,
                topics: chapter.topics.map((topic) =>
                  topic._id === topicId ? { ...topic, ...newData } : topic
                ),
              };
            } else {
              return chapter;
            }
          });
        });
      }
    } catch (error) {
      console.error('Error updating topic:', error);
    }
  };

  const handleDeleteTopic = async (chapterId, topicId) => {
    try {
      const response = await axios.delete(`http://13.200.156.92:8000/chapters/${chapterId}/topics/${topicId}`);

      if (response.status === 200) {
        // Update the local state by removing the deleted topic
        setChapters((prevChapters) => {
          return prevChapters.map((chapter) => {
            if (chapter._id === chapterId) {
              return {
                ...chapter,
                topics: chapter.topics.filter((topic) => topic._id !== topicId),
              };
            } else {
              return chapter;
            }
          });
        });
      }
    } catch (error) {
      console.error('Error deleting topic:', error);
    }
  };

  return (
    <div className={styles["Show-container"]}>
      <label className={styles.selectLabel}>
        Select Course:
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.courseTitle}
            </option>
          ))}
        </select>
      </label>

      {chapters.length>0 && (
        <div className={styles.chapterContainer}>
          {chapters.map((chapter) => (


            <div key={chapter._id} className={styles['Show-chapter']}>
              <div className={styles["Show-chapterTitle"]}>
                Chapter Title: {chapter.chapterTitle}
                {/* <button
                  onClick={() => {
                    const newTitle = prompt('Enter new chapter title:');
                    if (newTitle !== null) {
                      handleUpdateChapterTitle(selectedCourse, chapter._id, newTitle);
                    }
                  }}
                >
                  Update Chapter Title
                </button> */}
              </div>
              <ul className={styles.topicList}>
                {chapter.topics.map((topic) => (
                  <li key={topic._id} className={styles.topicItem}>
                    <div className={styles.topicTitle}>
                      Topic Title: {topic.videoTitle}
                      <button
                      className={styles["Show-editLink"]}
                        onClick={() => {
                          const newData = {
                            videoTitle: prompt('Enter new video title:', topic.videoTitle),
                            selectedVideo: prompt('Enter new video URL:', topic.selectedVideo),
                            pdfTitle: prompt('Enter new PDF title:', topic.pdfTitle),
                            selectedPdf: prompt('Enter new PDF URL:', topic.selectedPdf),
                          };

                          if (
                            newData.videoTitle !== null &&
                            newData.selectedVideo !== null &&
                            newData.pdfTitle !== null &&
                            newData.selectedPdf !== null
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
                          if (window.confirm('Are you sure you want to delete this topic?')) {
                            handleDeleteTopic(chapter._id, topic._id);
                          }
                        }}
                      >
                        Delete Topic
                      </button>
                    </div>
                    <div><strong>Video Title:</strong> {topic.videoTitle}</div>
                    <div><strong>Video URL:</strong> {topic.selectedVideo}</div>
                    <div><strong>PDF Title:</strong> {topic.pdfTitle}</div>
                    <div><strong>PDF URL:</strong> {topic.selectedPdf}</div>
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

