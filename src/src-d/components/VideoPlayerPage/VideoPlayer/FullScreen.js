import React, { useState, useEffect } from "react"
import { MdOutlineFullscreen, MdOutlineFullscreenExit } from "react-icons/md"

const FullscreenButton = ({ isFullScreen, handleToggleFullScreen }) => {
  const [icon, setIcon] = useState(<MdOutlineFullscreen size={25} />)

  useEffect(() => {
    if (isFullScreen) {
      setIcon(<MdOutlineFullscreenExit size={30} />)
    } else {
      setIcon(<MdOutlineFullscreen size={30} />)
    }
  }, [isFullScreen])

  return (
    <button
      onClick={handleToggleFullScreen}
      className="fullscreen-button"
      aria-label={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
    >
      {icon}
    </button>
  )
}

export default FullscreenButton
