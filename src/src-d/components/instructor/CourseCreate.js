import React, { useState } from "react"
import CourseCreateForm from "../instructor/CourseCreate"
import Resizer from "react-image-file-resizer"
import { toast } from "react-toastify"

function CourseCreate() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    category: "",
    loading: false,
    imagePreview: "",
    imageUrl: "",
  })
  const [preview, setPreview] = useState(" ")
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image")

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values)
  }

  const handleImage = (e) => {
    let file = e.target.files[0]

    Resizer.imageFileResizer(
      file,
      720,
      500,
      "JPEG",
      100,
      0,
      (uri) => {
        try {
          let formData = new FormData()
          formData.append("image", uri)

          fetch("http://localhost:8000/api/course/create",{
            method: "POST",
            body: formData,
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok")
              }
              return response.json()
            })
            .then((data) => {
              console.log("Image uploaded successfully:", data)
            })
            .catch((error) => {
              console.error("Image upload failed:", error)
            })
        } catch (err) {
          console.error(err)
          toast("Image resize failed.. Try later.")
        }
      },
      "base64"
    )
  }

  return (
    <div className="courseCreate">
      <h1 className="heading">Create Course</h1>
      <div className="content">
        <CourseCreateForm
          values={values}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleImage={handleImage}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
        />
      </div>
      <pre>{JSON.stringify(values, null, 4)}</pre>
    </div>
  )
}

export default CourseCreate
