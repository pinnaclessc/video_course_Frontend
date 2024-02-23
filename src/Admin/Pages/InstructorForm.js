import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './InstructorData.module.css';


const InstructorData = () => {
  const [instructorName, setInstructorName] = useState('');
  const [instructorDescription, setInstructorDescription] = useState('');
  const [editorValue, setEditorValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const handleImageUpload = async () => {
    setLoading(true);

    try {
      // Your logic for image upload goes here
      console.log('Image uploading...');
    } catch (error) {
      console.error('Error uploading image:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Append form data including image, instructorName, and instructorDescription
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('instructorName', instructorName);
    formData.append('instructorDescription', editorValue);

    // You can append additional data if needed
    // formData.append('key', 'value');

    try {
      // Call the function to handle image upload along with additional data
      await handleImageUpload();

      // Add any additional form submission logic here if needed
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className={styles.inputContainer}>
          <label className={styles.label}>Instructor Name:</label>
          <input
            type="text"
            value={instructorName}
            onChange={(e) => setInstructorName(e.target.value)}
            className={styles.inputField}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Instructor Description:</label>
          <div className={styles.quillContainer}>
            <ReactQuill theme="snow" value={editorValue} onChange={setEditorValue} />
          </div>
        </div>

        <div className={`${styles.dropzoneContainer} ${styles.inputContainer}`} {...getRootProps()}>
          <input {...getInputProps()} />
          <p className={styles.dropzoneText}>Drag 'n' drop an image file here, or click to select file</p>
        </div>

        {selectedImage && (
          <div className={styles.imagePreviewContainer}>
            <img src={selectedImage} alt="Selected" className={styles.imagePreview} />
          </div>
        )}

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Uploading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default InstructorData;