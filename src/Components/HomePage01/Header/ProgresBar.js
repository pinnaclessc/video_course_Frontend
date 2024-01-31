import React, { useState, useEffect } from "react"

const Loading = ({ videoProgress }) => {
  const [percentage, setPercentage] = useState(0)

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
    fontSize: "12px", // Adjust the font size value as per your preference
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
      </div>
    </>
  )
}

export default Loading
