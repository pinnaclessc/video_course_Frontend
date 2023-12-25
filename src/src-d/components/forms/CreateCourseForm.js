import React from "react"
import { Select, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { Avatar } from "antd"
import "./CourseCreateForm.css"

const { Option } = Select

const CourseCreateForm = ({
  handleSubmit,
  handleImage,
  handleChange,
  values,
  setValues,
  preview,
  uploadButtonText,
}) => {
  const children = []
  for (let i = 9.99; i <= 100.99; i++) {
    children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>)
  }
  return (
    <form onSubmit={handleSubmit} className="course-create-form">
      <div className="form-group">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </div>

      <div className="textarea-group">
        <textarea
          name="description"
          cols="30"
          rows="5"
          value={values.description}
          className="form-control"
          onChange={handleChange}
          placeholder="Description"
        ></textarea>
      </div>

      <div className="form-group">
        <Select
          style={{ width: "100%" }}
          size="large"
          value={values.paid.toString()}
          onChange={(v) => setValues({ ...values, paid: v === "true" })}
        >
          <Option value="true">Paid</Option>
          <Option value="false">Free</Option>
        </Select>
      </div>

      {values.paid && (
        <div className="form-group">
          <Select
            defaultValue="$9.99"
            style={{ width: "100%" }}
            onChange={(v) => setValues({ ...values, price: v })}
            tokenSeparators={[,]}
            size="large"
          >
            {children}
          </Select>
        </div>
      )}

      <div className="form-group">
        <input
          type="text"
          name="category"
          className="form-control"
          placeholder="Category"
          value={values.category}
          onChange={handleChange}
        />
      </div>

      <div className="form-group upload-btn-wrapper">
        <label className="btn-upload">
          {uploadButtonText} <UploadOutlined />
          <input
            type="file"
            name="image"
            onChange={handleImage}
            accept="image/*"
            className="file-input"
          />
        </label>
      </div>

      {preview && <Avatar className="avatar-preview" src={preview} />}

      <Button
        onClick={handleSubmit}
        disabled={values.loading || values.uploading}
        className="submit-button"
        loading={values.loading}
        type="primary"
        size="large"
        shape="round"
        icon={<UploadOutlined />}
      >
        {values.loading ? "Saving..." : "Save & Continue"}
      </Button>
    </form>
  )
}

export default CourseCreateForm
