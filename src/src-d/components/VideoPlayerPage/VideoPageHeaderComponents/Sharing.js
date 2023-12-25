import React, { useState } from "react"
import styles from "./Share.module.css"
import data from "./shareData.json"
import { RxCross2 } from "react-icons/rx"

import { SiGooglemessages } from "react-icons/si"
import { BsTelegram, BsWhatsapp, BsFacebook } from "react-icons/bs"

const Share = ({ onClose }) => {
  const [inputValue, setInputValue] = useState(data.inputValue)
  const [copytext, setCopytext] = useState("")
  const [isShowCopy, setIsShowCopy] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(inputValue)
    setCopytext(`Copied!`)
    setIsShowCopy(true)
    setTimeout(() => {
      setIsShowCopy(false)
    }, 1000)
  }
  const handleClose = () => {
    onClose()
  }
  const handleShareMessage = () => {
    console.log("Sharing on Message:", inputValue)
  }
  return (
    <>
      <div className={styles.backdrop}>
        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.heading_container}>
              <div className={styles.heading}>Share This Course</div>
              <div className={styles.close_icon} onClick={handleClose}>
                <RxCross2 />
              </div>
            </div>
            <div className={styles["input-copy-container"]}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={styles.text_input}
              />
              <button onClick={handleCopy} className={styles.copyButton}>
                Copy
              </button>
              <div className={styles.showcopyButton}>
                {isShowCopy ? <div> &nbsp;&#10003; {copytext}</div> : null}
              </div>
            </div>
            <div className={styles.shareButtons}>
              <button
                onClick={handleShareMessage}
                className={styles.shareButton}
              >
                <SiGooglemessages />
              </button>

              <a
                href={`https://t.me/share?url=${inputValue}`}
                target="blank"
                className={styles.shareButton}
              >
                <BsTelegram />
              </a>

              <a
                href={`https://api.whatsapp.com/send?text=${inputValue}`}
                target="blank"
                className={styles.shareButton}
              >
                <BsWhatsapp />
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${inputValue}`}
                target="blank"
                className={styles.shareButton}
              >
                <BsFacebook />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Share
