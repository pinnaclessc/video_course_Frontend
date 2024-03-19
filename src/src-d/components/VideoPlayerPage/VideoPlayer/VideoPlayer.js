import React, { useState, useRef, useEffect } from "react"
import "./VideoPlayer.css"
import { Link, Outlet } from "react-router-dom"
import { BsArrowCounterclockwise, BsArrowClockwise } from "react-icons/bs"
import { AiOutlineSearch } from "react-icons/ai"
import { CgArrowsH } from "react-icons/cg"
import {
  MdEditNote,
  MdOutlineFullscreenExit,
  MdOutlineFullscreen,

} from "react-icons/md"
import { FaPause,FaPlay,FaSpinner } from "react-icons/fa"
import PlayRateButtons from "./PlayRateButttons"
import Settings from "./Settings"
import SeekBar from "./SeekBar"
import Volume from "./Volume"
import PlayPauseButton from "./PlayButton"
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useVideo } from '../../../../context/VideoContext'
import Hls from "hls.js";

const VideoPlayer = ({ apiUrl = 'http://13.200.156.92:8000', onToggleSidebar, isSidebarVisible}) => {
  const videoRef = useRef(null)
  const { selectedVideoId, videoQuality, onChangeQuality, videoDetails, setVideoDetails } = useVideo();

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
  const [isSidebarBelowNavVisible, setIsSidebarBelowNavVisible] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState()
  const [currentVideo, setCurrentVideo] = useState(null);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [currentQuality, setCurrentQuality] = useState('720p');
  const [chapters, setChapters] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');

  const videoSource = videoDetails?.resolutions?.find(r => r.name === videoQuality)?.url || videoDetails?.defaultUrl;

  const handlePreviousVideo = () => {
    if (selectedTopicIndex > 0) {
      setSelectedTopicIndex(selectedTopicIndex - 1);
    } else if (selectedChapterIndex > 0) {
      setSelectedChapterIndex(selectedChapterIndex - 1);
      setSelectedTopicIndex(chapters[selectedChapterIndex - 1].topics.length - 1);
    }
  };

  const handleNextVideo = () => {
    if (selectedTopicIndex < chapters[selectedChapterIndex].topics.length - 1) {
      setSelectedTopicIndex(selectedTopicIndex + 1);
    } else if (selectedChapterIndex < chapters.length - 1) {
      setSelectedChapterIndex(selectedChapterIndex + 1);
      setSelectedTopicIndex(0);
    }
  };

  /////////////////////////////////////////////////////
  // Fetch video details by selectedVideoId
  useEffect(() => {
    setIsLoading(true);
    fetch(`${apiUrl}/videos/${selectedVideoId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setVideoDetails(data);
        setError(null);
      })
      .catch(error => {
        console.error("Error fetching video details:", error);
        setError(error.toString());
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedVideoId, apiUrl, setVideoDetails]);

  // Setup HLS or src for the video player based on videoDetails from context
  useEffect(() => {
    if (!videoDetails || !videoRef.current) return;

    const videoSource = videoDetails.resolutions.find(r => r.name === videoQuality)?.url;
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

  ///////////////////////////////this is so it support .m3u8//////////////////////////////

  // Function to change the quality of the video
  const handleQualityChange = (quality) => {
    setCurrentQuality(quality);
  };
  ///////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const video = videoRef.current
    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata)

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
    }
  }, [])

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


  /////////////////////////useEffect for centreplaybutton ///////////////////////////

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

  const handleVideoHover = () => {
    setIsHovered(true)
  }

  const handleVideoLeave = () => {
    setIsHovered(false)
  }


  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime)
  }

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
    const video = videoRef.current
    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadedmetadata", () => {
      setDuration(video.duration)
      setTotalDuration(formatTime(video.duration))
    })

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [])

  useEffect(() => {
    setCurrentDuration(formatTime(currentTime))
  }, [currentTime])

  //PLAY AND PAUSE BUTTON
  const handlePlayPause = () => {
    const video = videoRef.current
    setShowCenterPlayButton(false)
    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const handleVideoTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime)
  }

  const handleVideoLoadedMetadata = () => {
    setDuration(videoRef.current.duration)
  }

  // const handleSeekbarChange = (seekTime) => {
  //   videoRef.current.currentTime = seekTime
  //   setCurrentTime(seekTime)
  // }

  const handleSeekbarChange = (newTime) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };


  //FORWARD AND BACKWARD BUTTON
  const seekAmount = 5; // 5 seconds seek

  const handleBackward = () => {
    if (videoRef.current) {
      const newTime = Math.max(0, videoRef.current.currentTime - 5); // Assuming 5 seconds backward
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime); // Update currentTime state
    }
  };

  const handleForward = () => {
    if (videoRef.current) {
      const newTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 5); // Assuming 5 seconds forward
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime); // Update currentTime state
    }
  };


  //PlyRate
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
    const clickedElement = event.target
    const isSidebarElement = clickedElement.closest(".sidebar_container")

    if (isSidebarElement) {
      return
    }
    const isControlBarElement = clickedElement.closest(".control_btn_container")
    if (isControlBarElement) {
      return
    }

    handlePlayPause()
  }

  //Fullscreen
  const handleToggleFullScreen = () => {
    const videoContainer = document.getElementById("video-container")

    if (!document.fullscreenElement) {
      // Enter fullscreen mode
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen()
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen()
      } else if (videoContainer.mozRequestFullScreen) {
        videoContainer.mozRequestFullScreen()
      } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen()
      }
      setIsExpandedMode(false)
      setIsFullscreen(true)
    } else {
      // Exit fullscreen mode
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
      setIsExpandedMode(true)
      setIsFullscreen(false)
    }
  }

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

  return (
    <>
      <div
        id="video-container"
        className={videoPlayerClass}
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
            // src={videoUrl}
            type="application/x-mpegURL"
            onTimeUpdate={handleVideoTimeUpdate}
            onLoadedMetadata={handleVideoLoadedMetadata}
            onMouseEnter={handleVideoHover}
            onMouseLeave={handleVideoLeave}
            onCanPlayThrough={() => setError(false)}
            onError={handleVideoError}
            quality={videoQuality}
            onClick={handlePlayPause}
          >
            {videoSource && <source src={videoSource} type="application/x-mpegURL" />}
          </video>
        )}

{showCenterPlayButton && (
            <div className="center-play-pause-button">
              {isPlaying ? <FaPause size={50} /> : <FaPlay size={50} />}
            </div>
          )}

        <div id="submenu" className="submenu-title">
          {" "}
          {selectedSubmenu}
        </div>

        <div className="previous_next_buttons">
          <button onClick={handlePreviousVideo}><FaChevronLeft /></button>
        </div>
        <div className="next_container">
          <button onClick={handleNextVideo}><FaChevronRight /></button>
        </div>
        <div
          className={`control_btn_container ${isFullscreen ? "fullscreen" : ""
            }`}
        >

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
              <PlayPauseButton videoRef={videoRef} />
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
            
            <div className="expanded_container">
          <button onClick={handleToggleExpandedMode} className="expanded-mode-button">
            <CgArrowsH size={25} />
          </button>
        </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default VideoPlayer
