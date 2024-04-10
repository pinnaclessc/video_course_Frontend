import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const PlayPauseButton = ({ handlePlayPause, isPlaying }) => {
  return (
    <button className="play-pause-button" onClick={handlePlayPause}>
      {isPlaying ? <FaPause size={27} /> : <FaPlay size={27} />}
    </button>
  );
};

export default PlayPauseButton;
