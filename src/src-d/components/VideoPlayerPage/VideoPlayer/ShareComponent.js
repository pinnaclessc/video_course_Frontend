import React from "react"
import { IoMdClose } from "react-icons/io"
import { FaFacebook, FaTwitter, FaEnvelope } from "react-icons/fa"
import classes from "./Share.module.css"

const Sharing = ({ onClose }) => {
  const handleShare = () => {
    // Logic to share the video
    // You can implement the sharing functionality here
    console.log("Share video")
  }

  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <div className={classes.share_header}>
          <h2 className={classes.share_heading}>Share Video</h2>
          <button className={classes.closeBtn} onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <div className={classes.content}>
          <p className={classes.share_para}>Share this video with others:</p>
          <div className={classes.shareLinks}>
            <input
              type="text"
              value="https://example.com/video" // Replace with actual video URL
              className={classes.linkInput}
              readOnly
            />
            <button className={classes.shareBtn} onClick={handleShare}>
              Share
            </button>
          </div>
          <div className={classes.socialIcons}>
            <FaFacebook className={classes.icon} />
            <FaTwitter className={classes.icon} />
            <FaEnvelope className={classes.icon} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sharing
