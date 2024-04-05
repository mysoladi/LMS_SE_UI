import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import axios from 'axios'; // Import axios for making API requests

export default function CourseForm() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    course_name: '',
    course_description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Retrieve user_id and user_role from local storage
    var user_id = localStorage.getItem('userId');
    var user_role = localStorage.getItem('user_role');
  
    if (!user_id || !user_role) {
      console.error('User ID or User Role not found in local storage.');
      return;
    }
  
    try {
      const response = await axios.post('https://course-management-service.onrender.com/course/add', course, {
        params: { user_id, user_role }, // Pass user_id and user_role as query parameters
      });
      console.log('Course added successfully:', response.data);
      navigate('/confirmation'); // Redirect to the course approval page or dashboard after submission
    } catch (error) {
      console.error('Error submitting course:', error);
    }
  };
  

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} sx={{ my: 4, p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {courseId ? 'Update Course' : 'Add New Course'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            fullWidth
            id="course_name"
            label="Course Name"
            name="course_name"
            value={course.course_name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="course_description"
            label="Course Description"
            multiline
            rows={4}
            value={course.course_description}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {courseId ? 'Update Course' : 'Submit New Course'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
