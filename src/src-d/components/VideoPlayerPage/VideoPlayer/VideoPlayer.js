import React, { useState, useRef, useEffect } from "react"
import "./VideoPlayer.css"
import { Link } from "react-router-dom"
import { BsArrowCounterclockwise, BsArrowClockwise } from "react-icons/bs"
import { CgArrowsH } from "react-icons/cg"
import {
  MdEditNote,
  MdOutlineFullscreenExit,
  MdOutlineFullscreen,
} from "react-icons/md"
import { FaPause, FaPlay, FaSpinner } from "react-icons/fa"
import PlayRateButtons from "./PlayRateButttons"
import Settings from "./Settings"
import SeekBar from "./SeekBar"
import Volume from "./Volume"
import PlayPauseButton from "./PlayButton"
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useVideo } from '../../../../context/VideoContext'
import Hls from "hls.js";

const VideoPlayer = ({ apiUrl = 'https://videocoursebackend.ssccglpinnacle.com', onToggleSidebar, isSidebarVisible, onVideoProgress }) => {
  const videoRef = useRef(null)
  const { selectedVideoId, videoQuality, onChangeQuality, navigateToNextVideo, navigateToPreviousVideo, videoDetails, setVideoDetails, markVideoAsCompleted } = useVideo();
  const [error, setError] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isExpandedMode, setIsExpandedMode] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isNavbarItemVisible, setIsNavbarItemVisible] = useState(false)
  const [isNotesOpen, setIsNotesOpen] = useState(false)
  const [isVolumeOpen, setIsVolumeOpen] = useState(false)
  const [currentDuration, setCurrentDuration] = useState("0:00")
  const [totalDuration, setTotalDuration] = useState("0:00")
  const [playRate, setPlayRate] = useState(1)
  const [isPlayRateMenuOpen, setIsPlayRateMenuOpen] = useState(false)
  const playRateOptions = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
  const [volume, setVolume] = useState(0.5)
  const [muted, setMuted] = useState(false)
  const [prevVolume, setPrevVolume] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [activeButton, setActiveButton] = useState(null)
  const [selectedSubmenu, setSelectedSubmenu] = useState("")
  const [showCenterPlayButton, setShowCenterPlayButton] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCurrentlyFullScreen, setIsCurrentlyFullScreen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const [selectedQuality, setSelectedQuality] = useState()
  const [currentVideo, setCurrentVideo] = useState(null);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [currentQuality, setCurrentQuality] = useState('720p');
  const [chapters, setChapters] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [showControls, setShowControls] = useState(false);
  const [centerButtonTimeout, setCenterButtonTimeout] = useState(null);


  const videoSource = videoDetails?.resolutions?.find(r => r.name === videoQuality)?.url || videoDetails?.defaultUrl;

  let hideControlsTimeout;

  const handleVideoHover = () => {
    clearTimeout(hideControlsTimeout);
    setShowControls(true);
  }

  const handleVideoLeave = () => {

    hideControlsTimeout = setTimeout(() => {
      setShowControls(false);
    }, 5000);
  }

  let controlVisibilityTimeout;

  const resetControlVisibilityTimer = () => {
    clearTimeout(controlVisibilityTimeout);
    setShowControls(true);

    // Hide the controls after 5 seconds of inactivity
    if (isFullscreen) { // Only start the timer if the video is in fullscreen
      controlVisibilityTimeout = setTimeout(() => {
        setShowControls(false);
      }, 5000);
    }
  };

  useEffect(() => {
    // Listen for mouse movements and keydown events
    const videoContainer = document.getElementById('video-container');
    videoContainer.addEventListener('mousemove', resetControlVisibilityTimer);
    videoContainer.addEventListener('keydown', resetControlVisibilityTimer);

    return () => {
      // Clean up event listeners
      videoContainer.removeEventListener('mousemove', resetControlVisibilityTimer);
      videoContainer.removeEventListener('keydown', resetControlVisibilityTimer);
      clearTimeout(controlVisibilityTimeout);
    };
  }, [isFullscreen]);

  // const handlePreviousVideo = () => {
  //   if (selectedTopicIndex > 0) {
  //     setSelectedTopicIndex(selectedTopicIndex - 1);
  //   } else if (selectedChapterIndex > 0) {
  //     setSelectedChapterIndex(selectedChapterIndex - 1);
  //     setSelectedTopicIndex(chapters[selectedChapterIndex - 1].topics.length - 1);
  //   }
  // };

  // const handleNextVideo = () => {
  //   if (selectedTopicIndex < chapters[selectedChapterIndex].topics.length - 1) {
  //     setSelectedTopicIndex(selectedTopicIndex + 1);
  //   } else if (selectedChapterIndex < chapters.length - 1) {
  //     setSelectedChapterIndex(selectedChapterIndex + 1);
  //     setSelectedTopicIndex(0);
  //   }
  // };

  /////////////////////////////////////////////////////
  // Fetch video details by selectedVideoId
  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(`${apiUrl}/videos/${selectedVideoId}`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       setVideoDetails(data);
  //       setError(null);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching video details:", error);
  //       setError(error.toString());
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, [selectedVideoId, apiUrl, setVideoDetails]);
  // eslint-disable-next-line

  // Setup HLS or src for the video player based on videoDetails from context
  // useEffect(() => {
  //   if (!videoDetails || !videoRef.current) return;

  //   const videoSource = videoDetails.resolutions.find(r => r.name === videoQuality)?.url;
  //   if (videoSource) {
  //     if (Hls.isSupported()) {
  //       const hls = new Hls();
  //       hls.loadSource(videoSource);
  //       hls.attachMedia(videoRef.current);
  //     } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
  //       videoRef.current.src = videoSource;
  //     }
  //   }
  // }, [videoDetails, videoQuality]);


  ///////////////////Working////////////////////
  // useEffect(() => {
  //   if (!videoDetails || !videoRef.current) return;

  //   // Save the current play state and time
  //   const wasPlaying = !videoRef.current.paused;
  //   const currentTime = videoRef.current.currentTime;
  //   const videoSource = videoDetails.resolutions.find(r => r.name === videoQuality)?.url;

  //   if (videoSource) {
  //     const loadVideo = () => {
  //       if (Hls.isSupported()) {
  //         const hls = new Hls();
  //         hls.loadSource(videoSource);
  //         hls.attachMedia(videoRef.current);
  //         hls.on(Hls.Events.MANIFEST_PARSED, () => {
  //           videoRef.current.currentTime = currentTime;
  //           // Restore the play state after seeking to the currentTime
  //           if (wasPlaying) {
  //             videoRef.current.play().catch(e => console.error("Play failed", e));
  //           }
  //         });
  //       } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
  //         videoRef.current.src = videoSource;
  //         videoRef.current.addEventListener('loadedmetadata', () => {
  //           videoRef.current.currentTime = currentTime;
  //           // Restore the play state after seeking to the currentTime
  //           if (wasPlaying) {
  //             videoRef.current.play().catch(e => console.error("Play failed", e));
  //           }
  //         }, { once: true });
  //       }
  //     };

  //     // Pause the video if it was playing, to avoid playing the old content while loading the new source
  //     if (wasPlaying) videoRef.current.pause();
  //     loadVideo();
  //   }
  // }, [videoQuality, videoDetails, videoRef]);

  ///////////////////////////////////////////////////////////////////
  // Fetch video details by selectedVideoId
  // useEffect(() => {
  //   const fetchVideoDetails = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(`${apiUrl}/videos/${selectedVideoId}`);
  //       const data = await response.json();
  //       setVideoDetails(data);
  //     } catch (error) {
  //       console.error("Error fetching video details:", error);
  //       setError(true);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   if (selectedVideoId) {
  //     fetchVideoDetails();
  //   }
  // }, [apiUrl, selectedVideoId, setVideoDetails]);

  useEffect(() => {
    // Assuming you have a way to fetch video details based on selectedVideoId
    // For demonstration, using a placeholder fetch function
    const fetchVideoDetails = async () => {
      // Placeholder fetch logic
      try {
        const response = await fetch(`${apiUrl}/videos/${selectedVideoId}`);
        const data = await response.json();
        setVideoDetails(data); 
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    if (selectedVideoId) {
      fetchVideoDetails();
    }
  }, [apiUrl, selectedVideoId, setVideoDetails]);

  // Setup HLS or src for the video player based on videoDetails from context
  useEffect(() => {
    if (!videoDetails || !videoRef.current) return;

    const videoSource = videoDetails.resolutions.find(r => r.name === videoQuality)?.url || videoDetails.defaultUrl;
    if (videoSource) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSource);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = videoSource;
      }
    }
  }, [videoDetails, videoQuality]);
  /////////////////////////////////////////////////////////////

  // Function to change the quality of the video
  const handleQualityChange = (quality) => {
    setCurrentQuality(quality);
  };
  ///////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setTotalDuration(formatTime(video.duration));
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    console.log('Current video source:', videoSource);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoRef, videoSource]);


  useEffect(() => {
    const video = videoRef.current;
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [selectedVideoIndex]);

  /////////////////progress of completion///////////////////////
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [videoRef, onVideoProgress]);


  const handleSubMenuSelect = (submenuTitle, isPlayed) => {
    setSelectedSubmenu(submenuTitle);
    setShowCenterPlayButton(!isPlayed);
    console.log("Submenu title:", submenuTitle);
    console.log("Is played:", isPlayed);
  };


  const handleVideoError = () => {
    setError(true)
  }

  //function to handle closing all opened buttons
  const closeOpenedButtons = () => {
    setIsPlayRateMenuOpen(false)
    setIsNotesOpen(false)
    setIsVolumeOpen(false)
    setIsNotesOpen(false)
  }


  const handleTimeUpdate = () => {
    // Ensure videoRef.current exists before trying to access its properties
    if (videoRef.current) {
      const currentProgress = videoRef.current.currentTime / videoRef.current.duration;
      const percentage = currentProgress * 100;

      setCurrentTime(videoRef.current.currentTime);

      // If the video has played 90%, mark it as completed
      if (percentage >= 90) {
        markVideoAsCompleted(selectedVideoId, true);
      }
    }
  };


  useEffect(() => {
    // Function that sets up event listeners
    const subscribeToVideoEvents = () => {
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.addEventListener('timeupdate', handleTimeUpdate);
      }
    };

    // Function that cleans up event listeners
    const unsubscribeFromVideoEvents = () => {
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };

    // Subscribe when the component mounts or when videoSource changes
    subscribeToVideoEvents();

    // Unsubscribe when the component unmounts or when videoSource changes
    return () => {
      unsubscribeFromVideoEvents();
    };
  }, [videoSource]);

  //Handle Duration
  const formatTime = (videoLengthInSeconds) => {
    const hours = Math.floor(videoLengthInSeconds / 3600)
    const minutes = Math.floor((videoLengthInSeconds % 3600) / 60)
    const seconds = Math.floor(videoLengthInSeconds % 60)

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      console.log('Metadata loaded, video duration:', video.duration);
      setTotalDuration(formatTime(video.duration));
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoRef]);

  useEffect(() => {
    setCurrentDuration(formatTime(currentTime))
  }, [currentTime])

  //PLAY AND PAUSE BUTTON
  // const handlePlayPause = () => {
  //   const video = videoRef.current
  //   setShowCenterPlayButton(false)
  //   if (video.paused) {
  //     video.play()
  //     setIsPlaying(true)
  //   } else {
  //     video.pause()
  //     setIsPlaying(false)
  //   }
  // }


  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    // Toggle play/pause
    if (video.paused || video.ended) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }

    // Show the center play/pause button
    setShowCenterPlayButton(true);

    // Clear any previous timeout to avoid multiple timeouts running
    if (centerButtonTimeout) {
      clearTimeout(centerButtonTimeout);
    }

    // Set a new timeout to automatically hide the center play/pause button
    const timeout = setTimeout(() => {
      setShowCenterPlayButton(false);
    }, 1000); // Adjust the duration as needed

    setCenterButtonTimeout(timeout);
  };


  const handleVideoTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime)
  }

  const handleVideoLoadedMetadata = () => {
    setDuration(videoRef.current.duration)
  }

  const handleSeekbarChange = (newTime) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };


  //FORWARD AND BACKWARD BUTTON
  const seekAmount = 5;

  const handleBackward = () => {
    if (videoRef.current) {
      const newTime = Math.max(0, videoRef.current.currentTime - seekAmount);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleForward = () => {
    if (videoRef.current) {
      const newTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + seekAmount); // Assuming 5 seconds forward
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };


  //PlayRate
  const handlePlayRateChange = (rate) => {
    setPlayRate(rate)
    setIsPlayRateMenuOpen(false)

    if (videoRef.current) {
      videoRef.current.playbackRate = rate
    }
  }

  //Sound Button videoref dena
  const handleVolumeChange = (value) => {
    if (muted) {
      setPrevVolume(value)
    }
    setVolume(parseFloat(value))
  }

  const handleMuteToggle = () => {
    if (muted) {
      setMuted(false)
      setVolume(prevVolume)
    } else {
      setMuted(true)
      setPrevVolume(volume)
      setVolume(0)
    }
  }

  const handleVideoClick = (event) => {
    event.stopPropagation();
    const clickedElement = event.target;
    const isSidebarElement = clickedElement.closest(".sidebar_container");
    const isControlBarElement = clickedElement.closest(".control_btn_container");
    const isPreviousElement = clickedElement.closest(".previous_next_buttons");
    const isNextElement = clickedElement.closest(".next_container");

    //this is to prevent play/pause on clicking particular places
    if (isSidebarElement || isControlBarElement || isPreviousElement || isNextElement) {

      return;
    }
    // Determine the current playing state before toggling
    const currentlyPlaying = isPlaying;

    // Toggle play/pause
    handlePlayPause();

    // Clear any existing timeout
    if (centerButtonTimeout) {
      clearTimeout(centerButtonTimeout);
      setCenterButtonTimeout(null);
    }

    // Show the center button
    setShowCenterPlayButton(true);

    // If the video was playing, we're now pausing it, so show the pause button for 4 seconds
    if (currentlyPlaying) {
      const timeout = setTimeout(() => {
        setShowCenterPlayButton(false);
      }, 1000); // Hide after 2 seconds
      setCenterButtonTimeout(timeout);
    } else {
      // If the video was paused, we're now playing it, so hide the play button after 4 seconds
      const timeout = setTimeout(() => {
        setShowCenterPlayButton(false);
      }, 1000); // Hide after 4 seconds
      setCenterButtonTimeout(timeout);
    }
  };

  //Fullscreen
  const handleToggleFullScreen = () => {
    const videoContainer = document.getElementById("video-container");
    if (!document.fullscreenElement) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      }
      setIsFullscreen(true);
      resetControlVisibilityTimer();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
      setShowControls(true);
    }
  };

  const handleToggleExpandedMode = () => {
    setIsExpandedMode(!isExpandedMode);
    onToggleSidebar();
  };

  //Toggle Sidebar
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    setIsExpandedMode(
      (isExpandedMode) =>
        !isExpandedMode && !isSidebarOpen && !isNavbarItemVisible
    )
    setIsNavbarItemVisible(true)
  }

  const videoPlayerClass = `video-container ${isExpandedMode ? "expanded" : ""
    } `

  const VideoNavbarStyle = `videoNavbar ${isExpandedMode && "videoNavbar_expanded"
    } `

  const handleChapterSelect = (chapter) => {
    setSelectedChapter(chapter);
    setSelectedTopicIndex(0);
  };

  useEffect(() => {
    const selectedVideo =
      selectedChapter?.topics[selectedTopicIndex]?.selectedVideo || null;

  }, [selectedChapter, selectedTopicIndex]);

  const handleControlClick = (event) => {
    event.stopPropagation();
  };


  useEffect(() => {
    setShowCenterPlayButton(true);
    const timeout = setTimeout(() => {
      setShowCenterPlayButton(false);
    }, 1000); // Adjust as needed

    return () => clearTimeout(timeout);
  }, [isPlaying]);

  /////////////////////////////for next and previous button///////////////////
  // Then, in your component where you define the next and previous button handlers:
  const handleNextVideo = () => {
    navigateToNextVideo(); // This now references the function from your context
  };

  const handlePreviousVideo = () => {
    navigateToPreviousVideo(); // This now references the function from your context
  };

  return (
    <>
      <div
        id="video-container"
        className={`video-container ${isFullscreen ? 'fullscreen' : ''}`}
        onClick={handleVideoClick}
      >
        {isLoading ? (
          <div className="loading-container">
            <FaSpinner className="loading-icon" />
          </div>
        ) : (
          <video
            className="video-element"
            ref={videoRef}
            // src="https://www.youtube.com/watch?v=9xwazD5SyVg"
            type="application/x-mpegURL"
            onTimeUpdate={handleVideoTimeUpdate}
            onLoadedMetadata={handleVideoLoadedMetadata}
            onMouseEnter={handleVideoHover}
            onMouseLeave={handleVideoLeave}
            onCanPlayThrough={() => setError(false)}
            onError={handleVideoError}
            quality={videoQuality}
          >
            {/* <source src= "https://www.youtube.com/watch?v=9xwazD5SyVg" type="video/mp4" /> */}
            {videoSource && <source src={videoSource} type="application/x-mpegURL" />}
          </video>
        )}

        {showCenterPlayButton && (
          <button className="center-play-pause-button" onClick={handlePlayPause}>
            {isPlaying ? <FaPause size={25} /> : <FaPlay size={25} />}
          </button>
        )}

        <div id="submenu" className="submenu-title">
          {" "}
          {selectedSubmenu}
        </div>

        {/* <div className="previous_next_buttons">
          <button onClick={navigateToPreviousVideo}><FaChevronLeft /></button>
        </div>

        <div className="next_container">
          <button onClick={navigateToNextVideo}><FaChevronRight /></button>
        </div> */}
        <div className="previous_next_buttons">
          <button onClick={navigateToPreviousVideo}><FaChevronLeft size={30} /></button>
        </div>

        <div className="next_container">
          <button onClick={navigateToNextVideo}><FaChevronRight size={30} /></button>
        </div>


        <div className={`control-btn-container ${showControls ? 'show' : 'hide'}`} onClick={handleControlClick}>
          {/* Seekbar */}
          <SeekBar
            currentTime={currentTime}
            duration={duration}
            onSeek={handleSeekbarChange}
            videoRef={videoRef}
          />

          {/* All Control Buttons */}
          <div className={`control_bar ${isFullscreen ? "fullscreen" : ""}`}>
            <div className="play_pause_container">
              <PlayPauseButton isPlaying={isPlaying} handlePlayPause={handlePlayPause} />
            </div>

            {/* Backward button */}
            <div className="backward_container">
              <button className="backward" onClick={handleBackward}>
                <BsArrowCounterclockwise className="backward_icon" size={25} />
              </button>
            </div>

            {/* Playrate  */}
            <PlayRateButtons
              playRate={playRate}
              playRateOptions={playRateOptions}
              onPlayRateChange={handlePlayRateChange}
              activeButton={activeButton}
            />

            {/* Forward button */}
            <div className="forward_container">
              <button className="forward" onClick={handleForward}>
                <BsArrowClockwise className="forward_icon" size={25} />
              </button>
            </div>

            {/* Duration*/}
            <div className="duration">
              <span className="current_duration">{currentDuration}</span>/
              <span className="total_duration">{totalDuration}</span>
            </div>

            <div className="Notes_button_container">
              <button className="add_notes">
                <Link to="/mylearning/notes">
                  <MdEditNote size={30} className="add_notes_icon" />
                </Link>
              </button>
            </div>

            <Settings
              currentQuality={currentQuality}
              onChangeQuality={handleQualityChange}
              resolutions={videoDetails.resolutions}
            />

            <div className="volume_slider_container">
              <div className="volume-container">
                <Volume
                  videoRef={videoRef}
                  volume={volume}
                  handleVolumeChange={handleVolumeChange}
                  handleMuteToggle={handleMuteToggle}
                />
              </div>
            </div>

            <div className="fullscreen_container">
              <button onClick={handleToggleFullScreen} className="fullscreen-button">
                {isCurrentlyFullScreen ? (
                  <MdOutlineFullscreenExit size={25} />
                ) : (
                  <MdOutlineFullscreen size={25} />
                )}
              </button>
            </div>

            {!isFullscreen && (
              <div className="expanded_container">
                <button onClick={handleToggleExpandedMode} className="expanded-mode-button">
                  <CgArrowsH size={25} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default VideoPlayer
