import React from "react"
import cap from "../../../assets/MaxCap.vtt"

const Caption = ({ language }) => {
  return (
    <track
      kind="captions"
      src={cap} // Replace with the appropriate path to your caption files
      srcLang={language}
      default
    />
  )
}

export default Caption
