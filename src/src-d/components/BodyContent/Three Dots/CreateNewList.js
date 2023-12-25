import React, { useState } from "react"
import classes from "./CreateNewList.module.css"
import { MdClose } from "react-icons/md"

function CreateNewList({ onClose, onListCreate }) {
  const [isCreateList, setIsCreateList] = useState(false)
  const [listName, setListName] = useState("")
  const [listDescription, setListDescription] = useState("")

  const handleClose = () => {
    setIsCreateList(!isCreateList)
  }

  const handleCreateList = () => {
    const newList = {
      name: listName,
      description: listDescription,
    }
    onListCreate(newList)
    onClose()
  }

  return (
    <div className={classes.backdrop}>
      <div className={classes.content}>
        <div className={classes.newlist_container}>
          <div className={classes.title_page}>
            <h3 className={classes.heading}>Create new List</h3>
            <span className={classes.icon_container}>
              <MdClose
                className={classes.cancel_icon}
                onClick={onClose}
                size={20}
              />
            </span>
          </div>
          <div className={classes.list_name}>
            <input
              className={classes.input_name}
              type="text"
              placeholder="Name your list e.g current affairs"
            />
          </div>
          <div className={classes.list_des}>
            <input
              className={classes.input_des}
              type="text"
              placeholder="Why are you creating this list? e.g To get a new job, To become a govt. employee"
            />
          </div>
          <div className={classes.list_buttons}>
            <button className={classes.cancel_btn} onClick={onClose}>
              Cancel
            </button>
            <button className={classes.create_btn} onClick={handleCreateList}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNewList
