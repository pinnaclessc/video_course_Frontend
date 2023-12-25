import React, { useState, useEffect, useRef } from "react"
import classes from "./MainContent.module.css"
// import { PiPlayFill } from "react-icons/pi"
import { BsThreeDotsVertical } from "react-icons/bs"
import data from "../maindata.json"
import Card from "../Card/Card"
import Loading from "../ProgressBar/ProgressBar"
import { Link } from "react-router-dom"
import SideDots from "../Three Dots/SideDots"

function MainContent() {
  const [isVerticalOptions, setVerticalOptions] = useState(
    Array(data.length).fill(false)
  )
  const [openIndex, setOpenIndex] = useState(-1)
  const [lastClickedIndex, setLastClickedIndex] = useState(-1)
  const [isSideDotsOpen, setSideDotsOpen] = useState(false)
  const ref = useRef(null)

  const handleCloseSideDots = () => {
    setSideDotsOpen(isSideDotsOpen)
  }

  const handlePlayClick = (link) => {
    console.log("Opening video link:", link)
  }

  const handleDotClick = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index))
  }

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setVerticalOptions(Array(data.length).fill(false))
      setLastClickedIndex(-1)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={classes.card_container}>
      {data.map((item, index) => (
        <Card key={item.id} className={classes.card}>
          <div className={classes.card_img_container}>
            <div className={classes.card_img}>
              <img src={item.image} alt="" width="95" height="95" />
              <img src={item.imageUrl} alt="" width="95" height="95" />
              <div
                className={classes.play_icon}
                onClick={() => handlePlayClick(item.link)}
              >
                <Link to="/mylearning">
                  {/* <PiPlayFill size={30} /> */}
                  play Icon
                </Link>
              </div>
            </div>
          </div>
          <div className={classes.sidedots} ref={ref}>
            <button onClick={() => handleDotClick(index)}>
              <div className={classes.dots}>
                <BsThreeDotsVertical className={classes.threedots} size={15} />
              </div>
            </button>
            {openIndex === index && (
              <SideDots isOpen={true} onClose={handleCloseSideDots} />
            )}
          </div>
          <div className={classes.heading}>
            <a href="/" className={classes.title}>
              {item.title}
            </a>
            <div className={classes.instructor}>{item.instructor}</div>
          </div>
          <Loading />
        </Card>
      ))}
    </div>
  )
}

export default MainContent
