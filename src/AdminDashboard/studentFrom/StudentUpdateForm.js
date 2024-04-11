import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams
import styles from './StudentUpdateForm.module.css';

const StudentUpdateForm = () => {
    const { studentId } = useParams(); // Extract studentId from URL params
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        picture: '',
        role: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/vc/student/${studentId}`);
                const studentData = response.data;
                setFormData({
                    name: studentData.name,
                    email: studentData.email,
                    password: studentData.password,
                    picture: studentData.picture,
                    role: studentData.role.join(', ')
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching student data:', error);
                setError('Error fetching student data. Please try again later.');
                setLoading(false);
            }
        };

        fetchStudentData();
    }, [studentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make API call to update student data using formData
            // Example: await axios.put(`http://localhost:8000/vc/student/${studentId}`, formData);
            console.log('Form submitted with data:', formData);
        } catch (error) {
            console.error('Error updating student data:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className={styles.container}>
            <h2>Update Student</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="picture">Picture:</label>
                    <input type="text" name="picture" id="picture" value={formData.picture} onChange={handleChange} className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="role">Role:</label>
                    <input type="text" name="role" id="role" value={formData.role} onChange={handleChange} className={styles.input} />
                </div>
                <button type="submit" className={styles.submitBtn}>Update</button>
            </form>
        </div>
    );
};

export default StudentUpdateForm;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from './StudentUpdateForm.module.css';

// const StudentUpdateForm = ({ studentId }) => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         picture: '',
//         role: ''
//     });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchStudentData = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8000/vc/student/${studentId}`);
//                 const studentData = response.data;
//                 setFormData({
//                     name: studentData.name,
//                     email: studentData.email,
//                     password: studentData.password,
//                     picture: studentData.picture,
//                     role: studentData.role.join(', ')
//                 });
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching student data:', error);
//                 setError('Error fetching student data. Please try again later.');
//                 setLoading(false);
//             }
//         };

//         fetchStudentData();
//     }, [studentId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Make API call to update student data using formData
//             // Example: await axios.put(`http://localhost:8000/vc/student/${studentId}`, formData);
//             console.log('Form submitted with data:', formData);
//         } catch (error) {
//             console.error('Error updating student data:', error);
//         }
//     };

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>Error: {error}</p>;
//     }

//     return (
//         <div className={styles.container}>
//             <h2>Update Student</h2>
//             <form onSubmit={handleSubmit} className={styles.form}>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="name">Name:</label>
//                     <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={styles.input} />
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="email">Email:</label>
//                     <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={styles.input} />
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="password">Password:</label>
//                     <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className={styles.input} />
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="picture">Picture:</label>
//                     <input type="text" name="picture" id="picture" value={formData.picture} onChange={handleChange} className={styles.input} />
//                 </div>
//                 <div className={styles.formGroup}>
//                     <label htmlFor="role">Role:</label>
//                     <input type="text" name="role" id="role" value={formData.role} onChange={handleChange} className={styles.input} />
//                 </div>
//                 <button type="submit" className={styles.submitBtn}>Update</button>
//             </form>
//         </div>
//     );
// };

// export default StudentUpdateForm;
