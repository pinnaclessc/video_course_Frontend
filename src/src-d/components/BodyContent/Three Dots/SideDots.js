import React, { useState } from "react"
import Card from "../Card/Card"
import styles from "./SideDots.module.css"
import Share from "./Share"
import Favorite from "./Favorite"
import Archieve from "./Archieve"
import CreateNewList from "./CreateNewList"
import { IoMdAdd } from "react-icons/io"
import { AiFillStar } from "react-icons/ai"
import { IoMdArchive, IoIosShareAlt } from "react-icons/io"

function SideDots({ isOpen }) {
  const [shareOption, setShareOption] = useState(false)
  const [createListOption, setCreateListOption] = useState(false)
  const [favoriteOption, setFavoriteOption] = useState(false)
  const [archiveOption, setArchiveOption] = useState(false)
  const [newListInput, setNewListInput] = useState()
  const [isCreateListOpen, setIsCreateListOpen] = useState(false)
  const [userLists, setUserLists] = useState([])

  const handleCreateListOpen = () => {
    setIsCreateListOpen(true)
  }

  const handleListCreate = (newList) => {
    setUserLists([...userLists, newList])
  }

  const handleShareClick = () => {
    setShareOption(!shareOption)
  }

  const handleCreateListClick = () => {
    setCreateListOption(!createListOption)
  }

  const handleFavoriteClick = () => {
    setFavoriteOption(!favoriteOption)
  }

  const handleArchiveClick = () => {
    setArchiveOption(!archiveOption)
  }
  const handleNewListInputChange = (event) => {
    setNewListInput(event.target.value)
  }
  const handleCloseCreateList = () => {
    setCreateListOption(false)
  }

  const handleCloseShare = () => {
    setShareOption(false)
  }

  return (
    <>
      {isOpen && (
        <Card className={styles.dropdownCard}>
          {userLists.map((list, index) => (
            <div key={index}>{list.name}</div>
          ))}
          <hr />
          <ul className={styles.itemList}>
            <li className={styles.itemList1} onClick={handleShareClick}>
              <IoIosShareAlt size={20} /> Share
            </li>
            <li className={styles.itemList1} onClick={handleCreateListClick}>
              <IoMdAdd size={20} /> Create New List
            </li>

            <li className={styles.itemList1} onClick={handleFavoriteClick}>
              <AiFillStar size={20} /> Favorite
            </li>
            <li className={styles.itemList1} onClick={handleArchiveClick}>
              <IoMdArchive size={20} /> Archive
            </li>
          </ul>
          <div className={styles.list_container_execution}>
            {shareOption && <Share onClose={handleCloseShare} />}
            {createListOption && (
              <CreateNewList
                onClose={handleCloseCreateList}
                onListCreate={handleListCreate}
              />
            )}
            {favoriteOption && <Favorite />}
            {archiveOption && <Archieve />}
          </div>
        </Card>
      )}
    </>
  )
}

export default SideDots
