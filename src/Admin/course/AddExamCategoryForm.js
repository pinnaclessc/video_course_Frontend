import React, { useState } from 'react';
import styles from './AddExamCategoryForm.module.css';

const AddExamCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/add-category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryName }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Success:', data);
      setCategoryName(''); // Reset the input field after successful submission
      // Optionally, alert the user or display a message about the successful addition
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formField}>
        <label htmlFor="categoryName" className={styles.label}>
          Exam Category Name:
        </label>
        <input
          type="text"
          id="categoryName"
          name="categoryName"
          value={categoryName}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Add Category
      </button>
    </form>
  );
};

export default AddExamCategoryForm;

