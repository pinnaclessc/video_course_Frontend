import React, { useState } from "react"
import Card from "../BodyContent/Card/Card"
import { BsCart3 } from "react-icons/bs"
import classes from "./Cart.module.css"

export default function Cart() {
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
      <button className={classes.cart_btn}>
        <BsCart3 size={30} />
      </button>
      {showCard && (
        <Card className={classes.Cart_card}>
          <div className={classes.cart}>Your cart is empty.</div>
          <div className={classes.cart_shopping}>Keep Shopping</div>
        </Card>
      )}
    </div>
  )
}
