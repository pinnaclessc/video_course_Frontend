import React, { useState, useRef, useEffect } from "react"
import TextStylePopout from "./TextStylePopout"
import Card from "../../../BodyContent/Card/Card"
import {
  MdOutlineFormatListNumbered,
  MdFormatListBulleted,
} from "react-icons/md"
import styles from "./Notes.module.css"

const NotesEditor = () => {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState("")
  const [editIndex, setEditIndex] = useState(-1)
  const [showTextStylePopout, setShowTextStylePopout] = useState(false)
  const [isCardOpen, setIsCardOpen] = useState(false)
  const [listType, setListType] = useState("unordered")
  const [isNormalText, setIsNormalText] = useState(false)
  const [isHeading, setIsHeading] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isBulleted, setIsBulleted] = useState(false)
  const [isNumbered, setIsNumbered] = useState(false)
  const [isLecturesCardOpen, setIsLecturesCardOpen] = useState(false)
  const [isSortCardOpen, setIsSortCardOpen] = useState(false)

  const handleLecturesClick = () => {
    setIsLecturesCardOpen((prev) => !prev)
    setIsSortCardOpen(false)
  }

  const handleSortClick = () => {
    setIsSortCardOpen((prev) => !prev)
    setIsLecturesCardOpen(false)
  }

  const handleStyleChange = (style) => {
    setShowTextStylePopout(false)
    if (style === "normal" || style === "heading4") {
      setCurrentNote(`<${style}>${currentNote}</${style}>`)
    }
  }

  const handleNoteChange = (event) => {
    setCurrentNote(event.target.value)
  }

  const addNote = () => {
    if (currentNote.trim() !== "") {
      if (editIndex !== -1) {
        const updatedNotes = [...notes]
        updatedNotes[editIndex] = currentNote
        setNotes(updatedNotes)
        setEditIndex(-1)
      } else {
        setNotes([...notes, currentNote])
      }
      setCurrentNote("")
    }
  }

  const editNote = (index) => {
    setCurrentNote(notes[index])
    setEditIndex(index)
  }

  const deleteNote = (index) => {
    const updatedNotes = [...notes]
    updatedNotes.splice(index, 1)
    setNotes(updatedNotes)
  }
  const handleNormalTextClick = () => {
    setIsNormalText(true)
    setIsHeading(false)
    setIsCardOpen(false)
  }

  const handleHeadingClick = () => {
    setIsHeading(true)
    setIsNormalText(false)
    setIsCardOpen(false)
  }
  const handleBoldClick = () => {
    setIsBold(!isBold)
  }

  const handleItalicClick = () => {
    setIsItalic(!isItalic)
  }

  const handleNumberedClick = () => {
    setListType("numbered")
    setIsBulleted(false)
  }

  const handleBulletedClick = () => {
    setListType("bulleted")
    setIsNumbered(false)
  }
  const handleQuoteClick = () => {
    setCurrentNote("")
    setIsNormalText(false)
    setIsHeading(false)
    setIsCardOpen(false)
  }

  const cardRef = useRef(null)

  return (
    <div className={styles.notesEditor}>
      <div className={styles.navbar}>
        <li
          className={styles.notes_list}
          onClick={() => setIsCardOpen((prev) => !prev)}
        >
          Select
          {isCardOpen && (
            <Card ref={cardRef} className={styles.select_card}>
              <ul className={styles.select_card_popup}>
                <li onClick={handleNormalTextClick}>Normal Text</li>
                <li onClick={handleHeadingClick}>Heading 4</li>
                <li onClick={handleQuoteClick}>Quote</li>
              </ul>
            </Card>
          )}
        </li>
        <li className={styles.notes_list} onClick={handleBoldClick}>
          <b>B</b>
        </li>
        <li className={styles.notes_list} onClick={handleItalicClick}>
          <i>I</i>
        </li>

        <li className={styles.notes_list} onClick={handleNumberedClick}>
          <MdOutlineFormatListNumbered size={20} />
        </li>
        <li className={styles.notes_list} onClick={handleBulletedClick}>
          <MdFormatListBulleted size={20} />
        </li>
      </div>

      <h2>Notes Editor</h2>
      <div>
        <textarea
          className={`${styles.notes} ${
            isNormalText ? styles.normalText : ""
          } ${isBold ? styles.bold : ""} ${isItalic ? styles.italic : ""} ${
            isNumbered ? styles.numbered : isBulleted ? styles.bulleted : ""
          }`}
          id="notes"
          name="notes"
          value={currentNote}
          onChange={handleNoteChange}
          style={isHeading ? { fontSize: "24px" } : {}}
        />
        <button className={styles.addButton} onClick={addNote}>
          {editIndex !== -1 ? "Update Note" : "Save Note"}
        </button>
      </div>
      <ul className={styles.notesList}>
        {notes.map((note, index) => (
          <li key={index}>
            {note}
            <button
              className={styles.editButton}
              onClick={() => editNote(index)}
            >
              Edit
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => deleteNote(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.lecture_main}>
        <div className={styles.lecture_container}>
          <li className={styles.lectures_list} onClick={handleLecturesClick}>
            All Lectures
            {isLecturesCardOpen && (
              <Card ref={cardRef} className={styles.lectures_card}>
                <ul className={styles.lectures_card_popup}>
                  <li onClick={handleNormalTextClick}> All lectures</li>
                  <li onClick={handleHeadingClick}>Current lectures</li>
                </ul>
              </Card>
            )}
          </li>
        </div>
        <div className={styles.sort_main}>
          <li className={styles.sort_list} onClick={handleSortClick}>
            Sort
            {isSortCardOpen && (
              <Card ref={cardRef} className={styles.sort_card}>
                <ul className={styles.sort_card_popup}>
                  <li onClick={handleNormalTextClick}>Sort by most recent</li>
                  <li onClick={handleHeadingClick}>Sort by oldest</li>
                </ul>
              </Card>
            )}
          </li>
        </div>
      </div>
    </div>
  )
}

export default NotesEditor
