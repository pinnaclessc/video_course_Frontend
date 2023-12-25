import React from "react"
import "./Rate.css"
import { MdStarRate } from "react-icons/md"
import Progressbar from "./Progressbar"

const Rate = ({ arr }) => {
  var a = arr
  var count1 = 5
  var count2 = 15
  var count3 = 29
  var count4 = 34
  var count5 = 45
  var wholecount = 0
  var totalAverage = 0

  var average1
  var average2
  var average3
  var average5
  var average4

  for (var j = 0; j < a.length; j++) {
    if (a[j] === 1) {
      count1++
    }
    if (a[j] === 2) {
      count2++
    }
    if (a[j] === 3) {
      count3++
    }
    if (a[j] === 4) {
      count4++
    }
    if (a[j] === 5) {
      count5++
    }
  }
  average5 = 5 * count5
  average4 = 4 * count4
  average3 = 3 * count3
  average2 = 2 * count2
  average1 = 1 * count1
  totalAverage = average1 + average2 + average3 + average4 + average5
  wholecount = count1 + count2 + count3 + count4 + count5
  var rate = totalAverage / wholecount

  return (
    <>
      <div className="giverating"> Give Your Feedback</div>
      <div className="a">
        <div className="container-for-rating">
          <div className="cards-for-star-rating">
            <div className="card-content-for-star-rating">
              <h2>{rate.toFixed(1)}</h2>
              <div className="For-Star">
                <MdStarRate className="Star-Rating-average" fontSize="1.5em" />
              </div>
            </div>
            <div className="Total-rating">({wholecount}) Ratings</div>
          </div>
          <div className="cards-for-star-rating-2">
            <Progressbar
              C1={count1}
              C2={count2}
              C3={count3}
              C4={count4}
              C5={count5}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default Rate
