import React, { useState } from 'react';
import styles from "./ImageUploadForm.module.css";

const ImageUploadForm = () => {
  const [images, setImages] = useState([]);
  const [language, setLanguage] = useState('hindi');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      setError('');
      setUploadProgress(0);
  
      const formData = new FormData();
      formData.append('language', language);
  
      images.forEach((image, index) => {
        formData.append('images', image);
      });
  
      const response = await fetch('http://localhost:8000/api/upload_images', {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });
  
      if (response.ok) {
        console.log('Images uploaded successfully');
      } else if (response.status === 409) {
        setError('File already exists');
      } else {
        console.error('Failed to upload images');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={styles.uploadContainer}>
      <h4>Upload Images</h4>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <label className={styles.languageLabel}>
        Select Language:
        <select className={styles.languageSelect} value={language} onChange={handleLanguageChange}>
          <option value="hindi">Hindi</option>
          <option value="english">English</option>
          {/* <option value="common">Common</option> */}
        </select>
      </label>
      <br/>
      <input className={styles.fileInput} type="file" accept="image/*" onChange={handleFileChange} multiple />
      <br/>
      <button className={styles.uploadButton} onClick={handleUpload} disabled={loading}>
        Upload Images
      </button>
      {loading && <div className={styles.uploadProgress}>Uploading... {uploadProgress}%</div>}
    </div>
  );
};

export default ImageUploadForm;
