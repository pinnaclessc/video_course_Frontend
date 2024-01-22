import React, { useState } from 'react';
import styles from './PdfEditModal.module.css';

const PdfEditModal = ({ pdf, onClose }) => {
  const [newData, setNewData] = useState({
   
    originalname: pdf.originalname,
    
  });

  const handleInputChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    
    console.log('Save PDF data:', newData);
    onClose();
  };

  return (
    <div className={styles.modal}>
      <h2>Edit PDF</h2>
      <label>
        Original Name:
        <input
          type="text"
          name="originalname"
          value={newData.originalname}
          onChange={handleInputChange}
        />
      </label>
     
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default PdfEditModal;
