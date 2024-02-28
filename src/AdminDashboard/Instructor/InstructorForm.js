import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import styles from './InstructorForm.module.css';

const InstructorForm = () => {
  const [instructorName, setInstructorName] = useState('');
  const [instructorDescription, setInstructorDescription] = useState('');
  const [editorValue, setEditorValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [acceptedFiles, setAcceptedFiles] = useState([]);

  const dropzoneStyles = {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
  };

  const imagePreviewStyles = {
    marginTop: '10px',
    maxWidth: '200px',
  };

  const onDrop = (files) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);

    setAcceptedFiles(files);
  };


  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    onDropAccepted: (files) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      console.error('Please select an image before submitting.');
      return;
    }

    try {
    
      setLoading(true);
      const formData = new FormData();
      formData.append('image', acceptedFiles[0]);
      formData.append('instructorName', instructorName);
      formData.append('instructorDescription', editorValue);

      await axios.post('http://localhost:8000/upload-image', formData);
      Swal.fire({
        icon: 'success',
        title: 'Instructor Created!',
        text: 'Your instructor has been successfully created.',
      });
     
      setInstructorName('');
      setEditorValue('');
      setSelectedImage(null);
      setAcceptedFiles([]);

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error creating the instructor. Please try again.',
      });
    } finally {
      setLoading(false);
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

export default InstructorForm;