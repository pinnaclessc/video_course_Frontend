// PdfManagementForm.jsx
import React, { useState, useEffect } from 'react';
import styles from './PdfManagementForm.module.css';
import PdfEditModal from './PdfEditModal'; // Adjust the path based on your project structure
import { useParams } from 'react-router-dom';

const PdfManagementForm = () => {
  const { courseId } = useParams();
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    if (courseId) {
      fetch(`http://13.200.156.92:8000/api/pdfs/${courseId}`)
        .then(response => response.json())
        .then(data => setPdfs(data))
        .catch(error => console.error('Error fetching PDFs:', error));
    }
  }, [courseId]);

  const handleEdit = (pdf) => {
    setSelectedPdf(pdf);
  };

  const handleDelete = async (pdfId) => {
    try {
      const response = await fetch(`http://13.200.156.92:8000/api/delete-pdf/${pdfId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPdfs(pdfs.filter(pdf => pdf._id !== pdfId));
        console.log('PDF deleted successfully');
      } else {
        console.error('Failed to delete PDF');
      }
    } catch (error) {
      console.error('Error deleting PDF:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Course ID: {courseId}</h2>

      {pdfs.length > 0 ? (
        <ul className={styles.pdfList}>
          {pdfs.map(pdf => (
            <li key={pdf._id} className={styles.pdfListItem}>
              {pdf.originalname}
              <button onClick={() => handleEdit(pdf)}>Edit</button>
              <button onClick={() => handleDelete(pdf._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No PDFs available for the selected course.</div>
      )}

      {selectedPdf && (
        <PdfEditModal pdf={selectedPdf} onClose={() => setSelectedPdf(null)} />
      )}
    </div>
  );
};

export default PdfManagementForm;
