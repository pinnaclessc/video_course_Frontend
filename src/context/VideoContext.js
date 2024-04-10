import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  
  const [selectedVideoId, setSelectedVideoId] = React.useState(null);
  const [chapters, setChapters] = useState([]);
  // const [selectedVideoId, setSelectedVideoId] = useState(() => Cookies.get('selectedVideoId'));
  
const updateChapters = (chaptersData) => {
  setChapters(chaptersData);
};
  const [videoQuality, setVideoQuality] = useState(() => Cookies.get('videoQuality') || '720p');
  const [videoDetails, setVideoDetails] = useState({ resolutions: [] });
  const [volume, setVolume] = useState(() => parseFloat(Cookies.get('volume')) || 0.5);
  const [playRate, setPlayRate] = useState(() => parseFloat(Cookies.get('playRate')) || 1);
  const [completedVideos, setCompletedVideos] = useState(() => {
    return JSON.parse(Cookies.get('completedVideos') || '{}');
  });

  const markVideoAsCompleted = (videoId, isCompleted) => {
    setCompletedVideos(prevCompleted => {
      const updated = { ...prevCompleted, [videoId]: isCompleted };
      Cookies.set('completedVideos', JSON.stringify(updated)); 
      return updated;
    });
  };

 // Finds the current video's index within chapters
 const findCurrentVideoIndex = (selectedVideoId) => {
  console.log("Looking for video ID:", selectedVideoId);
  console.log("Chapters data:", chapters);
  for (let chapterIndex = 0; chapterIndex < chapters.length; chapterIndex++) {
    const chapter = chapters[chapterIndex];
    for (let topicIndex = 0; topicIndex < chapter.topics.length; topicIndex++) {
      const topic = chapter.topics[topicIndex];
      console.log(`Checking video ID: ${topic.selectedVideo} against ${selectedVideoId}`);
      if (topic.selectedVideo === selectedVideoId) {
        console.log("Found at", { chapterIndex, topicIndex });
        return { chapterIndex, topicIndex };
      }
    }
  }
  console.log("Video ID not found.");
  return { chapterIndex: -1, topicIndex: -1 };
};


const navigateToNextVideo = () => {
  const { chapterIndex, topicIndex } = findCurrentVideoIndex(selectedVideoId);
  if (chapterIndex === -1 || topicIndex === -1) {
    console.error("Current video not found in any chapter.");
    return;
  }

  const currentChapter = chapters[chapterIndex];
  if (topicIndex < currentChapter.topics.length - 1) {
    // Move to the next video in the same chapter
    setSelectedVideoId(currentChapter.topics[topicIndex + 1].selectedVideo);
  } else if (chapterIndex < chapters.length - 1) {
    // Move to the first video of the next chapter
    setSelectedVideoId(chapters[chapterIndex + 1].topics[0].selectedVideo);
  } else {
    console.log("This is the last video of the last chapter.");
  }
};

const navigateToPreviousVideo = () => {
  const { chapterIndex, topicIndex } = findCurrentVideoIndex(selectedVideoId);
  if (chapterIndex === -1 || topicIndex === -1) {
    console.error("Current video not found in any chapter.");
    return;
  }

  if (topicIndex > 0) {
    // Move to the previous video in the same chapter
    setSelectedVideoId(chapters[chapterIndex].topics[topicIndex - 1].selectedVideo);
  } else if (chapterIndex > 0) {
    // Move to the last video of the previous chapter
    const previousChapterLastTopicIndex = chapters[chapterIndex - 1].topics.length - 1;
    setSelectedVideoId(chapters[chapterIndex - 1].topics[previousChapterLastTopicIndex].selectedVideo);
  } else {
    console.log("This is the first video of the first chapter.");
  }
};


useEffect(() => {
  Cookies.set('selectedVideoId', selectedVideoId);
  // Update other cookies as necessary...
}, [selectedVideoId]);

  // useEffect(() => {
  //   Cookies.set('videoQuality', videoQuality);
  //   Cookies.set('selectedVideoId', selectedVideoId);
  //   Cookies.set('volume', volume);
  //   Cookies.set('playRate', playRate);
  // }, [videoQuality, selectedVideoId, volume, playRate]);

  const contextValue = {
    selectedVideoId,
    setSelectedVideoId,
    videoQuality,
    setVideoQuality,
    videoDetails,
    setVideoDetails,
    volume,
    setVolume,
    playRate,
    setPlayRate,
    completedVideos,
    markVideoAsCompleted,
    navigateToNextVideo,
    navigateToPreviousVideo,
    // chapters,
    updateChapters
  };

  return <VideoContext.Provider value={contextValue}>{children}</VideoContext.Provider>;
};

export const useVideo = () => useContext(VideoContext);



