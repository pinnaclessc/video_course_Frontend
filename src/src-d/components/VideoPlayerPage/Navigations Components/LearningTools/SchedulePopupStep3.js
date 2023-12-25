import React, { useState, useEffect } from "react"
import { HiCalendar } from "react-icons/hi"
import { useNavigate } from "react-router-dom" // Import useNavigate instead of useHistory
import classes from "./SchedulePopup.module.css"

const SchedulePopupStep3 = ({ onClose }) => {
  const navigate = useNavigate() // Use the useNavigate hook for navigation

  const handleContentClick = (e) => {
    e.stopPropagation()
  }

  const handlePreviousStep = () => {
    navigate("/step2") // Navigate back to Step 2
  }

  const handleDone = () => {
    onClose() // Close the modal
  }
  const [isVisible, setIsVisible] = useState(true)

  const handleHide = () => {
    setIsVisible(false)
  }
  useEffect(() => {
    const isComponentVisible = localStorage.getItem("componentVisible")
    if (isComponentVisible !== null) {
      setIsVisible(JSON.parse(isComponentVisible))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("componentVisible", JSON.stringify(isVisible))
  }, [isVisible])
  if (!isVisible) {
    return null
  }

  // Your form and scheduling logic can be implemented here
  return (
    <div className={classes.backdrop} onClick={onClose}>
      <div className={classes.modal} onClick={handleContentClick}>
        <h3>Create an event</h3>
        <p>Step 3 of 3</p>
        {/* Your content for Step 3 */}
        <div className={classes.calenderIcon}>
          <HiCalendar size={40} />
        </div>
        <div className={classes.timeToLearn}>
          <h4>Time to Learn</h4>
          {/* Display the selected data from Step 1 and Step 2 */}
        </div>
        <div className={classes.reminderSection}>
          <h4>Reminder</h4>
          {/* Display the selected data from Step 1 and Step 2 */}
        </div>
        <div className={classes.saveEvent}>
          <p>Save your event</p>
        </div>
        <div className={classes.providers}>{/* Your provider icons */}</div>
        <div className={classes.buttonContainer}>
          <button onClick={handlePreviousStep}>Previous</button>
          <button onClick={handleHide}>Done</button>
        </div>
      </div>
    </div>
  )
}

export default SchedulePopupStep3
