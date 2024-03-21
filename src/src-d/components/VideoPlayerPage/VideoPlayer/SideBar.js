import React, { useState, useEffect } from 'react';
import { useVideo } from '../../../../context/VideoContext';
import { RiCloseLine, RiArrowDropDownLine, RiArrowDropUpLine, RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from 'react-icons/ri';
import { FaFileVideo } from 'react-icons/fa';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdOndemandVideo } from "react-icons/md";
import styles from './Sidebar.module.css';

const Sidebar = ({ apiUrl, onClose }) => {
  const { selectedVideoId, setSelectedVideoId } = useVideo();
  const [selectedResourceSubmenuId, setSelectedResourceSubmenuId] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [videoDurations, setVideoDurations] = useState({});
  const [activeMenuIds, setActiveMenuIds] = useState([]);
  const [videoNumberOffset, setVideoNumberOffset] = useState({});
  const course_id = "65f16ac10a7f3b164321f260";

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/chapters/course/${course_id}`);
        let data = await response.json();

        // Fetch durations for all videos in the chapters
        const videoIds = data.flatMap(chapter => chapter.topics.map(topic => topic.selectedVideo));
        const uniqueVideoIds = [...new Set(videoIds)];
        const durationsPromises = uniqueVideoIds.map(id =>
          fetch(`${apiUrl}/videos/${id}`).then(res => res.json())
        );
        const durations = await Promise.all(durationsPromises);
        const durationsMap = durations.reduce((acc, video) => {
          acc[video._id] = video.duration;
          return acc;
        }, {});

        // Include durations in topics and calculate total chapter durations
        data = data.map(chapter => {
          let chapterDurationSeconds = 0;
          const updatedTopics = chapter.topics.map(topic => {
            const duration = durationsMap[topic.selectedVideo] || 0;
            chapterDurationSeconds += duration;
            return { ...topic, duration };
          });
          const chapterDurationFormatted = formatDuration(chapterDurationSeconds);
          return { ...chapter, topics: updatedTopics, chapterDuration: chapterDurationFormatted }; // Append total duration to chapter
        });

        setChapters(data);
      } catch (error) {
        console.error("Failed to fetch chapters or video details:", error);
      }
    };

    fetchChapters();
  }, [apiUrl]);


  const toggleCompletion = async (topicId) => {
    const updatedChapters = chapters.map(chapter => ({
      ...chapter,
      topics: chapter.topics.map(topic => {
        if (topic._id === topicId) {
          return {
            ...topic,
            completed: !topic.completed
          };
        }
        return topic;
      })
    }));
    setChapters(updatedChapters);
  };

  const toggleChapter = (chapterId) => {
    setActiveMenuIds(currentIds =>
      currentIds.includes(chapterId)
        ? currentIds.filter(id => id !== chapterId)
        : [...currentIds, chapterId]
    );
  };

  // Assuming duration is provided in seconds
  const formatDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${hours > 0 ? `${hours}hr ` : ''}${minutes > 0 ? `${minutes}min ` : ''}${seconds}s`;
  };

  const calculateChapterDuration = (topics) => {
    const totalDurationSeconds = topics.reduce((acc, topic) => acc + topic.duration, 0);
    return formatDuration(totalDurationSeconds);
  };


  const calculateCompletionStatus = (topics) => {
    const completedCount = topics.filter(t => t.completed).length;
    return `${completedCount} / ${topics.length}`;
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeading}>
        <h3>Course Content</h3>
        <RiCloseLine size={24} onClick={onClose} className={styles.closeIcon} />
      </div>
      <div className={styles.content}>
        {chapters.map((chapter) => (
          <div key={chapter._id} className={styles.accordion}>
            <div
              className={styles.accordion_title_container}
              onClick={() => toggleChapter(chapter._id)}
            >
              <div className={styles.accordion_title}>
                {chapter.chapterTitle}
                
                <div className={styles.chapterInfo}>
                  {calculateCompletionStatus(chapter.topics)} | {calculateChapterDuration(chapter.topics)}
                </div>

              </div>
              {activeMenuIds.includes(chapter._id) ? (
                <RiArrowDropUpLine className={styles.arrow_icon} size={26} />
              ) : (
                <RiArrowDropDownLine className={styles.arrow_icon} size={26} />
              )}
            </div>
            {activeMenuIds.includes(chapter._id) && (
              <ul className={styles.submenu_list}>
                {chapter.topics.map((topic, index) => (
                  <li key={topic._id} className={styles.submenu_item}>
                    <div className={styles.options_container}>
                      {topic.completed ? (
                        <MdCheckBox className={styles.checkbox_icon} size={20} />
                      ) : (
                        <MdCheckBoxOutlineBlank className={styles.checkbox_icon} size={20} />
                      )}<span className={styles.topic_number}>{index + 1}.</span>
                      <div
                        className={`${styles.submenu_button} ${selectedVideoId === topic.selectedVideo ? styles.active : ''}`}
                        onClick={() => setSelectedVideoId(topic.selectedVideo)}
                      >
                        {topic.videoTitle}
                      </div>

                      <MdOndemandVideo className={styles.video_icon} size={18} />
                      <span className={styles.video_duration}>{formatDuration(topic.duration)}</span>
                      <button
                        className={styles.resource_button}
                        onClick={() => window.open(topic.selectedPdf, '_blank')}
                        aria-label={`Resources for ${topic.videoTitle}`}
                      >
                        Resources
                      </button>

                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Sidebar;
