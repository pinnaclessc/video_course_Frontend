///////////////////////////////WORKING//////////////////////////////////////////////////

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';

// // Utility functions to manage local storage
// const localStorageKey = 'lastPlayedVideo';

// const saveLastPlayedVideo = (videoId, currentTime) => {
//   const data = JSON.stringify({ videoId, currentTime });
//   localStorage.setItem(localStorageKey, data);
// };

// const getLastPlayedVideo = () => {
//   const data = localStorage.getItem(localStorageKey);
//   return data ? JSON.parse(data) : null;
// };

// // Video context
// const VideoContext = createContext();

// // Video provider component
// export const VideoProvider = ({ children }) => {
//   const [selectedVideoId, setSelectedVideoId] = useState(() => {
//     const lastPlayed = getLastPlayedVideo();
//     return lastPlayed?.videoId || null;
//   });

//   const [videoQuality, setVideoQuality] = useState('1080p');
//   const [videoDetails, setVideoDetails] = useState({ resolutions: [] });
//   const [volume, setVolume] = useState(parseFloat(Cookies.get('volume')) || 0.5);
//   const [playRate, setPlayRate] = useState(parseFloat(Cookies.get('playRate')) || 1);
//   const [completedVideos, setCompletedVideos] = useState(() => JSON.parse(Cookies.get('completedVideos') || '{}'));
//   const [chapters, setChapters] = useState([]);

//   // Update chapters data
//   const updateChapters = (chaptersData) => {
//     setChapters(chaptersData);
//   };

//   // Mark video as completed
//   const markVideoAsCompleted = (videoId, isCompleted) => {
//     setCompletedVideos(prev => {
//       const updated = { ...prev, [videoId]: isCompleted };
//       Cookies.set('completedVideos', JSON.stringify(updated));
//       return updated;
//     });
//   };

//  // Finds the current video's index within chapters
//  const findCurrentVideoIndex = (selectedVideoId) => {
//   console.log("Looking for video ID:", selectedVideoId);
//   console.log("Chapters data:", chapters);
//   for (let chapterIndex = 0; chapterIndex < chapters.length; chapterIndex++) {
//     const chapter = chapters[chapterIndex];
//     for (let topicIndex = 0; topicIndex < chapter.topics.length; topicIndex++) {
//       const topic = chapter.topics[topicIndex];
//       console.log(`Checking video ID: ${topic.selectedVideo} against ${selectedVideoId}`);
//       if (topic.selectedVideo === selectedVideoId) {
//         console.log("Found at", { chapterIndex, topicIndex });
//         return { chapterIndex, topicIndex };
//       }
//     }
//   }
//   console.log("Video ID not found.");
//   return { chapterIndex: -1, topicIndex: -1 };
// };

// const navigateToNextVideo = () => {
//   const { chapterIndex, topicIndex } = findCurrentVideoIndex(selectedVideoId);
//   if (chapterIndex === -1 || topicIndex === -1) {
//     console.error("Current video not found in any chapter.");
//     return;
//   }

//   const currentChapter = chapters[chapterIndex];
//   if (topicIndex < currentChapter.topics.length - 1) {
//     // Move to the next video in the same chapter
//     setSelectedVideoId(currentChapter.topics[topicIndex + 1].selectedVideo);
//   } else if (chapterIndex < chapters.length - 1) {
//     // Move to the first video of the next chapter
//     setSelectedVideoId(chapters[chapterIndex + 1].topics[0].selectedVideo);
//   } else {
//     console.log("This is the last video of the last chapter.");
//   }
// };

// const navigateToPreviousVideo = () => {
//   const { chapterIndex, topicIndex } = findCurrentVideoIndex(selectedVideoId);
//   if (chapterIndex === -1 || topicIndex === -1) {
//     console.error("Current video not found in any chapter.");
//     return;
//   }

//   if (topicIndex > 0) {
//     // Move to the previous video in the same chapter
//     setSelectedVideoId(chapters[chapterIndex].topics[topicIndex - 1].selectedVideo);
//   } else if (chapterIndex > 0) {
//     // Move to the last video of the previous chapter
//     const previousChapterLastTopicIndex = chapters[chapterIndex - 1].topics.length - 1;
//     setSelectedVideoId(chapters[chapterIndex - 1].topics[previousChapterLastTopicIndex].selectedVideo);
//   } else {
//     console.log("This is the first video of the first chapter.");
//   }
// };


// useEffect(() => {
//   Cookies.set('selectedVideoId', selectedVideoId);
//   // Update other cookies as necessary...
// }, [selectedVideoId]);


// useEffect(() => {
//   // Assuming videoDetails are fetched and include a resolutions array
//   const availableQualities = videoDetails.resolutions.map(res => res.name);
//   if (availableQualities.includes('1080p')) {
//     setVideoQuality('1080p'); // Set to 1080p if available
//   }
// }, [videoDetails]);



//   // useEffect(() => {
//   //   Cookies.set('videoQuality', videoQuality);
//   //   Cookies.set('selectedVideoId', selectedVideoId);
//   //   Cookies.set('volume', volume);
//   //   Cookies.set('playRate', playRate);
//   // }, [videoQuality, selectedVideoId, volume, playRate]);

//   const contextValue = {
//     selectedVideoId,
//     setSelectedVideoId,
//     videoQuality,
//     setVideoQuality,
//     videoDetails,
//     setVideoDetails,
//     volume,
//     setVolume,
//     playRate,
//     setPlayRate,
//     completedVideos,
//     markVideoAsCompleted,
//     navigateToNextVideo,
//     navigateToPreviousVideo,
//     // chapters,
//     updateChapters
//   };

//   return <VideoContext.Provider value={contextValue}>{children}</VideoContext.Provider>;
// };

// export const useVideo = () => useContext(VideoContext);

/////////////////////////////////////////////////////////////
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import Cookies from 'js-cookie';


// const VideoContext = createContext();

// export const VideoProvider = ({ children }) => {

//   const [selectedVideoId, setSelectedVideoId] = React.useState(null);
//   const [chapters, setChapters] = useState([]);
//   // const [selectedVideoId, setSelectedVideoId] = useState(() => Cookies.get('selectedVideoId'));

// const updateChapters = (chaptersData) => {
//   setChapters(chaptersData);
// };
//   const [videoQuality, setVideoQuality] = useState(() => Cookies.get('videoQuality') || '720p');
//   const [videoDetails, setVideoDetails] = useState({ resolutions: [] });
//   const [volume, setVolume] = useState(() => parseFloat(Cookies.get('volume')) || 0.5);
//   const [playRate, setPlayRate] = useState(() => parseFloat(Cookies.get('playRate')) || 1);
//   const [completedVideos, setCompletedVideos] = useState(() => {
//     return JSON.parse(Cookies.get('completedVideos') || '{}');
//   });

//   const markVideoAsCompleted = (videoId, isCompleted) => {
//     setCompletedVideos(prevCompleted => {
//       const updated = { ...prevCompleted, [videoId]: isCompleted };
//       Cookies.set('completedVideos', JSON.stringify(updated)); 
//       return updated;
//     });
//   };

//  // Finds the current video's index within chapters
//  const findCurrentVideoIndex = (selectedVideoId) => {
//   console.log("Looking for video ID:", selectedVideoId);
//   console.log("Chapters data:", chapters);
//   for (let chapterIndex = 0; chapterIndex < chapters.length; chapterIndex++) {
//     const chapter = chapters[chapterIndex];
//     for (let topicIndex = 0; topicIndex < chapter.topics.length; topicIndex++) {
//       const topic = chapter.topics[topicIndex];
//       console.log(`Checking video ID: ${topic.selectedVideo} against ${selectedVideoId}`);
//       if (topic.selectedVideo === selectedVideoId) {
//         console.log("Found at", { chapterIndex, topicIndex });
//         return { chapterIndex, topicIndex };
//       }
//     }
//   }
//   console.log("Video ID not found.");
//   return { chapterIndex: -1, topicIndex: -1 };
// };


// const navigateToNextVideo = () => {
//   const { chapterIndex, topicIndex } = findCurrentVideoIndex(selectedVideoId);
//   if (chapterIndex === -1 || topicIndex === -1) {
//     console.error("Current video not found in any chapter.");
//     return;
//   }

//   const currentChapter = chapters[chapterIndex];
//   if (topicIndex < currentChapter.topics.length - 1) {
//     // Move to the next video in the same chapter
//     setSelectedVideoId(currentChapter.topics[topicIndex + 1].selectedVideo);
//   } else if (chapterIndex < chapters.length - 1) {
//     // Move to the first video of the next chapter
//     setSelectedVideoId(chapters[chapterIndex + 1].topics[0].selectedVideo);
//   } else {
//     console.log("This is the last video of the last chapter.");
//   }
// };

// const navigateToPreviousVideo = () => {
//   const { chapterIndex, topicIndex } = findCurrentVideoIndex(selectedVideoId);
//   if (chapterIndex === -1 || topicIndex === -1) {
//     console.error("Current video not found in any chapter.");
//     return;
//   }

//   if (topicIndex > 0) {
//     // Move to the previous video in the same chapter
//     setSelectedVideoId(chapters[chapterIndex].topics[topicIndex - 1].selectedVideo);
//   } else if (chapterIndex > 0) {
//     // Move to the last video of the previous chapter
//     const previousChapterLastTopicIndex = chapters[chapterIndex - 1].topics.length - 1;
//     setSelectedVideoId(chapters[chapterIndex - 1].topics[previousChapterLastTopicIndex].selectedVideo);
//   } else {
//     console.log("This is the first video of the first chapter.");
//   }
// };


// useEffect(() => {
//   Cookies.set('selectedVideoId', selectedVideoId);
//   // Update other cookies as necessary...
// }, [selectedVideoId]);

//   // useEffect(() => {
//   //   Cookies.set('videoQuality', videoQuality);
//   //   Cookies.set('selectedVideoId', selectedVideoId);
//   //   Cookies.set('volume', volume);
//   //   Cookies.set('playRate', playRate);
//   // }, [videoQuality, selectedVideoId, volume, playRate]);

//   const contextValue = {
//     selectedVideoId,
//     setPlayRate,
//     completedVideos,
//     markVideoAsCompleted,
//     navigateToNextVideo,
//     navigateToPreviousVideo,
//     // chapters,
//     updateChapters
//   };

//   return <VideoContext.Provider value={contextValue}>{children}</VideoContext.Provider>;
// };

// export const useVideo = () => useContext(VideoContext);

/////////////////////////////////////////////////////////////////////////////////////
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const localStorageKey = 'lastPlayedVideo';
const defaultVideoQuality = '1080p'; 

const saveLastPlayedVideo = (videoId, currentTime) => {
  localStorage.setItem(localStorageKey, JSON.stringify({ videoId, currentTime }));
};

const getLastPlayedVideo = () => {
  const data = localStorage.getItem(localStorageKey);
  return data ? JSON.parse(data) : null;
};

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [selectedVideoId, setSelectedVideoId] = useState(getLastPlayedVideo()?.videoId || null);
  // const [videoQuality, setVideoQuality] = useState(defaultVideoQuality);
  // const [videoDetails, setVideoDetails] = useState({ resolutions: [] });
  const [volume, setVolume] = useState(parseFloat(Cookies.get('volume')) || 0.5);
  const [playRate, setPlayRate] = useState(parseFloat(Cookies.get('playRate')) || 1);
  // const [completedVideos, setCompletedVideos] = useState(() => JSON.parse(Cookies.get('completedVideos') || '{}'));
  const [chapters, setChapters] = useState([]);
  const [videoQuality, setVideoQuality] = useState(() => Cookies.get('videoQuality') || '1080p');
  const [videoDetails, setVideoDetails] = useState({ resolutions: [] });
  const updateChapters = (chaptersData) => {
    setChapters(chaptersData);
  };

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

  


  // useEffect(() => {
  //   // Default quality to 1080p if available
  //   const availableQualities = videoDetails.resolutions.map(res => res.name);
  //   if (availableQualities.includes(defaultVideoQuality)) {
  //     setVideoQuality(defaultVideoQuality);
  //   }
  // }, [videoDetails]);

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
   // Save the video quality to cookies whenever it changes

   useEffect(() => {
    Cookies.set('videoQuality', videoQuality);
  }, [videoQuality]);

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
    chapters,
    updateChapters,
    navigateToNextVideo,
    navigateToPreviousVideo
  };

  return <VideoContext.Provider value={contextValue}>{children}</VideoContext.Provider>;
};

export const useVideo = () => useContext(VideoContext);
