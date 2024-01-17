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
  );
};

export default Sidebar;
