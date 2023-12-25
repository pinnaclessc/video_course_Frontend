import React from "react"
import Card from "../../../BodyContent/Card/Card"
import styles from "./TextStylePopout.module.css"

const TextStylePopout = ({ onStyleChange }) => {
  const handleStyleChange = (style) => {
    onStyleChange(style)
  }

  return (
    <div className={styles.popout}>
      <Card className={styles.card}>
        <ul>
          <li onClick={() => handleStyleChange("normal")}>Normal Text</li>
          <li onClick={() => handleStyleChange("heading4")}>Heading 4</li>
        </ul>
      </Card>
    </div>
  )
}

export default TextStylePopout
