import React from "react"
// import { BiSolidStar } from "react-icons/bi"
import styles from "./StarRating.module.css"

const StarRating = ({ onClick, filledStars }) => {
  const handleStarClick = (value) => {
    if (onClick) {
      onClick(value)
    }
  }

  return (
    <>
      <div className={styles["star-rating"]}>
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1
          return (
            <label
              key={index}
              className={styles.star}
              onClick={() => handleStarClick(starValue)}
            >
              {/* <BiSolidStar
                size={20}
                color={starValue <= filledStars ? "#f1c40f" : "#d1d7dc"}
              /> */}
              Star
            </label>
          )
        })}
      </div>
      <div className={styles.rating_para}>Your Rating</div>
    </>
  )
}

export default StarRating
