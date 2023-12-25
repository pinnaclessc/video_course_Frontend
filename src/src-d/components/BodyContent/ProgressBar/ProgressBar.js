import React, { useState, useEffect } from "react"
import FeedbackPortal from "../Rating Component/FeedBackPortal"
import StarRating from "../Rating Component/StarRating"

const Loading = ({ videoProgress }) => {
  const [percentage, setPercentage] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackData, setFeedbackData] = useState({ rating: 0, feedback: "" })

  const handleFeedbackSubmit = (rating, feedback) => {
    setFeedbackData({ rating, feedback })
  }

  const handleOpenFeedback = () => {
    setShowFeedback(true)
  }

  const handleCloseFeedback = () => {
    setShowFeedback(false)
  }

  const containerStyles = {
    height: "5px",
    width: "100%",
    backgroundColor: "#d1d7dc",
    borderRadius: "square",
    alignItems: "center",
    display: "flex",
  }

  const fillerStyles = {
    height: "5px",
    width: `${percentage}%`,
    backgroundColor: "#5624d0",
    borderRadius: "square",
    textAlign: "right",
    display: "block",
  }

  const labelStyles = {
    margin: "0",
    width: "10%",
    position: "absolute",
    fontSize: "12px",
  }

  useEffect(() => {
    setPercentage(videoProgress)
  }, [videoProgress])

  return (
    <>
      <div>
        <div style={containerStyles}>
          <div style={fillerStyles}></div>
        </div>
        <div>
          <div style={labelStyles}>0{percentage}% Completed</div>
        </div>
        <StarRating
          onClick={handleOpenFeedback}
          filledStars={feedbackData.rating}
        />
        <FeedbackPortal
          isOpen={showFeedback}
          onClose={handleCloseFeedback}
          onFeedbackSubmit={handleFeedbackSubmit}
        />
      </div>
    </>
  )
}

export default Loading
