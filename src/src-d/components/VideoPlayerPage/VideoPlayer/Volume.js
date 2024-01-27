import React, { useState, useEffect } from "react";
import styles from "./Volume.module.css";
import { GoMute, GoUnmute } from "react-icons/go";

const Volume = ({ videoRef }) => {
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [videoRef, volume, isMuted]);

  const handleVolumeChange = (event) => {
    const volumeValue = parseFloat(event.target.value);
    setVolume(volumeValue);
    setIsMuted(volumeValue === 0);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const fillPercentage = isMuted ? "0%" : `${volume * 100}%`;

  const color = isMuted ? "white" : volume > 0 ? "purple" : "white";

  return (
    <div className={styles.volumeControl}>
      <button onClick={handleMuteToggle}>
        {isMuted ? <GoMute size={25} /> : <GoUnmute size={25} />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={isMuted ? 0 : volume}
        onChange={handleVolumeChange}
        style={{
          background: `linear-gradient(to right, ${color} ${fillPercentage}, white ${fillPercentage})`
        }}
      />
    </div>
  );
};

export default Volume;
