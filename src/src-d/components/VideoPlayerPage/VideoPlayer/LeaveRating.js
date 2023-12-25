import React, { useState } from "react"
import { FaTimes } from "react-icons/fa"
import "./LeaveRating.css"

const Overlay = () => {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isOverlayOpen, setIsOverlayOpen] = useState(true)

  const handleStarHover = (hoveredRating) => {
    setHoveredRating(hoveredRating)
  }

  const handleStarLeave = () => {
    setHoveredRating(0)
  }

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating)
  }

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false)
  }

  return (
    <div className={`overlay ${isOverlayOpen ? "open" : "closed"}`}>
      <div className="overlay-content">
        <h2 className="overlay-heading">Star Rating </h2>
        <p className="overlay-para">This is some sample text for rating.</p>
        <div className="close-icon" onClick={handleCloseOverlay}>
          <FaTimes />
        </div>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? "filled" : ""} ${
                star === hoveredRating ? "hovered" : ""
              }`}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={handleStarLeave}
              onClick={() => handleStarClick(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Overlay
