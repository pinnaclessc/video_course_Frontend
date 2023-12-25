import React, { useState } from "react"
import classes from "./Account.module.css"
import Card from "../BodyContent/Card/Card"
import { BsGlobe } from "react-icons/bs"
import { Link } from "react-router-dom"
import { MdAccountCircle } from "react-icons/md"
function Account() {
  const [showCard, setShowCard] = useState(false)
  const [showAccountSettings, setShowAccountSettings] = useState(false)

  const handleMouseEnter = () => {
    setShowCard(true)
  }

  const handleMouseLeave = () => {
    setShowCard(false)
  }
  const AccountSettingHandler = () => {
    setShowAccountSettings(!showAccountSettings)
  }
  return (
    <>
      <div
        className={classes.dropdown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className={classes.account_btn}>
          <div className={classes.account_icon_head}>
            <div className={classes.account_para1}>DA</div>
          </div>
        </button>
        {showCard && (
          <Card className={classes.account_container}>
            <div className={classes.accountsection}>
              <ul className={classes.unordered_list}>
                <Link to="/edit/account-settings">
                  <li className={classes.list}>
                    <div className={classes.account_icon}>
                      <div className={classes.account_para}>DA</div>
                    </div>
                    <div className={classes.user}>
                      Deepa Arya
                      <div className={classes.user_email}>
                        deepaaryassccgl.pinnacle.com
                      </div>
                    </div>
                  </li>
                </Link>
              </ul>
            </div>
            <hr />
            <ul className={classes.unordered_list1}>
              <Link to="/">
                <li className={classes.list1}>My learning</li>
              </Link>
              <Link to="/mylearning/cart">
                <li className={classes.list1}>My Cart</li>
              </Link>
              <Link to="/mylearning/wishlist">
                <li className={classes.list1}>Wishlist</li>
              </Link>
            </ul>
            <hr />
            <ul className={classes.unordered_list2}>
              <Link to="/mylearning/notification">
                <li className={classes.list2}>Notification</li>
              </Link>
              <Link to="/user/messages">
                {" "}
                <li className={classes.list2}>Messages</li>
              </Link>
            </ul>
            <hr />
            <ul className={classes.unordered_list3}>
              <Link to="/edit/account-settings">
                <li className={classes.list3}>Account settings</li>
              </Link>
              <Link to="/user/edit-payment-methods">
                <li className={classes.list3}>Payment methods</li>
              </Link>
              <Link to="/user/manage-subscriptions">
                <li className={classes.list3}>Subscriptions</li>
              </Link>
              <li className={classes.list3}>Pinnacle Credits</li>
              <li className={classes.list3}>Purchase History</li>
            </ul>
            <hr />
            <div className={classes.lang}>
              <span>Language</span>
              <span className={classes.lang_name}>English</span>
              <div className={classes.lang_icon}>
                <BsGlobe size={18} />
              </div>
            </div>
            <hr />
            <ul className={classes.unordered_list4}>
              <li className={classes.list4}>Public Profile</li>
              <li className={classes.list4}>Edit Profile</li>
            </ul>
            <hr />
            <ul className={classes.unordered_list5}>
              <li className={classes.list5}>Help</li>
              <li className={classes.list5}>Log out</li>
            </ul>
          </Card>
        )}
      </div>
    </>
  )
}

export default Account
