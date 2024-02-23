import React, { useState } from "react"
import Card from "./Card/Card"
import classes from "./Wishlist.module.css"
import { BiHeart } from "react-icons/bi"

export default function Wishlist() {
  const [showCard, setShowCard] = useState(false)

  const handleMouseEnter = () => {
    setShowCard(true)
  }

  const handleMouseLeave = () => {
    setShowCard(false)
  }
  return (
    <div
      className={classes.dropdown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={classes.wishlist_btn}>
        <BiHeart size={30} />
      </button>
      {/* {showCard && (
        <Card className={classes.wishlist_card}>
          <div className={classes.wishlist}>Your wishlist is empty.</div>
          <div className={classes.wishlist_explore}>Explore Courses</div>
        </Card>
      )} */}
    </div>
  )
}
