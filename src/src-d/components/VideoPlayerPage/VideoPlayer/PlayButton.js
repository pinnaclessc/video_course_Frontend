import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const PlayPauseButton = ({ videoRef, showCenterPlayButton }) => {
  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <>
      {showCenterPlayButton && (
        <button className="center-play-button" onClick={handlePlayPause}>
          {videoRef.current && !videoRef.current.paused ? <FaPause size={27} /> : <FaPlay size={27} />}
        </button>
      )}

      <button className="play-pause-button" onClick={handlePlayPause}>
        {videoRef.current && !videoRef.current.paused ? <FaPause size={27} /> : <FaPlay size={27} />}
      </button>
    </>
  );
};

export default PlayPauseButton;
