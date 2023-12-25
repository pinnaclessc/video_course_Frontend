import React, { useState } from "react"
import classes from "./EditPhoto.module.css"

function EditPhoto() {
  const [image, setImage] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setImage(null)
    }
  }

  return (
    <>
      <div className={classes.photo_container}>
        <div className={classes.photo_title}>
          <h3 className={classes.photo_heading}>Photo</h3>
          <h5 className={classes.photo_heading_text}>
            Add a nice photo of yourself for your profile
          </h5>
        </div>
        <hr />
        <div className={classes.input_heading}>
          <h5 className={classes.image_heading}>Image preview</h5>
          <div className={classes["Preview"]}>
            {image && (
              <div className={classes["preview-div"]}>
                <img
                  src={image}
                  alt="Uploaded preview"
                  style={{ maxWidth: "300px" }}
                  className={classes["preview-image"]}
                />
              </div>
            )}
          </div>
        </div>
        <div className={classes.upload_image}>
          <h5 className={classes.image_heading}>Add/Change Image</h5>
          <input
            type="text"
            // accept="image/*"
            onChange={handleImageChange}
            className={classes["file-input"]}
            placeholder="No file selected"
          />
          <button
            className={classes["upload_btn"]}
            type="file"
            accept="image/*"
          >
            upload image{" "}
          </button>
        </div>{" "}
        <button className={classes["save-btn"]}>Save</button>
      </div>
    </>
  )
}

export default EditPhoto
