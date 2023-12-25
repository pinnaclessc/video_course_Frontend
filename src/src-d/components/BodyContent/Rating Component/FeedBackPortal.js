// import React, { useState, useRef, useEffect } from "react"
// import ReactDOM from "react-dom"
// import { GrFormClose } from "react-icons/gr"
// import { AiFillStar } from "react-icons/ai"
// import styles from "./FeedBackPortal.module.css"

// const FeedbackPortal = ({ isOpen, onClose, onFeedbackSubmit }) => {
//   const [rating, setRating] = useState(0)
//   const [hoverRating, setHoverRating] = useState(0)
//   const [feedback, setFeedback] = useState("")
//   const [hoveredStarSubheading, setHoveredStarSubheading] = useState("")

//   const portalRef = useRef(null)

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (portalRef.current && !portalRef.current.contains(event.target)) {
//         onClose()
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [onClose])

//   const handleRatingClick = (value) => {
//     setRating(value)
//   }

//   const handleRatingHover = (value) => {
//     setHoverRating(value)
//     setHoveredStarSubheading(getStarSubheading(value))
//   }

//   const handleFeedbackChange = (e) => {
//     setFeedback(e.target.value)
//   }

//   const handleSubmit = () => {
//     onFeedbackSubmit(rating, feedback)
//     onClose()
//   }

//   const getStarSubheading = (starValue) => {
//     if (starValue === 1) return "Awful"
//     if (starValue === 2) return "Poor"
//     if (starValue === 3) return "OK"
//     if (starValue === 4) return "Good"
//     if (starValue === 5) return "Awesome"
//     return ""
//   }

//   if (!isOpen) return null

//   return ReactDOM.createPortal(
//     <div className={styles["portal-backdrop"]}>
//       <div className={styles["portal-content"]} ref={portalRef}>
//         <button className={styles["close-icon"]} onClick={onClose}>
//           <GrFormClose size={20} />
//         </button>
//         <h2>How would you rate this course?</h2>
//         <h4>{hoveredStarSubheading || "Select Rating"}</h4>
//         <div className={styles["rating-stars"]}>
//           {[...Array(5)].map((_, index) => {
//             const starValue = index + 1
//             const isHalf =
//               hoverRating >= starValue - 0.5 && hoverRating < starValue
//             const isFilled =
//               starValue <= rating || (hoverRating >= starValue && !isHalf)

//             return (
//               <label
//                 key={index}
//                 className={styles.star}
//                 onMouseEnter={() => handleRatingHover(starValue)}
//                 onMouseLeave={() => handleRatingHover(0)}
//                 onClick={() =>
//                   handleRatingClick(isHalf ? starValue - 0.5 : starValue)
//                 }
//               >
//                 <AiFillStar
//                   size={25}
//                   color={isFilled ? "#f1c40f" : "#d1d7dc"}
//                   className={isHalf ? styles["half-star"] : ""}
//                 />
//               </label>
//             )
//           })}
//         </div>
//         <textarea
//           className={styles["feedback-textarea"]}
//           placeholder="Enter your feedback here..."
//           value={feedback}
//           onChange={handleFeedbackChange}
//         />
//         <button className={styles["submit-button"]} onClick={handleSubmit}>
//           Submit
//         </button>
//       </div>
//     </div>,
//     document.getElementById("portal-root")
//   )
// }

// export default FeedbackPortal
import React, { useState, useRef, useEffect } from "react"
import ReactDOM from "react-dom"
import { GrFormClose } from "react-icons/gr"
import { AiFillStar } from "react-icons/ai"
import styles from "./FeedBackPortal.module.css"

const FeedbackPortal = ({ isOpen, onClose, onFeedbackSubmit }) => {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [feedback, setFeedback] = useState("")

  const portalRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (portalRef.current && !portalRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleRatingClick = (value) => {
    setRating(value)
  }

  const handleRatingHover = (value) => {
    setHoverRating(value)
  }

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value)
  }

  const handleSubmit = () => {
    onFeedbackSubmit(rating, feedback)
    onClose()
  }
  const getStarSubheading = (starValue) => {
    if (starValue === 1) return "Awful"
    if (starValue === 2) return "Poor"
    if (starValue === 3) return "OK"
    if (starValue === 4) return "Good"
    if (starValue === 5) return "Awesome"
    return ""
  }
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div
      className={styles["portal-backdrop"]}
      id="portal-root"
      onClick={onClose}
    >
      <div
        className={styles["portal-content"]}
        ref={portalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles["close-icon"]} onClick={onClose}>
          <GrFormClose size={20} />
        </button>
        <h2>How would you rate this course?</h2>
        <h4>Select Rating</h4>
        <div className={styles["rating-stars"]}>
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1
            const isHalf =
              hoverRating >= starValue - 0.5 && hoverRating < starValue
            const isFilled =
              starValue <= rating || (hoverRating >= starValue && !isHalf)

            return (
              <label
                key={index}
                className={styles.star}
                onMouseEnter={() => handleRatingHover(starValue)}
                onMouseLeave={() => handleRatingHover(0)}
                onClick={() =>
                  handleRatingClick(isHalf ? starValue - 0.5 : starValue)
                }
              >
                <AiFillStar
                  size={25}
                  color={isFilled ? "#f1c40f" : "#d1d7dc"}
                  className={isHalf ? styles["half-star"] : ""}
                  data-title={getStarSubheading(starValue)}
                />
              </label>
            )
          })}
        </div>
        <textarea
          className={styles["feedback-textarea"]}
          placeholder="Enter your feedback here..."
          value={feedback}
          onChange={handleFeedbackChange}
        />
        <button className={styles["submit-button"]} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>,
    document.body
  )
}

export default FeedbackPortal
