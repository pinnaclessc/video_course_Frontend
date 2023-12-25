import React, { useEffect, useState } from "react"
import "./Transcript.css" // Import the CSS file

function Transcript() {
  const [transcript, setTranscript] = useState([])
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    // Fetch and parse the WebVTT file
    fetch("/video/MaxCap.vtt")
      .then((response) => response.text())
      .then((data) => {
        // Remove the WebVTT metadata and split into individual lines
        const lines = data.replace(/^WEBVTT\s*\r?\n?/i, "").split("\n")

        // Extract the text cues
        const textCues = []
        let cue = ""
        let isTimeCue = false

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim()

          if (line.includes("-->")) {
            isTimeCue = true
            continue
          }

          if (isTimeCue) {
            // Extract the cue text and remove any tags or timestamps
            cue += line.replace(/(<([^>]+)>)/gi, "").trim() + " "
          }

          if (line === "") {
            // End of a text cue
            if (isTimeCue) {
              textCues.push(cue.trim())
              cue = ""
              isTimeCue = false
            }
          }
        }

        setTranscript(textCues)
      })
      .catch((error) => {
        console.error("Error fetching transcript:", error)
      })
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className={`transcript-container ${isOpen ? "" : "closed"}`}>
      <h2 className="transcript-title">Video Transcript</h2>
      <button className="transcript-close" onClick={handleClose}>
        Close
      </button>
      {isOpen && (
        <div className="transcript-content">
          {transcript.map((paragraph, index) => (
            <p key={index} className="transcript-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default Transcript
