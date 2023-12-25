import React from "react"
import styles from "./Favorite.module.css"
import { IoClose } from "react-icons/io5"

export default function Favorite({ onClose }) {
  return (
    <div className={styles.favorite}>
      <div className={styles.header}>
        <h1>Favorite</h1>
        <button className={styles.closeButton} onClick={onClose}>
          <IoClose />
        </button>
      </div>
      <div className={styles.content}>
        {/* Add your favorite content here */}
        <p>This is your favorite content.</p>
      </div>
    </div>
  )
}
