import React, { useState } from 'react';
import axios from 'axios';
import styles from './AddUserForm.module.css';

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Subscriber', // Set a default role
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your server to add a new user
      const response = await axios.post('http://localhost:8000/add-new-user', formData);

      console.log('User added successfully:', response.data);

      // Reset the form
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'Subscriber', // Reset the role
      });
    } catch (error) {
      console.error('Error adding user:', error.message);
    }
  };

  return (
    <form className={styles.addUserFormContainer} onSubmit={handleSubmit}>
    <label className={styles.addUserFormField}>
      Name:
      <input type="text" className={styles.addUserFormInput} name="name" value={formData.name} onChange={handleChange} />
    </label>
    <br />
    <label className={styles.addUserFormField}>
      Email:
      <input type="email" className={styles.addUserFormInput} name="email" value={formData.email} onChange={handleChange} />
    </label>
    <br />
    <label className={styles.addUserFormField}>
      Password:
      <input type="password" className={styles.addUserFormInput} name="password" value={formData.password} onChange={handleChange} />
    </label>
    <br />
    <label className={styles.addUserFormField}>
      Role:
      <select className={styles.addUserFormSelect} name="role" value={formData.role} onChange={handleChange}>
        <option value="Subscriber">Subscriber</option>
        <option value="Instructor">Instructor</option>
        <option value="Admin">Admin</option>
      </select>
    </label>
    <br />
    <button type="submit" className={styles.addUserFormButton}>Add User</button>
  </form>
  );
};

export default AddUserForm;
