// import React, { useState } from 'react';
// import { MdSettings } from 'react-icons/md';
// import styles from './Settings.module.css';
// import { useVideo } from '../../../../context/VideoContext';

// const Settings = () => {

//   const { videoQuality, setVideoQuality, videoDetails } = useVideo();
//   const [isSettingsOpen, setIsSettingsOpen] = useState(false);

//   const toggleSettings = () => {
//     setIsSettingsOpen(!isSettingsOpen);
//   };

//   const handleQualityChange = (quality) => {
//     setVideoQuality(quality);
//     setIsSettingsOpen(false);
//   };

//   return (
//     <div className={styles.settingsContainer}>
//       <MdSettings size={24} onClick={toggleSettings} className={styles.settingsIcon} />
//       {isSettingsOpen && (
//         <div className={styles.settingsDropdown}>
//           {videoDetails.resolutions.map((resolution) => (
//             <div
//               key={resolution.name}
//               className={`${styles.qualityOption} ${resolution.name === videoQuality ? styles.active : ''}`}
//               onClick={() => handleQualityChange(resolution.name)}
//             >
//               {resolution.name}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Settings;

import React, { useState } from 'react';
import { MdSettings } from 'react-icons/md';
import styles from './Settings.module.css';
import { useVideo } from '../../../../context/VideoContext';

const Settings = () => {
  const { videoQuality, setVideoQuality, videoDetails } = useVideo();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  const handleQualityChange = (quality) => {
    setVideoQuality(quality);
    setIsSettingsOpen(false);
  };

  return (
    <div className={styles.settingsContainer}>
      <MdSettings size={24} onClick={toggleSettings} className={styles.settingsIcon} />
      {isSettingsOpen && (
        <div className={styles.settingsDropdown}>
          {videoDetails.resolutions.map((resolution) => (
            <div
              key={resolution.name}
              className={`${styles.qualityOption} ${resolution.name === videoQuality ? styles.active : ''}`}
              onClick={() => handleQualityChange(resolution.name)}
            >
              {resolution.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Settings;
