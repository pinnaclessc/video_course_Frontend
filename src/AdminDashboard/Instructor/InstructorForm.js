import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import 'draft-js/dist/Draft.css';
import styles from './InstructorForm.module.css';
import { FaBold, FaItalic, FaUnderline, FaListOl, FaListUl, FaLink } from 'react-icons/fa';

const InstructorForm = () => {
  const [instructorName, setInstructorName] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [urlValue, setUrlValue] = useState("");

  const onDrop = (files) => {
    setSelectedImage(files[0]);
    setAcceptedFiles(files);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

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

  const transformText = (transformation) => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const currentContent = editorState.getCurrentContent();
      const startKey = selection.getStartKey();
      const startOffset = selection.getStartOffset();
      const blockText = currentContent.getBlockForKey(startKey).getText();
      const endOffset = selection.getEndOffset();
      const text = blockText.slice(startOffset, endOffset);
      const transformedText = transformation(text);
      const newContentState = Modifier.replaceText(
        currentContent,
        selection,
        transformedText
      );
      const newEditorState = EditorState.push(editorState, newContentState, 'insert-characters');
      setEditorState(newEditorState);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
    //   Swal.fire('Please select an image before submitting.');
      return;
    }

    setLoading(true);
    const contentState = editorState.getCurrentContent();
    const htmlContent = stateToHTML(contentState); 

    try {
      const formData = new FormData();
      formData.append('image', acceptedFiles[0]);
      formData.append('instructorName', instructorName);
      formData.append('instructorDescription', htmlContent);

      await axios.post('https://videocoursebackend.ssccglpinnacle.com/upload-image', formData);

      Swal.fire({
        icon: 'success',
        title: 'Instructor Created!',
        text: 'Your instructor has been successfully created.',
      });

      setInstructorName('');
      setEditorState(EditorState.createEmpty());
      setSelectedImage(null);
      setAcceptedFiles([]);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an error creating the instructor. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className={styles.inputContainer}>
          <label className={styles.label}>Instructor Name:</label>
          <input
            type="text"
            value={instructorName}
            onChange={(e) => setInstructorName(e.target.value)}
            className={styles.inputField}
          />
        </div>
        <label className={styles.label}>Instructor Description:</label>
        <div className={styles.toolbar}>
          <button onClick={() => onToggleStyle('BOLD')}><FaBold /></button>
          <button onClick={() => onToggleStyle('ITALIC')}><FaItalic /></button>
          <button onClick={() => onToggleStyle('UNDERLINE')}><FaUnderline /></button>
          <button onClick={() => onToggleBlockType('ordered-list-item')}><FaListOl /></button>
          <button onClick={() => onToggleBlockType('unordered-list-item')}><FaListUl /></button>
          <button onClick={() => setShowLinkInput(!showLinkInput)}><FaLink /></button>
          <button onClick={() => onToggleBlockType("header-one")}>H1</button>
          <button onClick={() => onToggleBlockType("header-two")}>H2</button>
          <button onClick={() => onToggleBlockType("header-three")}>H3</button>
          <button onClick={() => onToggleBlockType("header-four")}>H4</button>
          <button onClick={() => onToggleBlockType("header-five")}>H5</button>
          <button onClick={() => onToggleBlockType("header-six")}>H6</button>
          <button onClick={() => transformText(text => text.toUpperCase())}>Upper</button>
          <button onClick={() => transformText(text => text.toLowerCase())}>Lower</button>
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
            onChange={setEditorState}
            className={styles.editorStyle}
          />
        </div>
        <div {...getRootProps()} className={`${styles.dropzoneContainer} ${styles.inputContainer}`}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop an image file here, or click to select file</p>
        </div>
        {selectedImage && (
          <div>
            <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ width: '200px', marginTop: '10px' }} />
          </div>
        )}
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Uploading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default InstructorForm;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useDropzone } from 'react-dropzone';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import Swal from 'sweetalert2';
// import styles from './InstructorForm.module.css';

// const InstructorForm = () => {
//   const [instructorName, setInstructorName] = useState('');
//   const [instructorDescription, setInstructorDescription] = useState('');
//   const [editorValue, setEditorValue] = useState('');
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [acceptedFiles, setAcceptedFiles] = useState([]);

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

//   const onDrop = (files) => {
//     const file = files[0];
//     const reader = new FileReader();
//     reader.onload = () => {
//       setSelectedImage(reader.result);
//     };
//     reader.readAsDataURL(file);

//     setAcceptedFiles(files);
//   };


//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: 'image/*',
//     onDropAccepted: (files) => {
//       const file = files[0];
//       const reader = new FileReader();
//       reader.onload = () => {
//         setSelectedImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     },
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedImage) {
//       console.error('Please select an image before submitting.');
//       return;
//     }

//     try {
    
//       setLoading(true);
//       const formData = new FormData();
//       formData.append('image', acceptedFiles[0]);
//       formData.append('instructorName', instructorName);
//       formData.append('instructorDescription', editorValue);

//       await axios.post('https://videocoursebackend.ssccglpinnacle.com/upload-image', formData);
//       Swal.fire({
//         icon: 'success',
//         title: 'Instructor Created!',
//         text: 'Your instructor has been successfully created.',
//       });
     
//       setInstructorName('');
//       setEditorValue('');
//       setSelectedImage(null);
//       setAcceptedFiles([]);

//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error!',
//         text: 'There was an error creating the instructor. Please try again.',
//       });
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className={styles.container}>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className={styles.inputContainer}>
//           <label className={styles.label}>Instructor Name:</label>
//           <input
//             type="text"
//             value={instructorName}
//             onChange={(e) => setInstructorName(e.target.value)}
//             className={styles.inputField}
//           />
//         </div>
//         <div className={styles.inputContainer}>
//           <label className={styles.label}>Instructor Description:</label>
//           <div className={styles.quillContainer}>
//             <ReactQuill theme="snow" value={editorValue} onChange={setEditorValue} />
//           </div>
//         </div>
//         <div className={`${styles.dropzoneContainer} ${styles.inputContainer}`} {...getRootProps()}>
//           <input {...getInputProps()} />
//           <p className={styles.dropzoneText}>Drag 'n' drop an image file here, or click to select file</p>
//         </div>
//         {selectedImage && (
//           <div className={styles.imagePreviewContainer}>
//             <img src={selectedImage} alt="Selected" className={styles.imagePreview} />
//           </div>
//         )}
//         <button type="submit" className={styles.submitButton} disabled={loading}>
//           {loading ? 'Uploading...' : 'Submit'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default InstructorForm;