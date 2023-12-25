import React, { useState } from "react"
import { HiOutlineSearch } from "react-icons/hi"
import classes from "./SchedulePopup.module.css"
import StepTwo from "./SchedulePopupStep2"
import { NavLink } from "react-router-dom"

const SchedulePopup = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedOption, setSelectedOption] = useState("")

  const handleContentClick = (e) => {
    e.stopPropagation()
  }

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prevStep) => prevStep + 1)
      setSelectedOption("")
    } else {
      onClose()
    }
  }

  return (
    <div className={classes.backdrop} onClick={onClose}>
      <div className={classes.modal} onClick={handleContentClick}>
        <h3>Create an event</h3>
        <p>Step {currentStep} of 3</p>
        <label>Name</label>
        <input placeholder="Time to learn!" />
        <p>Course</p>
        <span>optional</span>
        <ul>
          <li>
            <label className={classes.checkboxContainer}>
              Option 1
              <input
                type="checkbox"
                checked={selectedOption === "Option 1"}
                onChange={() => handleOptionSelect("Option 1")}
              />
              <span className={classes.checkmark}></span>
            </label>
          </li>
          <li>
            <label className={classes.checkboxContainer}>
              Option 2
              <input
                type="checkbox"
                checked={selectedOption === "Option 2"}
                onChange={() => handleOptionSelect("Option 2")}
              />
              <span className={classes.checkmark}></span>
            </label>
          </li>
          <li>
            <label className={classes.checkboxContainer}>
              Option 3
              <input
                type="checkbox"
                checked={selectedOption === "Option 3"}
                onChange={() => handleOptionSelect("Option 3")}
              />
              <span className={classes.checkmark}></span>
            </label>
          </li>
          <li>
            <label className={classes.checkboxContainer}>
              None
              <input
                type="checkbox"
                checked={selectedOption === "None"}
                onChange={() => handleOptionSelect("None")}
              />
              <span className={classes.checkmark}></span>
            </label>
          </li>
        </ul>
        <HiOutlineSearch size={15} />
        <input placeholder="Search course"></input>
        <div>
          <NavLink to="/step2">
            <button onClick={handleNextStep}>
              {currentStep < 3 ? "Next" : "Finish"}
            </button>
          </NavLink>
        </div>
        {currentStep === 2 && (
          <StepTwo onPrevious={() => setCurrentStep(1)} onNext={onClose} />
        )}
      </div>
    </div>
  )
}

export default SchedulePopup
