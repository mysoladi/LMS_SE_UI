import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const FileList = () => {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [grades, setGrades] = useState([]);

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        axios.get("http://localhost:8000/list-files/")
            .then(response => {
                setFiles(response.data);
                setGrades(new Array(response.data.length).fill('')); // Initialize grades
            })
            .catch(error => console.log("Error loading files:", error));
    }, []);

    const submitGrade = (fileIndex) => {
        const file = files[fileIndex];
        if (!file || file.id === undefined) {
            alert("Invalid file or missing file ID.");
            return; // Exit if file ID is undefined or file data is corrupted
        }
        const url = `https://course-management-service.onrender.com/update-grade/${file.id}/`;
        const payload = { grade: grades[fileIndex] };
    
        axios.post(url, payload)
            .then(response => {
                alert('Grade updated successfully!');
                // Optionally: update state to reflect the change on the UI
                // and ensure that the user cannot send multiple requests for the same file
            })
            .catch(error => {
                alert('Failed to update grade');
                console.error('Error updating grade:', error.response || error);
            });
    };
    

    const handleGradeChange = (fileIndex, grade) => {
        setGrades(prevGrades => {
            const newGrades = [...prevGrades];
            newGrades[fileIndex] = grade;
            return newGrades;
        });
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center' }}>Available Files</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {files.map((file, index) => (
                    <li key={file.id || `fallback-${index}`} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ flex: 1 }} onClick={() => setSelectedFile(`https://course-management-service.onrender.com${file.url}`)}>{file.name}</span>
                            <input type="number" value={grades[index]} onChange={(e) => handleGradeChange(index, e.target.value)} placeholder="Enter grade" style={{ marginRight: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px', width: '100px' }} />
                            <button onClick={(e) => { e.stopPropagation(); submitGrade(index); }} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
                                Submit Grade
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {selectedFile && (
                <div style={{ marginTop: '30px', border: '1px solid #ccc', borderRadius: '5px', padding: '20px' }}>
                    <Worker workerUrl={`${process.env.PUBLIC_URL}/pdf.worker.min.js`}>
                        <Viewer
                            fileUrl={selectedFile}
                            plugins={[defaultLayoutPluginInstance]}
                        />
                    </Worker>
                </div>
            )}
        </div>
    );
}

export default FileList;
