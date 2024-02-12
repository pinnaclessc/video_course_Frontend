// CategoryForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Category.module.css';

const CategoryForm = () => {
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post('http://localhost:5000/categories', {
        categoryTitle,
      });

      fetchCategories();
      setCategoryTitle('');
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <label>
          Category Title :
          <input
            type="text"
            value={categoryTitle}
            onChange={(e) => setCategoryTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Uploading...' : 'Submit'}
        </button>
      </form>

      <div className={styles.tableContainer}>
        <h2>Categories</h2>
        <table>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Title</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>{category.categoryTitle}</td>
                <td>{new Date(category.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryForm;
