// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import styles from './Category.module.css';

// const CourseForm = () => {
//   const [editorValue, setEditorValue] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [instructors, setInstructors] = useState([]);
//   const [selectedHindiImage, setSelectedHindiImage] = useState(null);
//   const [selectedEnglishImage, setSelectedEnglishImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [courseData, setCourseData] = useState({
//     title: '',
//     shortDescription: '',
//     longDescription: '',
//     category: '',
//     instructorName: '',
//     price: 0,
//     mrp: 0,
//     hindiCoverImage: null,
//     englishCoverImage: null,
//     review: '',
//     isActive: true,
//     rating: 0,
//     SEOCode: '',
//   });


//   useEffect(() => {
//     axios.get('http://localhost:5000/categories')
//       .then(response => {
//         console.log('Categories data:', response.data);
//         setCategories(response.data);
//       })
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);

//   useEffect(() => {
//     axios.get('http://localhost:5000/instructors')
//       .then(response => {
//         console.log('Instructors data:', response);
//         if (Array.isArray(response.data.instructors)) {
//           setInstructors(response.data.instructors);
//         } else {
//           console.error('Instructors data is not an array:', response.data.instructors);
//         }
//       })
//       .catch(error => console.error('Error fetching instructors:', error));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     setCourseData((prevData) => ({
//       ...prevData,
//       [name]: type === 'number' ? parseFloat(value) : value,
//     }));
//   };

//   const handleHindiImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedHindiImage(URL.createObjectURL(file));
//       setCourseData((prevData) => ({
//         ...prevData,
//         hindiCoverImage: file,
//       }));
//     }
//   };

//   const handleEnglishImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedEnglishImage(URL.createObjectURL(file));
//       setCourseData((prevData) => ({
//         ...prevData,
//         englishCoverImage: file,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Upload Hindi and English cover images to AWS S3
//       const hindiImageFormData = new FormData();
//       hindiImageFormData.append('image', courseData.hindiCoverImage);

//       const englishImageFormData = new FormData();
//       englishImageFormData.append('image', courseData.englishCoverImage);

//       const hindiImageResponse = await axios.post('http://localhost:5000/api/upload', hindiImageFormData);
//       const englishImageResponse = await axios.post('http://localhost:5000/api/upload', englishImageFormData);

//       // Update courseData with Hindi and English image URLs from S3
//       const updatedCourseData = {
//         ...courseData,
//         hindiCoverImage: hindiImageResponse.data.imageUrl,
//         englishCoverImage: englishImageResponse.data.imageUrl,
//       };

//       console.log(hindiImageResponse.data.imageUrl)
//       console.log(englishImageResponse.data.imageUrl)


//       await axios.post('http://localhost:5000/api/courses', updatedCourseData);
//       console.log('Course data submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting course data:', error);
//     }
//   };

//   return (
//     <div className={styles.course_container}>
//       <h1>Course Form</h1>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         <label>Title:</label>
//         <input type="text" name="title" value={courseData.title} onChange={handleChange} required />

//         <label>Short Description:</label>
//         <textarea name="shortDescription" value={courseData.shortDescription} onChange={handleChange} required />

//         <label>Long Description:</label>
//         <div className={styles.quillContainer}>
//           <ReactQuill theme="snow" value={editorValue} onChange={setEditorValue} />
//         </div>

//         <label>Category:</label>
//         <select name="category" value={courseData.category} onChange={handleChange} required>
//           <option value="" disabled>Select a category</option>
//           {categories.map(category => (
//             <option key={category._id} value={category.categoryTitle}>
//               {category.categoryTitle}
//             </option>
//           ))}
//         </select>

//         <label>Instructor Name:</label>
//         <select name="instructorName" value={courseData.instructorName} onChange={handleChange} required>
//           <option value="" disabled>Select an instructor</option>
//           {Array.isArray(instructors) && instructors.map(inst => (
//             <option key={inst._id} value={inst.instructorName}>
//               {inst.instructorName}
//             </option>
//           ))}
//         </select>

//         <label>SEO Code:</label>
//         <input type="text" name="SEOCode" value={courseData.SEOCode} onChange={handleChange} required />

//         <label>Price:</label>
//         <input type="number" name="price" value={courseData.price} onChange={handleChange} required />

//         <label>MRP:</label>
//         <input type="number" name="mrp" value={courseData.mrp} onChange={handleChange} required />

//         <label>Hindi Cover Image:</label>
//         <input type="file" onChange={handleHindiImageChange} accept="image/*" />

//         {selectedHindiImage && (
//           <div className={styles.imagePreviewContainer}>
//             <img src={selectedHindiImage} alt="Selected Hindi" className={styles.imagePreview} />
//           </div>
//         )}

//         <label>English Cover Image:</label>
//         <input type="file" onChange={handleEnglishImageChange} accept="image/*" />

//         {selectedEnglishImage && (
//           <div className={styles.imagePreviewContainer}>
//             <img src={selectedEnglishImage} alt="Selected English" className={styles.imagePreview} />
//           </div>
//         )}

//         <button type="submit" className={styles.submitButton} disabled={loading}>
//           {loading ? 'Uploading...' : 'Submit'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CourseForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { EditorState, convertToRaw, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Swal from 'sweetalert2';
import styles from './Category.module.css';

const CourseForm = () => {
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [courseData, setCourseData] = useState({
    title: '',
    shortDescription: '',
    longDescription: EditorState.createEmpty(),
    category: '',
    instructorName: '',
    price: '',
    mrp: '',
    SEOCode: '',
    hindiCoverImage: null,
    englishCoverImage: null,
  });

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

  const toolbarOptions = {
    options: [
      'inline',
      'blockType',
      'fontSize',
      'fontFamily',
      'list',
      'textAlign',
      'colorPicker',
      'link',
      'embedded',
      'remove',
      'history',
      'emoji',

    ],
    inline: {
      options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
    },
    blockType: {
      options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
    },
    list: {
      options: ['unordered', 'ordered'],
    },
    textAlign: {
      options: ['left', 'center', 'right', 'justify'],
    },
    colorPicker: {
      options: ['default', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
    },
    link: {
      options: ['link', 'unlink'],
    },
    embedded: {
      options: ['embedded'],
    },
    remove: {
      options: ['remove'],
    },
    history: {
      options: ['undo', 'redo'],
    },
    emoji: {
      options: ['emoji'],
    },
    // MATH_EQUATION: {
    //   icon: <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(mathEquationIcon) }} />,
    //   title: 'Insert Math Equation',
    //   onClick: handleMathEquationClick,
    // },
  };

  useEffect(() => {
    axios.get('http://localhost:5000/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/instructors')
      .then(response => {
        if (Array.isArray(response.data.instructors)) {
          setInstructors(response.data.instructors);
        } else {
          console.error('Instructors data is not an array:', response.data.instructors);
        }
      })
      .catch(error => console.error('Error fetching instructors:', error));
  }, []);

  const onDrop = (acceptedFiles, type) => {
    setCourseData((prevData) => ({
      ...prevData,
      [type]: acceptedFiles[0],
    }));
  };

  const { getRootProps: getRootPropsHindi, getInputProps: getInputPropsHindi } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'hindiCoverImage'),
    accept: 'image/*',
  });

  const { getRootProps: getRootPropsEnglish, getInputProps: getInputPropsEnglish } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'englishCoverImage'),
    accept: 'image/*',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? e.target.checked : value,
    }));
  };

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    setCourseData((prevData) => ({
      ...prevData,
      longDescription: editorState,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append text data to FormData
      for (const key in courseData) {
        if (key !== 'hindiCoverImage' && key !== 'englishCoverImage') {
          if (key === 'longDescription') {
            // Convert EditorState to raw content and store it as JSON
            formData.append(key, JSON.stringify(convertToRaw(courseData[key].getCurrentContent())));
          } else {
            formData.append(key, courseData[key]);
          }
        }
      }

      formData.append('hindiCoverImage', courseData.hindiCoverImage);
      formData.append('englishCoverImage', courseData.englishCoverImage);

      setLoading(true);
      const response = await axios.post('http://localhost:5000/create-course', formData);
      console.log('Course created successfully!', response.data);

      Swal.fire({
        icon: 'success',
        title: 'Course Created!',
        text: 'Your course has been successfully created.',
      });

      setCourseData({
        title: '',
        shortDescription: '',
        longDescription: EditorState.createEmpty(),
        category: '',
        instructorName: '',
        price: 0,
        mrp: 0,
        SEOCode: '',
        hindiCoverImage: null,
        englishCoverImage: null,
      });

    } catch (error) {
      console.error('Error creating course:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error creating the course. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.course_container}>
      <h1>Course Form</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={courseData.title} onChange={handleChange} required />

        <label>Short Description:</label>
        <textarea name="shortDescription" value={courseData.shortDescription} onChange={handleChange} required />

        <label>Long Description:</label>
        <Editor
          editorState={courseData.longDescription}
          onEditorStateChange={handleEditorChange}
          toolbar={toolbarOptions}
        />

        <label>Category:</label>
        <select name="category" value={courseData.category} onChange={handleChange} required>
          <option value="" disabled>Select a category</option>
          {categories.map(category => (
            <option key={category._id} value={category.categoryTitle}>
              {category.categoryTitle}
            </option>
          ))}
        </select>

        <label>Instructor Name:</label>
        <select name="instructorName" value={courseData.instructorName} onChange={handleChange} required>
          <option value="" disabled>Select an instructor</option>
          {Array.isArray(instructors) && instructors.map(inst => (
            <option key={inst._id} value={inst.instructorName}>
              {inst.instructorName}
            </option>
          ))}
        </select>

        <label>SEO Code:</label>
        <input type="text" name="SEOCode" value={courseData.SEOCode} onChange={handleChange} required />

        <label>Price:</label>
        <input type="number" name="price" value={courseData.price} onChange={handleChange} required />

        <label>MRP:</label>
        <input type="number" name="mrp" value={courseData.mrp} onChange={handleChange} required />

        <label>
          Hindi Cover Image:
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            {...getRootPropsHindi()}
            style={dropzoneStyles}
          >
            <input {...getInputPropsHindi()} />
            <p>Drag 'n' drop or click to select Hindi cover image</p>
          </div>
          {courseData.hindiCoverImage && (
            <img src={URL.createObjectURL(courseData.hindiCoverImage)} alt="Hindi Cover" style={imagePreviewStyles} />
          )}
        </label>
        <br />

        <label>
          English Cover Image:
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            {...getRootPropsEnglish()}
            style={dropzoneStyles}
          >
            <input {...getInputPropsEnglish()} />
            <p>Drag 'n' drop or click to select English cover image</p>
          </div>
          {courseData.englishCoverImage && (
            <img src={URL.createObjectURL(courseData.englishCoverImage)} alt="English Cover" style={imagePreviewStyles} />
          )}
        </label>
        <br />

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Uploading...' : 'Submit'}
        </button>
        
      </form>
    </div>
  );
};

export default CourseForm;
