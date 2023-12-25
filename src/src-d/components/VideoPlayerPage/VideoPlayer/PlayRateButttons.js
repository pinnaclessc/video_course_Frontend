import React, { useState } from "react"
import PlayRateButton from "./PlayRateButton"

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
    <div className="play-rate-buttons">
      <button className="play-rate" onClick={handleButtonClick}>
        {playRate}x
      </button>
      {isMenuOpen && (
        <div className="play-rate-menu">
          <ul className="play-rate-menu-unorderedList">
            {playRateOptions.map((option) => (
              <li key={option} className="play-rate-menu-list">
                <PlayRateButton
                  rate={option}
                  isActive={playRate === option}
                  onClick={() => handleOptionClick(option)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default PlayRateButtons
