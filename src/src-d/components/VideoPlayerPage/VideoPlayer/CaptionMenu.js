import React from "react"

const CaptionMenu = ({ onSelectLanguage }) => {
  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value
    onSelectLanguage(selectedLanguage)
  }

  return (
    <div>
      <select onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="fr">French</option>
        {/* Add more language options here */}
      </select>
    </div>
  )
}

export default CaptionMenu
