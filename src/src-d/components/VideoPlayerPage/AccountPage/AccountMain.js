import React from "react"
import classes from "./AccountMain.module.css"
import Header from "../../VideoHeader/HeaderMain"
import SideMenu from "./SideMenu"

function AccountMain() {
  return (
    <div className={classes.main_container}>
      <Header />
      <div className={classes.Sidemain_container}>
        <SideMenu />
      </div>
    </div>
  )
}

export default AccountMain
