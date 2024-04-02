import React, { useState, useEffect } from 'react';
import { useVideo } from '../../../../context/VideoContext';
import { RiCloseLine, RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdOndemandVideo } from "react-icons/md";
import styles from './Sidebar.module.css'
import { useParams } from 'react-router-dom';

const Sidebar = ({ apiUrl, onClose }) => {

  const { selectedVideoId, setSelectedVideoId, completedVideos } = useVideo();
  const [chapters, setChapters] = useState([]);
  const [activeMenuIds, setActiveMenuIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { courseId } = useParams();

  const { markVideoAsCompleted } = useVideo();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/chapters/course/${courseId}`);
        setIsLoading(true);
        let data = await response.json();
        // After setting chapters:
        if (data.length > 0 && data[0].topics.length > 0) {
          const firstVideoId = data[0].topics[0].selectedVideo;
          setSelectedVideoId(firstVideoId);
        }

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
      finally {
        setIsLoading(false);
      }
    };

    fetchChapters();
  }, [apiUrl, setSelectedVideoId]);

  const toggleCompletion = async (topicId, selectedVideo) => {
    const isCompleted = completedVideos[selectedVideo];
    markVideoAsCompleted(selectedVideo, !isCompleted);
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
      {isLoading ? (
      <div className={styles.loader}></div> // Display the loader when data is being fetched
    ) : (
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
                      {completedVideos[topic.selectedVideo] ? (
                        <MdCheckBox className={styles.checkbox_icon} size={20} onClick={() => toggleCompletion(topic._id, topic.selectedVideo)} />
                      ) : (
                        <MdCheckBoxOutlineBlank className={styles.checkbox_icon} size={20} onClick={() => toggleCompletion(topic._id, topic.selectedVideo)} />
                      )}
                      <span className={styles.topic_number}>{index + 1}.</span>
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
    )}
    </div>
  );
};
export default Sidebar;
