import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import styles from "./VideoHeader.module.css";

const PDFViewer = ({ apiUrl }) => {
    const [pdfUrl, setPdfUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { pdfId } = useParams(); 

    useEffect(() => {
        const fetchPdfDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://videocoursebackend.ssccglpinnacle.com/api/pdfs/${pdfId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                       
                    },
                });
        
                console.log("Response Status:", response.status);
                console.log("Content-Type Header:", response.headers.get('content-type'));
        
                if (!response.ok) {
                    throw new Error(`Failed to fetch PDF details: ${response.statusText}`);
                }
        
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    console.error("Received non-JSON response", response);
                    throw new TypeError("The response from the server is not JSON!");
                }
        
                const data = await response.json();
                setPdfUrl(data.cloudFrontUrl);
            } catch (error) {
                console.error("Error fetching PDF details:", error);
                setError("Failed to load PDF. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchPdfDetails();
    }, [apiUrl, pdfId]); 
    if (loading) {
        return <div>Loading PDF...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className={styles.pdfView}>
            <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                style={{ width: '100%', height: '100vh' }}
                title="PDF Viewer"
            ></iframe>
        </div>
        </>
    );
};

export default PDFViewer;
