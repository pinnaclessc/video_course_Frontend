import React from "react"
import styles from "./Footer.module.css"
import { BiGlobe, BiRightArrowAlt } from "react-icons/bi"
import { TfiYoutube } from "react-icons/tfi"
import { BsTelegram } from "react-icons/bs"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerColumns}>
        <div className={styles.footerColumn}>
          <div className={styles.footerRow}>About Us</div>
          <div className={styles.footerRow}>Download App</div>
          <div className={styles.footerRow}>Contact Us</div>
        </div>
        <div className={styles.footerColumn}>
          <div className={styles.footerRow}>Terms &amp; Conditions</div>
          <div className={styles.footerRow}>Privacy Policy</div>
          <div className={styles.footerRow}>Refund Policy</div>
        </div>
        <div className={styles.footerColumn}>
          <div className={styles.footerRow}>Printed Books</div>
          <div className={styles.footerRow}>Digital Books</div>
          <div className={styles.footerRow}>Test Portal</div>
        </div>
        <div className={styles.footerColumn}>
          <TfiYoutube className={styles.youtubeicon} size={25} />
          <div className={styles.footerRow}>YouTube Channel</div>
          <BsTelegram className={styles.telegramicon} size={25} />
          <div className={styles.footerRow}>Telegram Channel</div>
        </div>

        <div className={styles.footerColumnlast}>
          <BiGlobe className={styles.footerGlobeIcon} size={25} />
          <div className={styles.footerLanguage}>English</div>
        </div>
      </div>
      <div className={styles.footerCopyright}>
        <BiRightArrowAlt className={styles.footerCopyrightIcon} size={14} />
        <span>&copy; 2023 Pinnacle. All rights reserved.</span>
      </div>
    </footer>
  )
}

export default Footer
