import React, { useState, useRef, useEffect } from "react"
import "./VideoPlayer.css"
import { Link, Outlet } from "react-router-dom"
import { BsArrowCounterclockwise, BsArrowClockwise } from "react-icons/bs"
import { AiOutlineFileText, AiOutlineSearch } from "react-icons/ai"
import { IoClose } from "react-icons/io"
import { CgArrowsH, CgTranscript } from "react-icons/cg"
import {
  MdEditNote,
  MdOutlineFullscreenExit,
  MdOutlineFullscreen,
  MdOutlineClose,
} from "react-icons/md"
import { FaPlay, FaPause, FaSpinner } from "react-icons/fa"
import PlayRateButtons from "./PlayRateButttons"
import Settings from "./Settings"
import SeekBar from "./SeekBar"
import Volume from "./Volume"
import PlayPauseButton from "./PlayButton"
import FullscreenButton from "./FullScreen"
import SideBar from "./SideBar"


const VideoPlayer = ({ onVideoSelect }) => {
  const videoRef = useRef(null)
  const [error, setError] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState()
  const [isPlaying, setIsPlaying] = useState(false)
  const [showCaptions, setShowCaptions] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [isFullScreen, setIsFullScreen] = useState(false)
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [videoQuality, setVideoQuality] = useState("1080p")
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
  const [courseId, setCourseId] = useState(null);

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
    // Fetch data only when courseId is available
    if (courseId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/vc/api/chapters/65a62b88316e83e8570b7d42`);
          const data = await response.json();
          // Process the fetched data as needed and update the state
          console.log("Fetched data:", data);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle error state if needed
        }
      };

      // Call the fetchData function with the dynamic courseId
      fetchData();
    }
  }, [courseId]); 
  const handleCenterPlayClick = () => {
    handlePlayPause()
  }
  const handleSubMenuSelect = (submenuTitle, isPlayed) => {
    // Do something with the updated isPlayed status for the specific submenu
    console.log("Submenu title:", submenuTitle)
    console.log("Is played:", isPlayed)
  }

  const handleVideoSelectMenu = (submenu) => {
    setSelectedSubmenu(submenu.title)
  }

  const handleVideoError = () => {
    setError(true)
  }

  const handleVideoSelect = (videoUrl) => {
    setSelectedVideo(videoUrl)
  }

  const handleButtonClick = (option) => {
    setActiveButton((prevButton) => (prevButton === option ? null : option))
    closeOpenedButtons() // Close any opened buttons
  }

  //function to handle closing all opened buttons
  const closeOpenedButtons = () => {
    setIsSettingsOpen(false)
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

  //Settings Handlers
  const handleSettingsToggle = () => {
    setIsSettingsOpen(!isSettingsOpen)
  }

  const handleQualityOptionClick = async (quality) => {
    setIsLoading(true)
    // Simulating video loading delay using setTimeout
    await new Promise((resolve) => setTimeout(resolve, 200))
    setVideoQuality(quality)
    setIsLoading(false)
  }

  const loadVideoWithQuality = (quality) => {
    console.log(`Loading video with quality: ${quality}`)
  }

  //Quality Handlers
  const handleQualityChange = (quality) => {
    setVideoQuality(quality)
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

  const handleSeekbarChange = (seekTime) => {
    videoRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  //FORWARD AND BACKWARD BUTTON
  const seekAmount = 3
  const handleForward = () => {
    videoRef.current.currentTime -= seekAmount
  }

  const handleBackward = () => {
    videoRef.current.currentTime += seekAmount
  }

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  //Expanded Mode
  const handleToggleExpandedMode = () => {
    setIsExpandedMode(!isExpandedMode)
    setIsSidebarOpen(false)
    setIsNavbarItemVisible((isExpandedMode) => !isExpandedMode)
  }

  //Toggle Sidebar
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    setIsExpandedMode(
      (isExpandedMode) =>
        !isExpandedMode && !isSidebarOpen && !isNavbarItemVisible
    )
    setIsNavbarItemVisible(true)
  }

  const videoPlayerClass = `video-container ${
    isExpandedMode ? "expanded" : ""
  } `

  const VideoNavbarStyle = `videoNavbar ${
    isExpandedMode && "videoNavbar_expanded"
  } `

  return (
    <>
      <div
        id="video-container"
        className={videoPlayerClass}
        onClick={handleVideoClick}
      >
        {" "}
        {isLoading ? (
          <div className="loading-container">
            <FaSpinner className="loading-icon" />
          </div>
        ) : (
          <video
            className="video-element"
            ref={videoRef}
            src={
              selectedVideo ||
              "https://dgkwgu5olgqh6.cloudfront.net/videos/test46.mp4"
            }
            type="video/mp4"
            onTimeUpdate={handleVideoTimeUpdate}
            onLoadedMetadata={handleVideoLoadedMetadata}
            onMouseEnter={handleVideoHover}
            onMouseLeave={handleVideoLeave}
            onCanPlayThrough={() => setError(false)}
            onError={handleVideoError}
            quality={videoQuality}
          >
            {" "}
          </video>
        )}
        <div id="submenu" className="submenu-title">
          {" "}
          {selectedSubmenu}
        </div>
        <div className="center-controls">
          {showCenterPlayButton && (
            <div className="center-play-button" onClick={handleCenterPlayClick}>
              {isPlaying ? (
                <FaPause className="center-play-icon" />
              ) : (
                <FaPlay className="center-play-icon" />
              )}
            </div>
          )}
        </div>
        {isExpandedMode && !isSidebarOpen && (
          <div className="sidebar_container">
            <div className="sidebar">
              <div className="sidebar-header">
                <h3 className="sidebar-title">Course Content</h3>
                <button className="sidebar-close" onClick={handleToggleSidebar}>
                  <MdOutlineClose size={20} />;
                </button>
              </div>

              <SideBar
                isOpen={isSidebarOpen}
                handleClose={() => setIsSidebarOpen(false)}
                // menuData={updatedMenuData}
                onVideoSelect={handleVideoSelect}
                onSubMenuSelect={handleSubMenuSelect}
              />
            </div>
          </div>
        )}
        <div
          className={`control_btn_container ${
            isFullscreen ? "fullscreen" : ""
          }`}
        >
          {/* Seekbar */}
          <div className="seekbar_container">
            <div className="seekbar">
              <SeekBar
                currentTime={currentTime}
                duration={duration}
                onSeek={handleSeekbarChange}
              />
            </div>
          </div>
          {/* //All Control Buttons */}
          <div className={`control_bar ${isFullscreen ? "fullscreen" : ""}`}>
            {/* Play/Pause button */}
            <div className="play_pause_container">
              <PlayPauseButton
                isPlaying={isPlaying}
                handlePlayPause={handlePlayPause}
                showCenterPlayButton={showCenterPlayButton}
                onClick={handlePlayPause} // Add this line
              />
            </div>
            {/* Backward button */}
            <div className="backward_container">
              <button
                className="backward"
                onClick={() => {
                  handleForward()
                }}
              >
                <BsArrowCounterclockwise className="backward_icon" size={25} />
              </button>
            </div>
            {/* Playrate code */}
            <PlayRateButtons
              playRate={playRate}
              playRateOptions={playRateOptions}
              onPlayRateChange={handlePlayRateChange}
              activeButton={activeButton}
            />

            {/* Forward button */}
            <div className="forward_container">
              <button
                className="forward"
                onClick={() => {
                  handleBackward()
                  closeOpenedButtons()
                }}
              >
                <BsArrowClockwise className="forward_icon" size={25} />
              </button>
            </div>
            {/* //duration */}
            <div className="duration">
              <span className="current_duration">{currentDuration}</span>/
              <span className="total_duration">{totalDuration}</span>
            </div>

            {/* //add_notes */}
            <div className="Notes_button_container">
              <button className="add_notes">
                <Link to="/mylearning/notes">
                  <MdEditNote size={30} className="add_notes_icon" />
                </Link>
              </button>
            </div>

            {/* //volume button */}
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

            {/* //Show captions */}
            <div className="caption_container">
              <button>
                <CgTranscript size={25}></CgTranscript>
              </button>
            </div>
            {/* //Fullscreen */}
            <div className="fullscreen_container">
              <div className="fullscreen_container">
                <button
                  onClick={handleToggleFullScreen}
                  className="fullscreen-button"
                >
                  {isFullScreen ? (
                    <MdOutlineFullscreenExit size={25} />
                  ) : (
                    <MdOutlineFullscreen size={25} />
                  )}
                </button>
              </div>
            </div>
            <div className="expanded_container">
              {isExpandedMode ? (
                <button
                  onClick={() => {
                    handleToggleExpandedMode()
                    closeOpenedButtons()
                  }}
                  className="expanded-mode-button"
                >
                  <CgArrowsH size={25} />
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleToggleExpandedMode()
                    closeOpenedButtons()
                  }}
                  className="expanded-mode-button"
                >
                  <CgArrowsH size={25} />
                </button>
              )}
            </div>

            {/* // settings button */}
            <div className="settings-container">
              <Settings
                handleSettingsToggle={handleSettingsToggle}
                isSettingsOpen={isSettingsOpen}
                videoQuality={videoQuality}
                handleQualityOptionClick={handleQualityOptionClick}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={VideoNavbarStyle}>
        <Link to="/mylearning/search" className="links">
          <AiOutlineSearch size={25} />
        </Link>
        &nbsp;&nbsp;
        {isNavbarItemVisible && (
          <Link to="/mylearning/coursescontent" className="links">
            Course Content
          </Link>
        )}
        &nbsp;&nbsp;
        <Link to="/mylearning/overview" className="links">
          Overview
        </Link>
        &nbsp;&nbsp;
        <Link to="/mylearning/q&a" className="links">
          Q&A
        </Link>
        &nbsp;&nbsp;
        <Link to="/mylearning/notes" className="links">
          Notes
        </Link>
        &nbsp;&nbsp;
        <Link to="/mylearning/announcement" className="links">
          Announcement
        </Link>
        &nbsp;&nbsp;
        <Link to="/mylearning/reviews" className="links">
          Reviews
        </Link>
        &nbsp;&nbsp;
        <Link to="/mylearning/learningtools" className="links">
          Learning Tools
        </Link>
        &nbsp;&nbsp;
        <Outlet />
      </div>
    </>
  )
}

export default VideoPlayer