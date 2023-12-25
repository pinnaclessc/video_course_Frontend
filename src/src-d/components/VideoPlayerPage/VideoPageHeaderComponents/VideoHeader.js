import React, { useState, useEffect } from "react"
import classes from "./VideoHeader.module.css"
import { AiFillStar } from "react-icons/ai"
import { IoIosShareAlt } from "react-icons/io"
import { RiArrowDropDownLine } from "react-icons/ri"
import { BsThreeDotsVertical } from "react-icons/bs"
import VerticaldotsOptions from "./VerticaldotsOptions"
import Share from "./Sharing"
import StarRating from "../../BodyContent/Rating Component/StarRating"
import FeedbackPortal from "../../BodyContent/Rating Component/FeedBackPortal"
import { NavLink } from "react-router-dom"
import SharePortal from "./SharePortal"

const Header = () => {
  const [isVerticalOptions, setVerticalOptions] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [videoProgress, setVideoProgress] = useState(0)
  const [isShareOptionsOpen, setIsShareOptionsOpen] = useState(false)
  const [isLeaveRatingOpen, setIsLeaveRatingOpen] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackData, setFeedbackData] = useState({ rating: 0, feedback: "" })
  const [isShareOpen, setIsShareOpen] = useState(false)

  const handleShareButtonClick = () => {
    setIsShareOpen(!isShareOpen)
  }

  const handleFeedbackSubmit = (rating, feedback) => {
    setFeedbackData({ rating, feedback })
  }

  const handleOpenFeedback = () => {
    setShowFeedback(true)
  }

  const handleCloseFeedback = () => {
    setShowFeedback(false)
  }

  const handleShareOptions = () => {
    setIsShareOptionsOpen(!isShareOptionsOpen)
  }
  // const handleShareButtonClick = () => {
  //   setIsShareOptionsOpen(!isShareOptionsOpen)
  // }
  const handleLeaveRatingClick = () => {
    setIsLeaveRatingOpen(true)
  }
  const handleCloseLeaveRating = () => {
    setIsLeaveRatingOpen(false)
  }

  const updateVideoProgress = () => {
    const videoDuration = 100
    setVideoProgress((prevProgress) => prevProgress + 100 / videoDuration)
  }

  const handleSharing = () => {
    setIsSharing(!isSharing)
  }

  const handleCloseSharing = () => {
    setIsSharing(false)
  }

  const handlerVerticalDots = () => {
    setVerticalOptions((prevOptions) => !prevOptions)
  }

  const handlerCloseVerticalDots = () => {
    setVerticalOptions(false)
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink to="/">
          <img src="/images/Pinnacle_Logo.svg" width={100} alt="Logo" />
        </NavLink>
      </div>
      <div className={classes.title}>
        SSC Maths 6800 TCS MCQ chapter wise book course
      </div>
      <div className={classes.options}>
        <div className={classes.option} onClick={handleLeaveRatingClick}>
          <span>
            <AiFillStar size={20} />
          </span>
          <span>Leave a rating</span>
        </div>
        <div className={classes.dropdown}>
          <span>Your Progress</span>
          <RiArrowDropDownLine size={25} />
          <div
            className={classes.progressBar}
            // style={{ width: `${videoProgress}%` }}
          ></div>
        </div>
        <div className={classes.shareContainer}>
          <button
            className={classes.shareButton}
            onClick={handleShareButtonClick}
          >
            Share
            <IoIosShareAlt
              className={classes.shareIcon}
              size={23}
              onClick={handleSharing}
            />
          </button>
        </div>
        <button className={classes.Vdots} onClick={handlerVerticalDots}>
          <BsThreeDotsVertical className={classes.Vdotsicon} size={25} />
        </button>
      </div>
      {isVerticalOptions && (
        <VerticaldotsOptions onClose={handlerCloseVerticalDots} />
      )}
      {isShareOpen && (
        <SharePortal>
          <Share onClose={() => setIsShareOpen(false)} />
        </SharePortal>
      )}

      {isLeaveRatingOpen && (
        <StarRating
          onClick={handleOpenFeedback}
          filledStars={feedbackData.rating}
          onClose={handleCloseLeaveRating}
        />
      )}
      <FeedbackPortal
        isOpen={showFeedback}
        onClose={handleCloseFeedback}
        onFeedbackSubmit={handleFeedbackSubmit}
      />
    </header>
  )
}

export default Header
