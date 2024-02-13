import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './VideoForm.module.css';

function VideoUploadForm() {
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    //   const [loading,setloading]

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select a video file first!',
            });
            return;
        }

        const formData = new FormData();
        formData.append('video', file);

        try {
            await axios.post('http://localhost:8000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                },
            });
            Swal.fire(
                'Uploaded!',
                'Your video has been uploaded successfully.',
                'success'
            );
            setFile(null);
            setUploadProgress(0);
        } catch (error) {
            console.error('Error uploading video:', error);
            Swal.fire({
                icon: 'error',
                title: 'Upload failed',
                text: 'There was a problem uploading your video.',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formcontainer}>
            <label className={styles.label}>
                Upload video:
                <input type="file" accept="video/*" onChange={handleFileChange} className={styles.input} id="videoInput" />
            </label>
            {uploadProgress > 0 && (
                <div className={styles.progressContainer}>
                    <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }}>
                        {uploadProgress < 100 ? `${uploadProgress}%` : 'Processing...'}
                    </div>
                </div>
            )}
            <button type="submit" className={styles.button}>Upload Video</button>
        </form>
    );
}
export default VideoUploadForm
