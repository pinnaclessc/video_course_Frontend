import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ChapterList.module.css";

const ChaptersList = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/courses"
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
            `http://localhost:8000/vc/chapters/${selectedCourse}`
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
        `http://localhost:8000/vc/chapters/${chapterId}/topics/${topicId}`,
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
        `http://localhost:8000/vc/chapters/${chapterId}/topics/${topicId}`
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