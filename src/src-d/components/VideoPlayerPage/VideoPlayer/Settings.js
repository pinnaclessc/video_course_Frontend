import React, { useState } from "react"
import { MdSettings } from "react-icons/md"
import { FaSpinner } from "react-icons/fa"
import styles from "./Settings.module.css"

const Settings = ({
  handleSettingsToggle,
  isSettingsOpen,
  videoQuality,
  handleQualityOptionClick,
}) => {
  const qualityOptions = ["240p", "480p", "720p", "1080p"]
  const [isLoading, setIsLoading] = useState(false)

  const handleQualityChange = async (quality) => {
    setIsLoading(true)
    await handleQualityOptionClick(quality)
    setIsLoading(false)
  }

  const toggleSettings = () => {
    handleSettingsToggle()
  }

  return (
    <div>
      <button className={styles.settingsIcon} onClick={toggleSettings}>
        <MdSettings />
      </button>
      {isSettingsOpen && (
        <div>
          <ul>
            {qualityOptions.map((option) => (
              <li
                key={option}
                className={option === videoQuality ? styles.activeOption : ""}
              >
                <button onClick={() => handleQualityChange(option)}>
                  {option} Quality
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Settings
