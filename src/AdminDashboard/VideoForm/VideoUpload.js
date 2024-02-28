import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './VideoUpload.module.css';

function VideoUploadForm() {
    const [file, setFile] = useState(null);
    const [courses, setCourses] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:8000/courses')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => console.error('Error fetching courses:', error));
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleCourseChange = (event) => {
        setSelectedCourseId(event.target.value);
    };

    const resetFormState = () => {
        setFile(null);
        setSelectedCourseId('');
        setUploadProgress(0);
        setIsUploading(false);
        setIsProcessing(false); 
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file || !selectedCourseId) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select a course and a video file first!',
            });
            return;
        }
    
        const formData = new FormData();
        formData.append('video', file);
        formData.append('courseId', selectedCourseId);
    
        setIsUploading(true);
    
        Swal.fire({
            title: 'Uploading...',
            html: 'Please wait while your video is being uploaded',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });
    
        try {
            const response = await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                },
               
            });
    
            setIsUploading(false);
            setIsProcessing(true); 
    
            Swal.fire({
                title: 'Processing...',
                html: 'Your video is being processed',
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    Swal.showLoading();
                },
            });
    
            setTimeout(() => {
                setIsProcessing(false); 
                Swal.fire('Uploaded!', 'Your video has been uploaded and processed successfully.', 'success');
                resetFormState();
            }, 3000); 
    
        } catch (error) {
            setIsUploading(false);
            setIsProcessing(false);
            console.error('Error uploading video:', error);
            Swal.fire({
                icon: 'error',
                title: 'Upload failed',
                text: 'There was a problem uploading your video.',
            });
        }
    };
    

    return (
        <div>
        <form onSubmit={handleSubmit} className={styles.formcontainer}>
        <label htmlFor="courseSelect">Select a Course:</label> 
            <select 
                value={selectedCourseId} 
                onChange={handleCourseChange} 
                className={styles.select}
                required
            >
                <option value="">Select a Course</option>
                {courses.map((course) => (
                    <option key={course._id} value={course._id}>{course.title}</option>
                ))}
            </select>
            <label className={styles.label}>
                Upload video:
                <input 
                    type="file" 
                    accept="video/*" 
                    onChange={handleFileChange} 
                    className={styles.input} 
                    id="videoInput" 
                    ref={fileInputRef} 
                />
            </label>
            {uploadProgress > 0 && (
                <div className={styles.progressContainer}>
                    <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }}>
                        {uploadProgress}% 
                    </div>
                </div>
            )}
            <button type="submit" className={styles.button}>Upload Video</button>
        </form>
         {isUploading && (
            <div>
                <p>Uploading... {uploadProgress}%</p>
            </div>
        )}
        </div>
    );
}

export default VideoUploadForm;
