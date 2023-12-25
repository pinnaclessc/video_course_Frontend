import React, { useState } from "react"
import "./styles.css"
import Rate from "./Rate"

const Star = () => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  // const [p, setp] = useState(0);
  const [arr, setArr] = useState([])

  function set() {
    setArr([...arr, rating])
  }

  var n = [0, 1, 2, 3, 4]

  var b = n.map(star)
  function star(i, id) {
    i = i + 1
    return (
      <div className="fullStar">
        <button
          key={id}
          type="button"
          className={i <= (hover || [rating]) ? "on" : "off"}
          onClick={() => {
            setRating(i)
            set()
          }}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(rating)}
          onDoubleClick={() => {
            setRating(0)
            setHover(0)
          }}
        >
          <span className="star">&#9733; </span>
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="forStar">
        <div className="star-rating">{b}</div>
        <Rate arr={arr} />
      </div>
    </>
  )
}
export default Star
