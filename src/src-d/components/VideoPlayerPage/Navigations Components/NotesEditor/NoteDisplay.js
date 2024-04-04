import React, { useEffect, useState } from 'react';

const NoteDisplay = () => {
  const [noteContent, setNoteContent] = useState('');

  useEffect(() => {
    fetch('https://videocoursebackend.ssccglpinnacle.com/api/notes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // console.log("Fetched data:", data); 
        if (data.length > 0) {
          setNoteContent(data[0].content);
        }
      })
      .catch(error => console.error('Error fetching note content:', error));
  }, []);

  return (
    <div>
      <h3>Note Content</h3>
      <div dangerouslySetInnerHTML={{ __html: noteContent }} />
    </div>
  );
};

export default NoteDisplay;
