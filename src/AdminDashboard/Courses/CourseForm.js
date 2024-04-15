import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html'; 
import 'draft-js/dist/Draft.css';
import Swal from 'sweetalert2';
import styles from './CourseForm.module.css';
import { FaBold, FaItalic, FaUnderline, FaListOl, FaListUl, FaLink } from 'react-icons/fa';

const CourseForm = () => {
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [urlValue, setUrlValue] = useState("");
  const [courseData, setCourseData] = useState({
    courseTitle: '',
    shortDescription: '',
    category: '',
    instructorName: '',
    price: '',
    mrp: '',
    SEOCode: '',
    hindiCoverImage: null,
    englishCoverImage: null,
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

    fetchCategoriesAndInstructors();
  }, []);

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
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onToggleStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const onToggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const onURLChange = (e) => setUrlValue(e.target.value);

  const confirmLink = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', { url: urlValue });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setEditorState(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
    setShowLinkInput(false);
    setUrlValue("");
  };

  const { getRootProps: getRootPropsHindi, getInputProps: getInputPropsHindi } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'hindiCoverImage'),
  });

  const { getRootProps: getRootPropsEnglish, getInputProps: getInputPropsEnglish } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'englishCoverImage'),
  });

  const onDrop = (acceptedFiles, name) => {
    setCourseData({ ...courseData, [name]: acceptedFiles[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const htmlContent = stateToHTML(editorState.getCurrentContent());
    courseData.longDescription = htmlContent;

    const formData = new FormData();
    Object.keys(courseData).forEach((key) => {
      if (key === 'hindiCoverImage' || key === 'englishCoverImage') {
        if (courseData[key]) formData.append(key, courseData[key], courseData[key].name);
      } else {
        formData.append(key, courseData[key]);
      }
    });

    try {
      await axios.post('https://videocoursebackend.ssccglpinnacle.com/create-course', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire('Success', 'Course created successfully', 'success');
      // Reset form here if necessary
    } catch (error) {
      console.error('Error creating course:', error);
      Swal.fire('Error', 'Failed to create course', 'error');
    } finally {
      setLoading(false);
    }
  };

  const transformText = (transformation) => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = selection.getStartKey();
      const startOffset = selection.getStartOffset();
      const blockText = contentState.getBlockForKey(startKey).getText();
      const endOffset = selection.getEndOffset();
      const text = blockText.slice(startOffset, endOffset);
      const transformedText = transformation === 'uppercase' ? text.toUpperCase() : text.toLowerCase();
      const newContentState = Modifier.replaceText(
        contentState,
        selection,
        transformedText
      );
      const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
      setEditorState(newEditorState);
    }
  };


  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label>Course Title:</label>
        <input type="text" name="courseTitle" value={courseData.title} onChange={handleChange} required />

        <label>Short Description:</label>
        <textarea name="shortDescription" value={courseData.shortDescription} onChange={handleChange} required />

        <label>Long Description:</label>
        <div className={styles.toolbar}>
          <button type="button" onClick={() => onToggleStyle('BOLD')}><FaBold /></button>
          <button type="button" onClick={() => onToggleStyle('ITALIC')}><FaItalic /></button>
          <button type="button" onClick={() => onToggleStyle('UNDERLINE')}><FaUnderline /></button>
          <button type="button" onClick={() => onToggleBlockType('ordered-list-item')}><FaListOl /></button>
          <button type="button" onClick={() => onToggleBlockType('unordered-list-item')}><FaListUl /></button>
          <button type="button" onClick={() => setShowLinkInput(!showLinkInput)}><FaLink /></button>
          <button type="button" onClick={() => onToggleBlockType("header-one")}>H1</button>
          <button type="button" onClick={() => onToggleBlockType("header-two")}>H2</button>
          <button type="button" onClick={() => onToggleBlockType("header-three")}>H3</button>
          <button type="button" onClick={() => onToggleBlockType("header-four")}>H4</button>
          <button type="button" onClick={() => onToggleBlockType("header-five")}>H5</button>
          <button type="button" onClick={() => onToggleBlockType("header-six")}>H6</button>
          <button type="button" onClick={() => transformText('uppercase')}>Upper</button>
          <button type="button" onClick={() => transformText('lowercase')}>Lower</button>
        </div>
        {showLinkInput && (
          <div>
            <input type="text" onChange={onURLChange} value={urlValue} placeholder="Enter a URL" />
            <button onClick={confirmLink}>Confirm</button>
          </div>
        )}
        <div className={styles.editorContainer} >
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={handleEditorChange}
          className={styles.editorStyle}
        />
        </div>

        <label>Category:</label>
        <select name="category" value={courseData.category} onChange={handleChange} required>
          <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category._id} value={category.categoryTitle}>
              {category.categoryTitle}
            </option>
          ))}
        </select>

        <label>Instructor Name:</label>
        <select name="instructorName" value={courseData.instructorName} onChange={handleChange} required>
          <option value="">Select an instructor</option>
          {instructors.map(instructor => (
            <option key={instructor._id} value={instructor.instructorName}>
              {instructor.instructorName}
            </option>
          ))}
        </select>

  
        <label>Hindi Cover Image:</label>
        <div {...getRootPropsHindi()} className={styles.dropzone}>
          <input {...getInputPropsHindi()} />
          <p>Drag 'n drop some files here, or click to select files</p>
        </div>
        {courseData.hindiCoverImage && (
          <img src={URL.createObjectURL(courseData.hindiCoverImage)} alt="Hindi Cover" style={{ width: '200px', marginTop: '10px' }} />
        )}

        {/* Image Upload for English Cover Image */}
        <label>English Cover Image:</label>
        <div {...getRootPropsEnglish()} className={styles.dropzone}>
          <input {...getInputPropsEnglish()} />
          <p>Drag 'n drop some files here, or click to select files</p>
        </div>
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
          {loading ? 'Saving...' : 'Save Course'}
        </button>
      </form>
    </div>
  );
};

export default CourseForm;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useDropzone } from 'react-dropzone';
// import { EditorState, convertToRaw, Modifier } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import Swal from 'sweetalert2';
// import styles from './CourseForm.module.css';


// const CourseForm = () => {
//   const [categories, setCategories] = useState([]);
//   const [instructors, setInstructors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [editorState, setEditorState] = useState(EditorState.createEmpty());
//   const [courseData, setCourseData] = useState({
//     title: '',
//     shortDescription: '',
//     longDescription: EditorState.createEmpty(),
//     category: '',
//     instructorName: '',
//     price: '',
//     mrp: '',
//     SEOCode: '',
//     hindiCoverImage: null,
//     englishCoverImage: null,
//   });

//   const dropzoneStyles = {
//     border: '2px dashed #cccccc',
//     borderRadius: '4px',
//     padding: '20px',
//     textAlign: 'center',
//     cursor: 'pointer',
//   };

//   const imagePreviewStyles = {
//     marginTop: '10px',
//     maxWidth: '200px',
//   };

//   const toolbarOptions = {
//     options: [
//       'inline',
//       'blockType',
//       'fontSize',
//       'fontFamily',
//       'list',
//       'textAlign',
//       'colorPicker',
//       'link',
//       'embedded',
//       'remove',
//       'history',
//       'emoji',

//     ],
//     inline: {
//       options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
//     },
//     blockType: {
//       options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
//     },
//     list: {
//       options: ['unordered', 'ordered'],
//     },
//     textAlign: {
//       options: ['left', 'center', 'right', 'justify'],
//     },
//     colorPicker: {
//       options: ['default', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
//     },
//     link: {
//       options: ['link', 'unlink'],
//     },
//     embedded: {
//       options: ['embedded'],
//     },
//     remove: {
//       options: ['remove'],
//     },
//     history: {
//       options: ['undo', 'redo'],
//     },
//     emoji: {
//       options: ['emoji'],
//     },
//     // MATH_EQUATION: {
//     //   icon: <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(mathEquationIcon) }} />,
//     //   title: 'Insert Math Equation',
//     //   onClick: handleMathEquationClick,
//     // },
//   };

//   useEffect(() => {
//     axios.get('http://13.200.156.92:8000/categories')
//       .then(response => setCategories(response.data))
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);

//   useEffect(() => {
//     axios.get('http://13.200.156.92:8000/instructors')
//       .then(response => {
//         if (Array.isArray(response.data.instructors)) {
//           setInstructors(response.data.instructors);
//         } else {
//           console.error('Instructors data is not an array:', response.data.instructors);
//         }
//       })
//       .catch(error => console.error('Error fetching instructors:', error));
//   }, []);

//   const onDrop = (acceptedFiles, type) => {
//     setCourseData((prevData) => ({
//       ...prevData,
//       [type]: acceptedFiles[0],
//     }));
//   };

//   const { getRootProps: getRootPropsHindi, getInputProps: getInputPropsHindi } = useDropzone({
//     onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'hindiCoverImage'),
//     accept: 'image/*',
//   });

//   const { getRootProps: getRootPropsEnglish, getInputProps: getInputPropsEnglish } = useDropzone({
//     onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'englishCoverImage'),
//     accept: 'image/*',
//   });

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     setCourseData((prevData) => ({
//       ...prevData,
//       [name]: type === 'checkbox' ? e.target.checked : value,
//     }));
//   };

//   const handleEditorChange = (editorState) => {
//     setEditorState(editorState);
//     setCourseData((prevData) => ({
//       ...prevData,
//       longDescription: editorState,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();

//       for (const key in courseData) {
//         if (key !== 'hindiCoverImage' && key !== 'englishCoverImage') {
//           if (key === 'longDescription') {
           
//             formData.append(key, JSON.stringify(convertToRaw(courseData[key].getCurrentContent())));
//           } else {
//             formData.append(key, courseData[key]);
//           }
//         }
//       }

//       formData.append('hindiCoverImage', courseData.hindiCoverImage);
//       formData.append('englishCoverImage', courseData.englishCoverImage);

//       setLoading(true);
//       const response = await axios.post('http://13.200.156.92:8000/create-course', formData);
//       console.log('Course created successfully!', response.data);

//       Swal.fire({
//         icon: 'success',
//         title: 'Course Created!',
//         text: 'Your course has been successfully created.',
//       });

//       setCourseData({
//         title: '',
//         shortDescription: '',
//         longDescription: EditorState.createEmpty(),
//         category: '',
//         instructorName: '',
//         price: 0,
//         mrp: 0,
//         SEOCode: '',
//         hindiCoverImage: null,
//         englishCoverImage: null,
//       });

//     } catch (error) {
//       console.error('Error creating course:', error.message);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: 'There was an error creating the course. Please try again.',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.course_container}>
//       <h4>Course Form</h4>
   
//       <form className={styles.form} onSubmit={handleSubmit}>
//         <label>Title:</label>
//         <input type="text" name="title" value={courseData.title} onChange={handleChange} required />

//         <label>Short Description:</label>
//         <textarea name="shortDescription" value={courseData.shortDescription} onChange={handleChange} required />

//         <label>Long Description:</label>
//         <Editor
//           editorState={courseData.longDescription}
//           onEditorStateChange={handleEditorChange}
//           toolbar={toolbarOptions}
//         />

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
//           {instructors.map(inst => (
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
//         <label>
//           Hindi Cover Image:
//           <div
//             onClick={(e) => {
//               e.stopPropagation();
//             }}
//             {...getRootPropsHindi()}
//             style={dropzoneStyles}
//           >
//             <input {...getInputPropsHindi()} />
//             <p>Drag 'n' drop or click to select Hindi cover image</p>
//           </div>
//           {courseData.hindiCoverImage && (
//             <img src={URL.createObjectURL(courseData.hindiCoverImage)} alt="Hindi Cover" style={imagePreviewStyles} />
//           )}
//         </label>
//         <br />

//         <label>
//           English Cover Image:
//           <div
//             onClick={(e) => {
//               e.stopPropagation();
//             }}
//             {...getRootPropsEnglish()}
//             style={dropzoneStyles}
//           >
//             <input {...getInputPropsEnglish()} />
//             <p>Drag 'n' drop or click to select English cover image</p>
//           </div>
//           {courseData.englishCoverImage && (
//             <img src={URL.createObjectURL(courseData.englishCoverImage)} alt="English Cover" style={imagePreviewStyles} />
//           )}
//         </label>
//         <br />

//         <button type="submit" className={styles.submitButton} disabled={loading}>
//           {loading ? 'Uploading...' : 'Submit'}
//         </button>
        
//       </form>
//     </div>
//   );
// };

// export default CourseForm;