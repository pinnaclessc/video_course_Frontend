import React from "react"
import VideoPlayer from "./components/VideoPlayerPage/VideoPlayer/VideoPlayer"
import styles from "./VideoCoursesMain.module.css"

function VideoCoursesMain() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <VideoPlayer />
        </div>
      </div>
    </>
  )
}

export default VideoCoursesMain
