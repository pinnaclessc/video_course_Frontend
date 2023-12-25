// SeekBar.js
import React, { useRef, useEffect } from "react"
import styles from "./SeekBar.module.css" // Import the CSS module

const SeekBar = ({ currentTime, duration, onSeek }) => {
  const seekbarRef = useRef(null)

  useEffect(() => {
    const seekbar = seekbarRef.current

    const handleSeek = (e) => {
      const seekTime = e.target.value
      onSeek(parseFloat(seekTime))
    }

    seekbar.addEventListener("input", handleSeek)

    return () => {
      seekbar.removeEventListener("input", handleSeek)
    }
  }, [onSeek])

  const calculateProgress = () => {
    if (duration > 0) {
      return (currentTime / duration) * 100
    }
    return 0
  }

  return (
    <div className={styles.seekbar}>
      {" "}
      {/* Use the CSS module class */}
      <input
        type="range"
        ref={seekbarRef}
        min="0"
        max={duration || "100"}
        step="0.1"
        value={currentTime}
        onChange={() => {}}
      />
      <div style={{ width: `${calculateProgress()}%` }}></div>
    </div>
  )
}

export default SeekBar
