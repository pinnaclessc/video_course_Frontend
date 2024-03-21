import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import styles from "./PlayRateButtons.module.css";

const PlayPauseButton = ({ videoRef, showCenterPlayButton }) => {
  const handlePlayPause = (event) => {
    event.stopPropagation(); // Prevent click from bubbling up
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
        <button className={styles.centerPlayButton} onClick={handlePlayPause}>
          {videoRef.current && !videoRef.current.paused ? (
            <FaPause size={27} />
          ) : (
            <FaPlay size={27} />
          )}
        </button>
      )}

      <button className={styles["play-pause-button"]} onClick={handlePlayPause}>
        {videoRef.current && !videoRef.current.paused ? <FaPause size={27} /> : <FaPlay size={27} />}
      </button>
    </>
  );
};

export default PlayPauseButton;
