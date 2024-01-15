import React, { useState } from 'react';

const TopicForm = () => {
  const [formData, setFormData] = useState({
    videoTitle: '',
    videoUrl: '',
    pdfTitle: '',
    pdfUrl: '',
    completed: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server or perform other actions
    console.log('Form data submitted:', formData);
    // Reset the form if needed
    setFormData({
      videoTitle: '',
      videoUrl: '',
      pdfTitle: '',
      pdfUrl: '',
      completed: [],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Video Title:
        <input
          type="text"
          name="videoTitle"
          value={formData.videoTitle}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Video URL:
        <input
          type="text"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        PDF Title:
        <input
          type="text"
          name="pdfTitle"
          value={formData.pdfTitle}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        PDF URL:
        <input
          type="text"
          name="pdfUrl"
          value={formData.pdfUrl}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TopicForm;
