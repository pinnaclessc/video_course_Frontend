import React, { useState } from "react"
import classes from "./SideMenu.module.css"
import { Link } from "react-router-dom"
import PinnacleProfile from "./PublicProfile"
import EditPhoto from "./EditPhoto"
import Privacy from "./Privacy"
import Subscriptions from "./Subscriptions"
import PaymentMethod from "./PaymentMethod"
import AccountClose from "./AccountClose"
import AccountSecurity from "./AccountSecurity"
import AccountNotification from "./AccountNotification"
function SideMenu() {
  const [showPublicProfile, setShowPublicProfile] = useState()
  const [showProfile, setShowProfile] = useState(true)
  const [showEditPhoto, setShowEditPhoto] = useState()
  const [showAccountSettings, setShowAccountSettings] = useState()
  const [showSubscription, setShowSubscription] = useState()
  const [showPrivacy, setShowPrivacy] = useState()
  const [showNotification, setNotification] = useState()
  const [showCloseAccount, setShowCloseAccount] = useState()
  const [showPaymentMethod, setShowPaymentMethod] = useState()

  const PublicProfileHandler = () => {
    setShowPrivacy(false)
    setNotification(false)
    setShowCloseAccount(false)
    setShowSubscription(false)
    setShowPublicProfile(true)
    setShowAccountSettings(false)
    setShowEditPhoto(false)
    setShowProfile(false)
    setShowPaymentMethod(false)
  }
  const ProfileHandler = () => {
    setShowPrivacy(false)
    setNotification(false)
    setShowCloseAccount(false)
    setShowSubscription(false)
    setShowPublicProfile(false)
    setShowAccountSettings(false)
    setShowEditPhoto(false)
    setShowProfile(true)
    setShowPaymentMethod(false)
  }
  const PhotoHandler = () => {
    setShowPrivacy(false)
    setNotification(false)
    setShowCloseAccount(false)
    setShowSubscription(false)
    setShowPublicProfile(false)
    setShowAccountSettings(false)
    setShowEditPhoto(true)
    setShowProfile(false)
    setShowPaymentMethod(false)
  }
  const AccountSecurityHandler = () => {
    setShowPrivacy(false)
    setNotification(false)
    setShowCloseAccount(false)
    setShowSubscription(false)
    setShowPublicProfile(false)
    setShowAccountSettings(true)
    setShowEditPhoto(false)
    setShowProfile(false)
    setShowPaymentMethod(false)
  }
  const SubscriptionHandler = () => {
    setShowPrivacy(false)
    setNotification(false)
    setShowCloseAccount(false)
    setShowSubscription(true)
    setShowPublicProfile(false)
    setShowAccountSettings(false)
    setShowEditPhoto(false)
    setShowProfile(false)
    setShowPaymentMethod(false)
  }
  const PrivacyHandler = () => {
    setShowPrivacy(true)
    setNotification(false)
    setShowCloseAccount(false)
    setShowSubscription(false)
    setShowPublicProfile(false)
    setShowAccountSettings(false)
    setShowEditPhoto(false)
    setShowProfile(false)
    setShowPaymentMethod(false)
  }
  const NotificationHandler = () => {
    setShowPrivacy(false)
    setNotification(true)
    setShowSubscription(false)
    setShowPublicProfile(false)
    setShowAccountSettings(false)
    setShowEditPhoto(false)
    setShowProfile(false)
    setShowPaymentMethod(false)
  }
  const CloseAccountHandler = () => {
    setShowPrivacy(false)
    setNotification(false)
    setShowCloseAccount(true)
    setShowSubscription(false)
    setShowPublicProfile(false)
    setShowAccountSettings(false)
    setShowEditPhoto(false)
    setShowProfile(false)
    setShowPaymentMethod(false)
  }
  const PaymentMethodHandler = () => {
    setShowPrivacy(false)
    setNotification(false)
    setShowCloseAccount(false)
    setShowSubscription(false)
    setShowPublicProfile(false)
    setShowAccountSettings(false)
    setShowEditPhoto(false)
    setShowProfile(false)
    setShowPaymentMethod(true)
  }

  return (
    <div className={classes.menu_main_container}>
      <div className={classes.menu_top}>
        <button className={classes.account_btn}>
          <div className={classes.account_icon_head}>
            <div className={classes.account_para1}>DA</div>
          </div>
        </button>
        <div className={classes.list_name}>Deepa Arya</div>
      </div>
      <ul className={classes.unordered_list}>
        {/* <Link to="/user/username"> */}
        <li
          className={classes.list_public_profile}
          onClick={PublicProfileHandler}
        >
          View Public Profile
        </li>
        {/* </Link> */}
        {/* <Link to="/user/username"> */}
        <li className={classes.list_profile} onClick={ProfileHandler}>
          {" "}
          Profile
        </li>
        {/* </Link> */}
        {/* <Link to="/user/edit-photo"> */}
        <li className={classes.list_photo} onClick={PhotoHandler}>
          Photo
        </li>
        {/* </Link> */}
        {/* // <Link to="/user/edit-account"> */}
        <li className={classes.list_settings} onClick={AccountSecurityHandler}>
          Account Security
        </li>
        {/* </Link> */}
        {/* <Link to="/user/manage-subscriptions"> */}
        <li className={classes.list_subscription} onClick={SubscriptionHandler}>
          Subscriptions
        </li>
        {/* </Link> */}
        {/* <Link to="/user/edit-payment-methods"> */}
        <li className={classes.list_payment} onClick={PaymentMethodHandler}>
          Payment methods
        </li>
        {/* </Link> */}
        {/* <Link to="/user/edit-privacy"> */}
        <li className={classes.list_privacy} onClick={PrivacyHandler}>
          Privacy
        </li>
        {/* </Link> */}
        {/* <Link to="/user/edit-notifications"> */}
        <li className={classes.list_notification} onClick={NotificationHandler}>
          Notifications
        </li>
        {/* </Link> */}
        {/* <Link to="/user/close-account"> */}
        <li className={classes.close_account} onClick={CloseAccountHandler}>
          Close Account
        </li>
        {/* </Link> */}
        <div className={classes.container2}>
          {showPublicProfile && <PinnacleProfile />}
          {showProfile && <PinnacleProfile />}
          {showEditPhoto && <EditPhoto />}
          {showSubscription && <Subscriptions />}
          {showAccountSettings && <AccountSecurity />}
          {showPrivacy && <Privacy />}
          {showNotification && <AccountNotification />}
          {showCloseAccount && <AccountClose />}
          {showPaymentMethod && <PaymentMethod />}
        </div>{" "}
      </ul>
    </div>
  )
}

export default SideMenu
