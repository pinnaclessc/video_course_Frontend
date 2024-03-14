import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import 'draft-js/dist/Draft.css';
import styles from './NoteEditor.module.css';
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListOl, FaListUl, FaLink } from 'react-icons/fa';

const NoteEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [urlValue, setUrlValue] = useState("");

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
      const contentState = editorState.getCurrentContent();
      const newContentState = contentState.set('text', transformation(contentState.getBlockForKey(selection.getStartKey()).getText().slice(selection.getStartOffset(), selection.getEndOffset())));
      setEditorState(EditorState.push(editorState, newContentState, 'insert-characters'));
    }
  };

  const saveContent = async () => {
    const contentState = editorState.getCurrentContent();
    const htmlContent = stateToHTML(contentState);
    console.log("Saving HTML Content: ", htmlContent);
    try {
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: htmlContent }),
      });
      if (response.ok) {
        console.log("Content saved successfully");
      } else {
        console.error("Failed to save content");
      }
    } catch (error) {
      console.error("Error saving content", error);
    }
  };

  return (
    <div className={styles.noteEditor}>
      <div className={styles.toolbar}>
        <button onClick={() => onToggleStyle("BOLD")}><FaBold /></button>
        <button onClick={() => onToggleStyle("ITALIC")}><FaItalic /></button>
        <button onClick={() => onToggleStyle("UNDERLINE")}><FaUnderline /></button>
        <button onClick={() => onToggleStyle("STRIKETHROUGH")}><FaStrikethrough /></button>
        <button onClick={() => onToggleBlockType("ordered-list-item")}><FaListOl /></button>
        <button onClick={() => onToggleBlockType("unordered-list-item")}><FaListUl /></button>
        <button onClick={() => setShowLinkInput(!showLinkInput)}><FaLink /></button>
        <button onClick={() => onToggleBlockType("header-one")}>H1</button>
        <button onClick={() => onToggleBlockType("header-two")}>H2</button>
        <button onClick={() => onToggleBlockType("header-three")}>H3</button>
        <button onClick={() => onToggleBlockType("header-four")}>H4</button>
        <button onClick={() => onToggleBlockType("header-five")}>H5</button>
        <button onClick={() => onToggleBlockType("header-six")}>H6</button>
      </div>
      {showLinkInput && (
  <div className={styles.linkInputContainer}>
    <input
      type="text"
      onChange={onURLChange}
      value={urlValue}
      placeholder="Enter a URL"
      className={styles.linkInput}
    />
    <button onClick={confirmLink} className={styles.confirmLinkButton}>
      Confirm
    </button>
  </div>
)}

      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={setEditorState}
        className={styles.editorCustomStyle}
      />
      <button onClick={saveContent}>Save Content</button>
    </div>
  );
};
export default NoteEditor;
