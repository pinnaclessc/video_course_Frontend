import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import classes from "./SchedulePopupStep2.module.css"

const StepTwo = ({ onNext, onPrevious }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedNotification, setSelectedNotification] = useState("email")
  const [reminderTime, setReminderTime] = useState(1)
  const [reminderUnit, setReminderUnit] = useState("hours")
  const [endDateType, setEndDateType] = useState("never")
  const [endDate, setEndDate] = useState("")
  const [currentStep, setCurrentStep] = useState(2)
  const [selectedOption, setSelectedOption] = useState("")

  const [name, setName] = useState()
  const [duration1, setDuration1] = useState(false)

  const nameChangeHandler = (event) => {
    setName(event.target.value)
  }

  const [duration, setDuration] = useState("Duration")

  const durationChangeHanndler1 = () => {
    setDuration("5 Min")
  }
  const durationChangeHanndler2 = () => {
    setDuration("10 Min")
  }
  const durationChangeHanndler3 = () => {
    setDuration("20 Min")
  }
  const durationChangeHanndler4 = () => {
    setDuration("30 Min")
  }
  const durationChangeHanndler5 = () => {
    setDuration("1H")
  }
  const durationChangeHanndler6 = () => {
    setDuration1("true")
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }
  const navigate = useNavigate()

  const handleNext = () => {
    // Navigate to Step 3
    navigate("/step3")
  }

  const handlePrevious = () => {
    // Navigate to Step 1
    navigate("/step1")
  }

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev)
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
    setShowDropdown(false)
  }

  return (
    <div className={classes.stepTwoContainer}>
      <h3>Create an event</h3>
      <p>Step 2 of 3</p>

      {/* Time to learn section */}
      <div className={classes.timeToLearn}>
        <div className={classes.icon}>
          <i className="fas fa-calendar-alt"></i>
        </div>
        <h4>Time to Learn</h4>
        <p>
          Choose the date and time when you want to schedule your learning
          event.
        </p>
      </div>

      {/* Frequency section */}
      <div className={classes.frequency}>
        <h4>Frequency</h4>
        <div className={classes.buttonsContainer}>
          <button className={classes.circularButton}>Daily</button>
          <button className={classes.circularButton}>Weekly</button>
          <button className={classes.circularButton}>Monthly</button>
        </div>
      </div>

      {/* Duration section */}
      <div className={classes.duration}>
        <h4>Duration</h4>
        <div className={classes.buttonsContainer}>
          <button
            className={classes.circularButton}
            onClick={durationChangeHanndler1}
          >
            5 Min
          </button>
          <button
            className={classes.circularButton}
            onClick={durationChangeHanndler2}
          >
            10 Min
          </button>
          <button
            className={classes.circularButton}
            onClick={durationChangeHanndler3}
          >
            20 Min
          </button>
          <button
            className={classes.circularButton}
            onClick={durationChangeHanndler4}
          >
            30 Min
          </button>
          <button
            className={classes.circularButton}
            onClick={durationChangeHanndler5}
          >
            1h
          </button>
          <button
            className={classes.circularButton}
            onClick={durationChangeHanndler6}
          >
            Custom
          </button>
        </div>
      </div>

      {/* Time section */}
      <div className={classes.timeSection}>
        <h4>Time</h4>
        <div className={classes.timeInputContainer}>
          <input
            type="text"
            placeholder="Enter time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
          <div className={classes.dropdownIcon} onClick={handleDropdownToggle}>
            <i className="fas fa-chevron-down"></i>
          </div>
          {showDropdown && (
            <div className={classes.dropdown}>
              <div onClick={() => handleTimeSelect("10:00 AM")}>10:00 AM</div>
              <div onClick={() => handleTimeSelect("02:30 PM")}>02:30 PM</div>
              <div onClick={() => handleTimeSelect("06:00 PM")}>06:00 PM</div>
              {/* Add more time options here */}
            </div>
          )}
        </div>
      </div>

      {/* Reminder section */}
      <div className={classes.reminderSection}>
        <h4>Reminder</h4>
        <div className={classes.reminderOptions}>
          <div className={classes.notificationDropdown}>
            <select
              value={selectedNotification}
              onChange={(e) => setSelectedNotification(e.target.value)}
            >
              <option value="email">Email</option>
              <option value="phone">Phone Number</option>
            </select>
          </div>
          <div className={classes.timeInputWithArrows}>
            <input type="number" min="1" max="60" value={reminderTime} />
            <div className={classes.arrows}>
              <i className="fas fa-chevron-up"></i>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
          <div className={classes.reminderDropdown}>
            <select
              value={reminderUnit}
              onChange={(e) => setReminderUnit(e.target.value)}
            >
              <option value="hours">Hours Before</option>
              <option value="minutes">Minutes Before</option>
              <option value="days">Days Before</option>
            </select>
          </div>
        </div>
        <p>Set a reminder for the event.</p>
      </div>

      {/* End date section */}
      <div className={classes.endDateSection}>
        <h4>End Date</h4>
        <div className={classes.endDateOptions}>
          <div>
            <input
              type="radio"
              id="never"
              value="never"
              checked={endDateType === "never"}
              onChange={() => setEndDateType("never")}
            />
            <label htmlFor="never">Never</label>
          </div>
          <div>
            <input
              type="radio"
              id="endDate"
              value="endDate"
              checked={endDateType === "endDate"}
              onChange={() => setEndDateType("endDate")}
            />
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={endDateType !== "endDate"}
            />
          </div>
        </div>
      </div>

      {/* Next and Previous buttons */}
      <div className={classes.navigationButtons}>
        {currentStep > 1 && <button onClick={handlePrevious}>Previous</button>}
        {currentStep < 3 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={onNext}>Next</button>
        )}
      </div>
    </div>
  )
}

export default StepTwo
