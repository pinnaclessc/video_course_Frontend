// import React, { useState } from "react"
// import ReactDOM from "react-dom"
// import styles from "./Rating.module.css"

// const Rating = () => {
//   const [rating, setRating] = useState(0)
//   const [isHovered, setIsHovered] = useState(false)
//   const [showCard, setShowCard] = useState(false)

//   const handleRatingChange = (value) => {
//     setRating(value)
//   }

//   const handleMouseEnter = () => {
//     setIsHovered(true)
//   }

//   const handleMouseLeave = () => {
//     setIsHovered(false)
//   }

//   const handleCardOpen = () => {
//     setShowCard(true)
//   }

//   const CardPortal = ({ children }) => {
//     const cardRoot = document.getElementById("card-root")
//     return ReactDOM.createPortal(children, cardRoot)
//   }

//   return (
//     <div>
//       <h2>Rating Component</h2>
//       <div className={styles.ratingContainer}>
//         <span
//           className={`${styles.star} ${isHovered && styles.hovered} ${
//             rating >= 1 && styles.selected
//           }`}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//           onClick={handleCardOpen}
//         >
//           ★
//         </span>
//         {/* ... (Other star elements) ... */}
//       </div>
//       <p>Selected Rating: {rating}</p>
//       {showCard && (
//         <CardPortal>
//           <div className={styles.card}>
//             <h3>How would you rate this course?</h3>
//             <p>Select a rating:</p>
//             <div className={styles.ratingContainer}>
//               {[1, 2, 3, 4, 5].map((value) => (
//                 <span
//                   key={value}
//                   className={`${styles.star} ${
//                     value <= rating ? styles.selected : ""
//                   }`}
//                   onClick={() => handleRatingChange(value)}
//                 >
//                   ★
//                 </span>
//               ))}
//             </div>
//           </div>
//         </CardPortal>
//       )}
//     </div>
//   )
// }

// export default Rating
// import React, { useState } from "react"
// import ReactDOM from "react-dom"
// import styles from "./Rating.module.css"

// const Rating = () => {
//   const [rating, setRating] = useState(0)
//   const [isHovered, setIsHovered] = useState(false)
//   const [showCard, setShowCard] = useState(false)

//   const handleRatingChange = (value) => {
//     setRating(value)
//   }

//   const handleMouseEnter = () => {
//     setIsHovered(true)
//   }

//   const handleMouseLeave = () => {
//     setIsHovered(false)
//   }

//   const handleCardOpen = () => {
//     setShowCard(true)
//   }

//   const CardPortal = ({ children }) => {
//     const cardRoot = document.getElementById("card-root")
//     return ReactDOM.createPortal(children, cardRoot)
//   }

//   const getSubtitleText = () => {
//     if (rating >= 1 && rating < 2) {
//       return "Awful"
//     } else if (rating >= 2 && rating < 3) {
//       return "Poor"
//     } else if (rating >= 3 && rating < 4) {
//       return "Average"
//     } else if (rating >= 4 && rating < 5) {
//       return "Good"
//     } else if (rating === 5) {
//       return "Amazing"
//     } else {
//       return "Select Rating"
//     }
//   }

//   return (
//     <div>
//       <h2>Rating Component</h2>
//       <div className={styles.ratingContainer}>
//         <span
//           className={`${styles.star} ${isHovered && styles.hovered} ${
//             rating >= 1 ? styles.selected : ""
//           }`}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//           onClick={handleCardOpen}
//         >
//           ★
//         </span>
//         {/* ... (Other star elements) ... */}
//       </div>
//       <p>Selected Rating: {rating}</p>
//       {showCard && (
//         <CardPortal>
//           <div className={styles.card}>
//             <h3>How would you rate this course?</h3>
//             <p>{getSubtitleText()}</p>
//             <div className={styles.ratingContainer}>
//               {[1, 2, 3, 4, 5].map((value) => (
//                 <span
//                   key={value}
//                   className={`${styles.star} ${
//                     value <= rating ? styles.selected : ""
//                   } ${isHovered && value === 1 ? styles.awful : ""} ${
//                     isHovered && value === 2 ? styles.poor : ""
//                   } ${isHovered && value === 3 ? styles.average : ""} ${
//                     isHovered && value === 4 ? styles.good : ""
//                   } ${isHovered && value === 5 ? styles.amazing : ""}`}
//                   onClick={() => handleRatingChange(value)}
//                 >
//                   ★
//                 </span>
//               ))}
//             </div>
//           </div>
//         </CardPortal>
//       )}
//     </div>
//   )
// }

// export default Rating
// import React, { useState } from "react"
// import ReactDOM from "react-dom"
// import styles from "./Rating.module.css"

// const Rating = () => {
//   const [rating, setRating] = useState(0)
//   const [hoveredRating, setHoveredRating] = useState(0)
//   const [showCard, setShowCard] = useState(false)

//   const handleRatingChange = (value) => {
//     setRating(value)
//   }

//   const handleCardOpen = () => {
//     setShowCard(true)
//   }

//   const handleMouseEnter = (value) => {
//     setHoveredRating(value)
//   }

//   const handleMouseLeave = () => {
//     setHoveredRating(0)
//   }

//   const CardPortal = ({ children }) => {
//     const cardRoot = document.getElementById("card-root")
//     return ReactDOM.createPortal(children, cardRoot)
//   }

//   const getSubtitleText = () => {
//     if (hoveredRating >= 1 && hoveredRating < 2) {
//       return "Awful"
//     } else if (hoveredRating >= 2 && hoveredRating < 3) {
//       return "Poor"
//     } else if (hoveredRating >= 3 && hoveredRating < 4) {
//       return "Average"
//     } else if (hoveredRating >= 4 && hoveredRating < 5) {
//       return "Good"
//     } else if (hoveredRating === 5) {
//       return "Amazing"
//     } else {
//       return "Select Rating"
//     }
//   }

//   return (
//     <div>
//       <h2>Rating Component</h2>
//       <div className={styles.ratingContainer}>
//         {[1, 2, 3, 4, 5].map((value) => (
//           <span
//             key={value}
//             className={`${styles.star} ${
//               rating >= value ? styles.selected : ""
//             }`}
//             onClick={() => {
//               handleRatingChange(value)
//               handleCardOpen()
//             }}
//           >
//             ★
//           </span>
//         ))}
//       </div>

//       {showCard && (
//         <CardPortal>
//           <div className={styles.card}>
//             <h3>How would you rate this course?</h3>
//             <p>{getSubtitleText()}</p>
//             <div className={styles.ratingContainer}>
//               {[1, 2, 3, 4, 5].map((value) => (
//                 <span
//                   key={value}
//                   className={`${styles.star} ${
//                     value <= hoveredRating ? styles.hovered : ""
//                   }`}
//                   onMouseEnter={() => handleMouseEnter(value)}
//                   onMouseLeave={handleMouseLeave}
//                   onClick={() => handleRatingChange(value)}
//                 >
//                   ★
//                 </span>
//               ))}
//             </div>
//           </div>
//         </CardPortal>
//       )}
//     </div>
//   )
// }

// export default Rating

import React, { useState } from "react"
import ReactDOM from "react-dom"
import styles from "./Rating.module.css"
import { GrFormClose } from "react-icons/gr"

const Rating = () => {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [showCard, setShowCard] = useState(false)
  const [showTextArea, setShowTextArea] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [showBackdrop, setShowBackdrop] = useState(true)

  const handleInputChange = (event) => {
    const { value } = event.target
    setFeedback(value)
  }

  const handleSaveAndContinue = () => {
    // Perform necessary logic with the feedback data
    console.log("Feedback:", feedback)

    // Reset the feedback and showTextArea states
    setFeedback("")
    setShowTextArea(false)
  }

  const handleStarClick = () => {
    setShowTextArea(!showTextArea)
  }

  const handleRatingChange = (value) => {
    setRating(value)
  }

  const handleCardOpen = () => {
    setShowCard(true)
  }

  const handleMouseEnter = (value) => {
    setHoveredRating(value)
  }

  const handleMouseLeave = () => {
    setHoveredRating(0)
  }

  const CardPortal = ({ children }) => {
    const cardRoot = document.getElementById("card-root")
    return ReactDOM.createPortal(children, cardRoot)
  }

  const getStarIcon = (value) => {
    const filledStar = "★"
    const halfStar = "½"
    const emptyStar = "☆"

    if (value < rating) {
      return filledStar
    } else if (value === rating) {
      return rating % 1 === 0.5 ? halfStar : filledStar
    } else {
      return emptyStar
    }
  }
  const handleCloseCard = () => {
    setShowCard(false)
    setShowBackdrop(false)
  }

  const getSubtitleText = () => {
    if (hoveredRating >= 1 && hoveredRating < 2) {
      return "Awful"
    } else if (hoveredRating >= 2 && hoveredRating < 3) {
      return "Poor"
    } else if (hoveredRating >= 3 && hoveredRating < 4) {
      return "Average"
    } else if (hoveredRating >= 4 && hoveredRating < 5) {
      return "Good"
    } else if (hoveredRating === 5) {
      return "Amazing"
    } else {
      return "Select Rating"
    }
  }

  return (
    <div className={styles.ratingContainer1}>
      <h6>Your Rating</h6>
      <div className={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`${styles.star} ${
              rating >= value ? styles.selected : ""
            }`}
            onClick={() => {
              handleRatingChange(value)
              handleCardOpen()
            }}
          >
            ★
          </span>
        ))}
      </div>
      {showCard && (
        <CardPortal>
          {showBackdrop && (
            <div className={styles.backdrop} onClick={handleCloseCard} />
          )}
          <div className={styles.card}>
            <button className={styles.closeButton} onClick={handleCloseCard}>
              <GrFormClose />
            </button>
            <h3>How would you rate this course?</h3>
            <p>{getSubtitleText()}</p>
            <div className={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={`${styles.star} ${
                    value <= hoveredRating ? styles.hovered : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(value)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleStarClick()}
                >
                  ★
                </span>
              ))}
              {showTextArea && (
                <div>
                  <textarea
                    placeholder="Enter your feedback"
                    value={feedback}
                    onChange={handleInputChange}
                  />
                  <button onClick={handleSaveAndContinue}>
                    Save and Continue
                  </button>
                </div>
              )}
            </div>
          </div>
        </CardPortal>
      )}
    </div>
  )
}

export default Rating
