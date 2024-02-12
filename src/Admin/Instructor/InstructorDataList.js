import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser'; 
import styles from './InstructorData.module.css';

const FormattedInstructorDescription = ({ description }) => {
  return <div>{parse(description)}</div>; 
};

const InstructorDataList = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/instructors');
        setInstructors(response.data.instructors);
      } catch (error) {
        console.error('Error fetching instructors:', error.message);
      }
    };

    fetchInstructors();
  }, []);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Instructor Name</th>
            <th>Instructor Description</th>
            <th>Image</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor, index) => (
            <tr key={instructor._id}>
              <td>{index + 1}</td>
              <td>{instructor.instructorName}</td>
              <td>
                <FormattedInstructorDescription description={instructor.instructorDescription} />
              </td>
              <td>
                {instructor.imageUrl && (
                  <img src={instructor.imageUrl} alt={`Instructor ${index + 1}`} className={styles.image} />
                )}
              </td>
              <td>{new Date(instructor.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstructorDataList;
