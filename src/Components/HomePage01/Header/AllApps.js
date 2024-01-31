import React, { useState } from "react"
import Card from "./Card/Card"
import { GrApps } from "react-icons/gr"
import classes from "./AllApps.module.css"
import appsData from "./appsData.json"

export default function AllApps() {
  const [showCard, setShowCard] = useState(false)

  const handleIconClick = () => {
    setShowCard(!showCard)
  }

  return (
    <div className={classes.dropdown}>
      <button className={classes.cart_btn} onClick={handleIconClick}>
        <GrApps size={30} />
      </button>
      {showCard && (
        <Card className={classes.Cart_card}>
          {appsData.map((app) => (
            <div key={app.id} className={classes.cart_app_container}>
              <div className={classes.cart_app_image}>
                <img src={app.iconUrl} height={25} width={25} alt={app.title} />
              </div>
              <div className={classes.cart_app_para}>{app.title}</div>
            </div>
          ))}
        </Card>
      )}
    </div>
  )
}
