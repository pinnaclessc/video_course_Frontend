import React, { useState, useEffect } from "react"
import "./Volume.css"
import { GoMute, GoUnmute } from "react-icons/go"

const Volume = ({ videoRef }) => {
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume
      videoRef.current.muted = isMuted
    }
  }, [videoRef, volume, isMuted])

  const handleVolumeChange = (event) => {
    const volumeValue = parseFloat(event.target.value)
    setVolume(volumeValue)
    setIsMuted(volumeValue === 0)
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="volume-control">
      <button onClick={handleMuteToggle}>
        {isMuted ? <GoMute size={25} /> : <GoUnmute size={25} />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={isMuted ? 0 : volume}
        onChange={handleVolumeChange}
      />
    </div>
  )
}

export default Volume
