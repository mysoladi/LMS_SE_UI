import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

export default function AddAssignment() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state)
    const [course, setCourse] = useState({
        course_id: location.state.courseId,
        title:'',
        description:'',
        due_date:'',
        file: null // New state to store the selected file
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse(prev => ({ ...prev, [name]: value }));
    };
    const handleDateChange = (newValue) => {
        // Format the date to YYYY-MM-DD using native JavaScript
        const formattedDate = newValue.toISOString().split('T')[0];
        setCourse((prev) => ({ ...prev, due_date: formattedDate }));
    };

    const handleFileChange = (e) => {
        // Store the selected file in the state
        setCourse((prev) => ({ ...prev, file: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(course)
        // Retrieve user_id and user_role from local storage
        var user_id = localStorage.getItem('id');
        var user_role = localStorage.getItem('user_role');

        if (!user_id || !user_role) {
            console.error('User ID or User Role not found in local storage.');
            return;
        }

        try {
            // Create a new FormData object to send the file along with other data
            const formData = new FormData();
            // formData.append('file', course.file); // Append the file to the form data
            formData.append('course_id', course.course_id);
            formData.append('title', course.title);
            formData.append('description', course.description);
            formData.append('due_date', course.due_date);
            formData.append('user_id', user_id);

            const response = await axios.post(`http://127.0.0.1:8000/assignment/add?user_id=${user_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set content type as multipart/form-data for file upload
                }
            });
            console.log('Announcement added successfully:', response.data);
            navigate('/dashboardInstructor/confirmation'); // Redirect to the course approval page or dashboard after submission
        } catch (error) {
            console.error('Error submitting announcement:', error);
        }
    };


    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={6} sx={{ my: 4, p: 4 }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Add New Assignment
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                    <TextField
                        margin="normal"
                        fullWidth
                        name="title"
                        label="Assignment Title"
                        multiline
                        rows={4}
                        value={course.course_description}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="description"
                        label="Assignment Description"
                        multiline
                        rows={4}
                        value={course.course_description}
                        onChange={handleChange}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                name="due-date"
                                label="Due Date"
                                value={course.due_date}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    {/* Add file input for uploading */}
                    {/*<input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />*/}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Add
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
