import React, { useState } from "react"
import { FaPlay, FaPause } from "react-icons/fa"

const PlayPauseButton = ({
  isPlaying,
  handlePlayPause,
  showCenterPlayButton,
}) => {
  const handleCenterPlayClick = () => {
    handlePlayPause()
  }

  return (
    <>
      {showCenterPlayButton && (
        <button className="centerplaybutton" onClick={handleCenterPlayClick}>
          {isPlaying ? <FaPause size={27} /> : <FaPlay size={27} />}
        </button>
      )}

      <button className="play-pause-button" onClick={handlePlayPause}>
        {isPlaying ? <FaPause size={27} /> : <FaPlay size={27} />}
      </button>
    </>
  )
}

export default PlayPauseButton
