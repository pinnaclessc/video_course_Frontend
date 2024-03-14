import React, { useState, useEffect } from 'react';
import { useVideo } from '../../../../context/VideoContext';
import { RiCloseLine, RiArrowDropDownLine, RiArrowDropUpLine, RiCheckboxBlankCircleLine, RiCheckboxCircleFill } from 'react-icons/ri';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdOndemandVideo } from "react-icons/md";
import styles from './CourseContent.module.css';

const CourseContent = ({ apiUrl, onClose }) => {
  const { selectedVideoId, setSelectedVideoId } = useVideo();
  const [selectedResourceSubmenuId, setSelectedResourceSubmenuId] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [videoDurations, setVideoDurations] = useState({});
  const [activeMenuIds, setActiveMenuIds] = useState([]);
  const [videoNumberOffset, setVideoNumberOffset] = useState({});
  const course_id = "65d5c59aca321455979ee32d";

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/chapters/course/${course_id}`);
        const data = await response.json();
        setChapters(data);
        // Fetch durations for all videos in the chapters
        const videoIds = data.flatMap(chapter => chapter.topics.map(topic => topic.selectedVideo));
        const uniqueVideoIds = [...new Set(videoIds)];
        const durationsPromises = uniqueVideoIds.map(id =>
          fetch(`${apiUrl}/videos/${id}`).then(res => res.json())
        );
        const durations = await Promise.all(durationsPromises);


        const durationsMap = durations.reduce((acc, video) => {
          acc[video._id] = formatDuration(video.duration);
          return acc;
        }, {});
        setVideoDurations(durationsMap);

        let offset = 0;
        const newVideoNumberOffset = {};
        // Calculate the offset for video numbers
        data.forEach(chapter => {
          newVideoNumberOffset[chapter._id] = offset;
          offset += chapter.topics.length;
        });
        setVideoNumberOffset(newVideoNumberOffset);

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

  const formatDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    return `${hours > 0 ? `${hours}hr ` : ''}${minutes}min`;
  };

  const getFormattedDuration = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}hr ${minutes}min`;
  };

  const calculateChapterDuration = (topics) => {
    const totalDurationMinutes = topics.reduce((acc, { duration }) => acc + duration, 0);
    return getFormattedDuration(totalDurationMinutes);
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
export default CourseContent;
