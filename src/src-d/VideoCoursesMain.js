import React,{useState} from "react"
import VideoPlayer from "./components/VideoPlayerPage/VideoPlayer/VideoPlayer"
import styles from "./VideoCoursesMain.module.css"

function VideoCoursesMain() {
  const [selectedVideo, setSelectedVideo] = useState({
    url: '',
    resolutions: [],
  });
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <VideoPlayer  />
        </div>
      </div>
    </>
  )
}

export default VideoCoursesMain
