import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Editor, EditorState, RichUtils, Modifier, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import 'draft-js/dist/Draft.css';
import Swal from 'sweetalert2';
import styles from './CourseForm.module.css';
import { FaBold, FaItalic, FaUnderline, FaListOl, FaListUl, FaLink } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const Course_UpdateForm = () => {
  const { courseId } = useParams();
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
    hindiCoverImage: null,
    englishCoverImage: null,
    longDescription: ''
  });

  useEffect(() => {
    const fetchCategoriesAndInstructors = async () => {
      try {
        const categoryResponse = await axios.get('https://videocoursebackend.ssccglpinnacle.com/categories');
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
      try {
        const instructorResponse = await axios.get('https://videocoursebackend.ssccglpinnacle.com/instructors');
        setInstructors(instructorResponse.data.instructors || []);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      }
    };

    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`https://videocoursebackend.ssccglpinnacle.com/course/${courseId}`);
        const data = response.data;
        setCourseData({
          title: data.title,
          shortDescription: data.shortDescription,
          category: data.category,
          instructorName: data.instructorName,
          price: data.price,
          mrp: data.mrp,
          SEOCode: data.SEOCode,
          longDescription: data.longDescription
        });
        if (data.longDescription) {
          const contentState = convertFromRaw(JSON.parse(data.longDescription));
          setEditorState(EditorState.createWithContent(contentState));
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCategoriesAndInstructors();
    fetchCourseData();
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleEditorChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onToggleStyle = (style) => {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  const onToggleBlockType = (blockType) => {
    handleEditorChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const onURLChange = (e) => setUrlValue(e.target.value);

  const confirmLink = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: urlValue });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    handleEditorChange(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
    setShowLinkInput(false);
    setUrlValue("");
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles, name) => {
      setCourseData({ ...courseData, [name]: acceptedFiles[0] });
    }
  });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData();
//     Object.keys(courseData).forEach((key) => {
//       if (key === 'hindiCoverImage' || key === 'englishCoverImage') {
//         if (courseData[key]) formData.append(key, courseData[key], courseData[key].name);
//       } else if (key !== 'longDescription') {
//         formData.append(key, courseData[key]);
//       }
//     });
//     // Append longDescription in its raw format
//     formData.append('longDescription', JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    
//     try {
//     //   await axios.post(`https://videocoursebackend.ssccglpinnacle.com/update-course/${courseId}`, formData, {
//         await axios.post(`http://localhost:8000/vc/updateCourse/${courseId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       Swal.fire('Success', 'Course updated successfully', 'success');
//     } catch (error) {
//       console.error('Error updating course:', error);
//       Swal.fire('Error', 'Failed to update course', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
  
//     // Log course data and longDescription before submitting
//     console.log("Submitting the following course data:", courseData);
//     console.log("Long Description (Raw Format):", JSON.stringify(convertToRaw(editorState.getCurrentContent())));
  
//     const formData = new FormData();
//     Object.keys(courseData).forEach((key) => {
//       if (key === 'hindiCoverImage' || key === 'englishCoverImage') {
//         if (courseData[key]) formData.append(key, courseData[key], courseData[key].name);
//       } else if (key !== 'longDescription') {
//         formData.append(key, courseData[key]);
//       }
//     });
//     // Append longDescription in its raw format
//     formData.append('longDescription', JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    
//     try {
//       await axios.post(`http://localhost:8000/vc/updateCourse/${courseId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       Swal.fire('Success', 'Course updated successfully', 'success');
//     } catch (error) {
//       console.error('Error updating course:', error);
//       Swal.fire('Error', 'Failed to update course', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };


const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.keys(courseData).forEach((key) => {
      if (key === 'hindiCoverImage' || key === 'englishCoverImage') {
        if (courseData[key]) formData.append(key, courseData[key], courseData[key].name);
      } else {
        formData.append(key, courseData[key]);
      }
    });
    
    try {
      await axios.put(`http://localhost:8000/vc/updateCourse/${courseId}`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire('Success', 'Course updated successfully', 'success');
    } catch (error) {
      console.error('Error updating course:', error);
      Swal.fire('Error', 'Failed to update course', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.courseForm}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={courseData.title}
          onChange={handleChange}
          required
        />
  
        <label>Short Description:</label>
        <textarea
          name="shortDescription"
          value={courseData.shortDescription}
          onChange={handleChange}
          required
        />
  
        <label>Long Description:</label>
        <div className={styles.toolbar}>
          <button type="button" onClick={() => onToggleStyle('BOLD')}><FaBold /></button>
          <button type="button" onClick={() => onToggleStyle('ITALIC')}><FaItalic /></button>
          <button type="button" onClick={() => onToggleStyle('UNDERLINE')}><FaUnderline /></button>
          <button type="button" onClick={() => onToggleBlockType('ordered-list-item')}><FaListOl /></button>
          <button type="button" onClick={() => onToggleBlockType('unordered-list-item')}><FaListUl /></button>
          <button type="button" onClick={() => setShowLinkInput(!showLinkInput)}><FaLink /></button>
          {/* Add more styling and block type buttons as needed */}
        </div>
        {showLinkInput && (
          <div>
            <input type="text" onChange={onURLChange} value={urlValue} placeholder="Enter a URL" />
            <button onClick={confirmLink}>Confirm</button>
          </div>
        )}
        <div className={styles.editorContainer}>
          <Editor
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={handleEditorChange}
          />
        </div>
  
        <label>Category:</label>
        <select
          name="category"
          value={courseData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category.categoryTitle}>
              {category.categoryTitle}
            </option>
          ))}
        </select>
  
        <label>Instructor Name:</label>
        <select
          name="instructorName"
          value={courseData.instructorName}
          onChange={handleChange}
          required
        >
          <option value="">Select an instructor</option>

          {instructors.map((instructor) => (
            <option key={instructor._id} value={instructor.instructorName}>
              {instructor.instructorName}
            </option>
          ))}
        </select>
  
        <label>Hindi Cover Image:</label>
        <div {...getRootProps()} className={styles.dropzone}>
          <input {...getInputProps()} name="hindiCoverImage" />
          <p>Drag 'n drop Hindi cover image here, or click to select files</p>
        </div>
        {courseData.hindiCoverImage && (
          <img
            src={URL.createObjectURL(courseData.hindiCoverImage)}
            alt="Hindi Cover"
            style={{ width: '200px', marginTop: '10px' }}
          />
        )}
  
        <label>English Cover Image:</label>
        <div {...getRootProps()} className={styles.dropzone}>
          <input {...getInputProps()} name="englishCoverImage" />
          <p>Drag 'n drop English cover image here, or click to select files</p>
        </div>
        {courseData.englishCoverImage && (
          <img
            src={URL.createObjectURL(courseData.englishCoverImage)}
            alt="English Cover"
            style={{ width: '200px', marginTop: '10px' }}
          />
        )}
  
        <label>SEO Code:</label>
        <input
          type="text"
          name="SEOCode"
          value={courseData.SEOCode}
          onChange={handleChange}
          required
        />
  
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={courseData.price}
          onChange={handleChange}
          required
        />
  
        <label>MRP:</label>
        <input
          type="number"
          name="mrp"
          value={courseData.mrp}
          onChange={handleChange}
          required
        />
  
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Updating...' : 'Update Course'}
        </button>
      </form>
    </div>
  );
  
};

export default Course_UpdateForm;