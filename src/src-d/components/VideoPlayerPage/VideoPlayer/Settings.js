import React, { useState } from 'react';
import { MdSettings } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import styles from './Settings.module.css';

const Settings = ({ currentQuality, onChangeQuality, resolutions, videoRef }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSettingsToggle = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleQualityChange = async (quality) => {
    if (currentQuality === quality) return; // If the selected quality is the same, do nothing

    const currentTime = videoRef.current.currentTime;
    setIsLoading(true);
    
    try {
      // Simulating an async operation before changing the quality
      await new Promise(resolve => setTimeout(resolve, 500));

      onChangeQuality(quality);
      
      // Wait for the video to be ready and seek to the previous time
      videoRef.current.addEventListener('loadedmetadata', function onMetadataLoaded() {
        videoRef.current.currentTime = currentTime;
        videoRef.current.removeEventListener('loadedmetadata', onMetadataLoaded);
      });
    } catch (error) {
      console.error("Error changing video quality:", error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className={styles.settingsContainer}>
      <button className={styles.settingsButton} onClick={handleSettingsToggle}>
        <MdSettings size={24} />
      </button>
      {isSettingsOpen && (
        <div className={styles.settingsDropdown}>
          {isLoading ? (
            <FaSpinner className={styles.spinner} />
          ) : (
            resolutions.map(resolution => (
              <div
                key={resolution.name}
                className={`${styles.qualityOption} ${
                  resolution.name === currentQuality ? styles.active : ''
                }`}
                onClick={() => handleQualityChange(resolution.name)}
              >
                {resolution.name}
              </div>
            ))
          )}
          <div className={styles.autoplayToggle}>
            <label>
              Auto
              <input type="checkbox" />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
