import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Editor, EditorState, RichUtils, Modifier, convertToRaw, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import 'draft-js/dist/Draft.css';
import Swal from 'sweetalert2';
import styles from '../../AdminDashboard/Courses/CourseForm.module.css';
import { FaBold, FaItalic, FaUnderline, FaListOl, FaListUl, FaLink } from 'react-icons/fa';

const UpdateCourseForm = () => {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [urlValue, setUrlValue] = useState("");
  const [courseData, setCourseData] = useState({
    title: '',
    shortDescription: '',
    category: '',
    instructorName: '',
    price: '',
    mrp: '',
    SEOCode: '',
    longDescription: '',
    hindiCoverImage: null,
    englishCoverImage: null,
  });

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://13.200.156.92:8000/course/${id}`);
        const data = response.data;
        setCourseData({
          title: data.title,
          shortDescription: data.shortDescription,
          category: data.category,
          instructorName: data.instructorName,
          price: data.price,
          mrp: data.mrp,
          SEOCode: data.SEOCode,
          // Assume the long description is returned as a stringified ContentState
          longDescription: data.longDescription,
          // hindiCoverImage and englishCoverImage handling will depend on your API response and requirements
        });
        // Initialize the editor state with the long description if it exists
        if (data.longDescription) {
          const contentState = convertFromRaw(JSON.parse(data.longDescription));
          setEditorState(EditorState.createWithContent(contentState));
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Convert the editor state to a raw JS object, then stringify it for sending
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const longDescriptionString = JSON.stringify(rawContentState);
    courseData.longDescription = longDescriptionString;

    const formData = new FormData();
    Object.keys(courseData).forEach((key) => {
      if (key === 'hindiCoverImage' || key === 'englishCoverImage') {
        if (courseData[key]) formData.append(key, courseData[key], courseData[key].name);
      } else {
        formData.append(key, courseData[key]);
      }
    });

    try {
      await axios.put(`http://13.200.156.92:8000/course/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire('Success', 'Course updated successfully', 'success');
      // Optionally reset form or redirect
    } catch (error) {
      console.error('Error updating course:', error);
      Swal.fire('Error', 'Failed to update course', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handlers for rich text editor features, file drop, etc., would remain largely the same as in your CourseForm
  // You would also include the form JSX here, similar to CourseForm, using courseData to populate initial values

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={courseData.title} onChange={handleChange} required />
  
        <label>Short Description:</label>
        <textarea name="shortDescription" value={courseData.shortDescription} onChange={handleChange} required />
  
        <label>Category:</label>
        <select name="category" value={courseData.category} onChange={handleChange} required>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category.categoryTitle}>
              {category.categoryTitle}
            </option>
          ))}
        </select>
  
        <label>Instructor Name:</label>
        <select name="instructorName" value={courseData.instructorName} onChange={handleChange} required>
          <option value="">Select an instructor</option>
          {instructors.map((instructor) => (
            <option key={instructor._id} value={instructor.instructorName}>
              {instructor.instructorName}
            </option>
          ))}
        </select>
  
        <label>Long Description:</label>
        <div className={styles.editorContainer}>
          <Editor
            editorState={editorState}
            onChange={handleEditorChange}
            className={styles.editorStyle}
          />
        </div>
  
        <label>Hindi Cover Image:</label>
        <div  className={styles.dropzone}>
          <input  />
          <p>Drag 'n drop some files here, or click to select files</p>
        </div>
        {/* <div {...getRootPropsHindi()} className={styles.dropzone}>
          <input {...getInputPropsHindi()} />
          <p>Drag 'n drop some files here, or click to select files</p>
        </div> */}
        {courseData.hindiCoverImage && (
          <img src={URL.createObjectURL(courseData.hindiCoverImage)} alt="Hindi Cover" style={{ width: '200px', marginTop: '10px' }} />
        )}
  
        <label>English Cover Image:</label>
        <div className={styles.dropzone}>
          <input  />
          <p>Drag 'n drop some files here, or click to select files</p>
        </div>
        {/* <div {...getRootPropsEnglish()} className={styles.dropzone}>
          <input {...getInputPropsEnglish()} />
          <p>Drag 'n drop some files here, or click to select files</p>
        </div> */}
        {courseData.englishCoverImage && (
          <img src={URL.createObjectURL(courseData.englishCoverImage)} alt="English Cover" style={{ width: '200px', marginTop: '10px' }} />
        )}
  
        <label>SEO Code:</label>
        <input type="text" name="SEOCode" value={courseData.SEOCode} onChange={handleChange} required />
  
        <label>Price:</label>
        <input type="number" name="price" value={courseData.price} onChange={handleChange} required />
  
        <label>MRP:</label>
        <input type="number" name="mrp" value={courseData.mrp} onChange={handleChange} required />
  
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Updating...' : 'Update Course'}
        </button>
      </form>
    </div>
  );
  
};

export default UpdateCourseForm;
