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
  MdOutlineClose,
} from "react-icons/md"
import { FaPlay, FaPause, FaSpinner } from "react-icons/fa"
import PlayRateButtons from "./PlayRateButttons"
import Settings from "./Settings"
import SeekBar from "./SeekBar"
import Volume from "./Volume"
import PlayPauseButton from "./PlayButton"
import SideBar from "./SideBar"
import axios from "axios"
import Hls from "hls.js";

const VideoPlayer = ({ apiUrl = 'http://localhost:8000' }) => {
  const videoRef = useRef(null)
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
  // const [videoQuality, setVideoQuality] = useState("1080p")
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
  const [videoQuality, setVideoQuality] = useState('720p');
  /////////////////////////////////////////////////////////////////
  // const [videoDetails, setVideoDetails] = useState({ resolutions: [] });
  const [currentQuality, setCurrentQuality] = useState('720p');
  // const [selectedVideoId, setSelectedVideoId] = useState(null);
  // const [videoUrl,setVideoUrl] = useState()

  const [videoDetails, setVideoDetails] = useState({ resolutions: [] });
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  // const apiUrl = 'http://localhost:8000'; 




  // Inside your VideoPlayer component, above the useEffect hooks

  // const fetchVideoById = async (videoId) => {
  //   setIsLoading(true);
  //   try {
  //     // Replace the URL with your actual API endpoint
  //     const response = await axios.get(`${apiUrl}/videos/${videoId}`);
  //     if (response.status === 200) {
  //       // Assuming the API returns the video details directly
  //       return response.data;
  //     } else {
  //       console.error('Failed to fetch video details:', response.status);
  //       setError(true);
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error('Error fetching video details:', error);
  //     setError(true);
  //     return null;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  // useEffect(() => {
  //   if (selectedVideoId) {
  //     fetchVideoById(selectedVideoId).then((videoData) => {
  //       if (videoData) {
  //         // Assuming videoData contains a resolutions array
  //         const resolution720p = videoData.resolutions.find(res => res.name === '720p HLS');
  //         if (resolution720p) {
  //           setVideoUrl(resolution720p.url);
  //           // Set additional video details as needed
  //           setVideoDetails(videoData);
  //         } else {
  //           console.error('720p resolution not found');
  //           setError(true);
  //         }
  //       }
  //     });
  //   }
  // }, [selectedVideoId]);

  // Function to fetch video details by ID
  // Fetch video details and set resolutions
  const fetchVideoById = async (videoId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/videos/${videoId}`);
      if (response.status === 200) {
        const data = response.data;
        setVideoDetails(data);

        // Set default quality (720p) if available
        const defaultQuality = data.resolutions.find(r => r.name === '720p');
        if (defaultQuality) {
          setVideoUrl(defaultQuality.url);
          setCurrentQuality('720p');
        } else {
          throw new Error('Default quality (720p) not found in resolutions.');
        }
      } else {
        throw new Error(`Failed to fetch video details: ${response.status}`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedVideoId) {
      fetchVideoById(selectedVideoId);
    }
  }, [selectedVideoId]);

  // Function to change the quality of the video
  const changeQuality = (newQuality) => {
    const currentTime = videoRef.current.currentTime;
    const newQualitySource = videoDetails.resolutions.find(r => r.name === newQuality)?.url;
    
    if (newQualitySource) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(newQualitySource);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current.currentTime = currentTime;
          videoRef.current.play();
          setCurrentQuality(newQuality);
        });
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = newQualitySource;
        videoRef.current.currentTime = currentTime;
        videoRef.current.play();
        setCurrentQuality(newQuality);
      } else {
        console.error("This video format is not supported");
      }
    }
  };

  ///////////////////////////////this is so it support .m3u8////////////////////////////////

  // useEffect(() => {
  //   const fetchVideoDetails = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await axios.get(`${apiUrl}/videos/${selectedVideoId}`);
  //       setVideoDetails(response.data);
  //       setCurrentQuality(response.data.defaultQuality || '720p');
  //     } catch (error) {
  //       console.error("Error fetching video details:", error);
  //       setError(true);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   if (selectedVideoId) fetchVideoDetails();
  // }, [selectedVideoId, apiUrl]);

  // useEffect(() => {
  //   const video = videoRef.current;
  //   if (!video) return;

  //   const qualityUrl = videoDetails.resolutions.find(res => res.name === currentQuality)?.url;
  //   if (!qualityUrl) return;

  //   if (Hls.isSupported()) {
  //     const hls = new Hls();
  //     hls.loadSource(qualityUrl);
  //     hls.attachMedia(video);
  //     hls.on(Hls.Events.MANIFEST_PARSED, () => {
  //       if (!isPlaying) video.play().then(() => setIsPlaying(true));
  //     });
  //   } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  //     video.src = qualityUrl;
  //     video.play().then(() => setIsPlaying(true));
  //   }
  // }, [currentQuality, videoDetails.resolutions, isPlaying]);



  const onVideoSelect = (videoId) => {
    setSelectedVideoId(videoId);
    setIsLoading(true);
  };

  // Function to change the quality of the video
  const handleQualityChange = (quality) => {
    setCurrentQuality(quality);
  };
  ///////////////////////////////////////////////////////////////////////////////////



  ///////////////////////////////////////////////////////

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
  // useEffect(() => {
  //   // Show play button icon for a few seconds when video is played or paused
  //   setShowCenterPlayButton(true);
  //   const timeout = setTimeout(() => {
  //     setShowCenterPlayButton(false);
  //   }, 1000);

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [isPlaying]); 
  /////////////////////////////////////////////////////////////////////////////////////

  const handleSubMenuSelect = (submenuTitle, isPlayed) => {
    setSelectedSubmenu(submenuTitle);
    setShowCenterPlayButton(!isPlayed);
    console.log("Submenu title:", submenuTitle);
    console.log("Is played:", isPlayed);
  };

  // const handleVideoSelectMenu = (submenu) => {
  //   setSelectedSubmenu(submenu.title)
  // }

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

  const handleSeekbarChange = (seekTime) => {
    videoRef.current.currentTime = seekTime
    setCurrentTime(seekTime)
  }

  //FORWARD AND BACKWARD BUTTON
  const seekAmount = 5
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
            src={videoUrl}
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
          </video>
        )}
        <div id="submenu" className="submenu-title">
          {" "}
          {selectedSubmenu}
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
                // onVideoSelect={handleVideoSelect}
                // onVideoSelect={handleVideoSelect}
                onVideoSelect={(videoId) => setSelectedVideoId(videoId)}
                // onVideoSelect={onVideoSelect}
                onSubMenuSelect={handleSubMenuSelect}
                onChapterSelect={handleChapterSelect}
              />
            </div>
          </div>
        )}

        <div
          className={`control_btn_container ${isFullscreen ? "fullscreen" : ""
            }`}
        >

          {/* //Seekbar */}
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
            <div className="play_pause_container">
              <PlayPauseButton videoRef={videoRef} />
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

            {/* Playrate  */}
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
            {/* //////////////////////////////////////////////////////// */}
     
             <Settings
      currentQuality={currentQuality}
      onChangeQuality={changeQuality}
      resolutions={videoDetails.resolutions}
      videoRef={videoRef}
    />


            {/* //////////////////////////////////////////////////////// */}
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
          NotesEditor
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
