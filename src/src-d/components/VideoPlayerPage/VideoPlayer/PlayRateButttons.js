import React, { useState } from "react"
import styles from "./PlayRateButtons.module.css"
const PlayRateButtons = ({ playRate, playRateOptions, onPlayRateChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleOptionClick = (option) => {
    onPlayRateChange(option)
    setIsMenuOpen(false)
  }

  return (
    <div className={styles["play-rate-buttons"]}>
      <button className={styles["play-rate"]} onClick={handleButtonClick}>
        {playRate}x
      </button>
      {isMenuOpen && (
        <div className={styles["play-rate-menu"]}>
          <ul className={styles["play-rate-menu-unorderedList"]}>
            {playRateOptions.map((option) => (
              <li
                key={option}
                className={`${styles["play-rate-menu-list"]} ${playRate === option ? styles.active : ''}`}
                onClick={() => handleOptionClick(option)}
              >
                {option}x
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default PlayRateButtons
