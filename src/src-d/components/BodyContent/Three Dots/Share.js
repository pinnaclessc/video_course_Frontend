import React, { useState } from "react"
import styles from "./Share.module.css"
import data from "./shareData.json"

import { SiGooglemessages } from "react-icons/si"
import { BsTelegram, BsWhatsapp, BsFacebook } from "react-icons/bs"
import { MdClose } from "react-icons/md"

const Share = ({ onClose }) => {
  const [inputValue, setInputValue] = useState(data.inputValue)
  const handleCopy = () => {
    navigator.clipboard.writeText(inputValue)
  }
  const handleShareMessage = () => {
    console.log("Sharing on Message:", inputValue)
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.heading}>
            Share This Course
            <span>
              <MdClose
                className={styles.close_icon}
                size={20}
                onClick={onClose}
              />
            </span>
          </div>
          <div className={styles["input-copy-container"]}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className={styles.input_email}
            />
            <button onClick={handleCopy} className={styles.copyButton}>
              Copy
            </button>
          </div>
          <div className={styles.shareButtons}>
            <button onClick={handleShareMessage} className={styles.shareButton}>
              <SiGooglemessages size={20} />
            </button>
            <a
              href={`https://t.me/share?url=${inputValue}`}
              target="blank"
              className={styles.shareButton}
            >
              <BsTelegram size={20} />
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${inputValue}`}
              target="blank"
              className={styles.shareButton}
            >
              <BsWhatsapp size={20} />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${inputValue}`}
              target="blank"
              className={styles.shareButton}
            >
              <BsFacebook size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Share
