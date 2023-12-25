import React from "react"

const PlayRateButton = ({ rate, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`play-rate-button ${isActive ? "active" : ""}`}
    >
      {rate}x
    </button>
  )
}

export default PlayRateButton
