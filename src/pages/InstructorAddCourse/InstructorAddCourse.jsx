import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';

// Assuming you have a function to fetch a course by ID and to save a course
// import { fetchCourseById, saveCourse } from '../api/courses';

export default function CourseForm() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    id: '',
    title: '',
    author: '',
    description: '',
  });

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (courseId) {
        // Simulate fetching course details. Replace this with  actual API call.
        console.log("Fetching course details for: ", courseId);
        // const fetchedCourse = await fetchCourseById(courseId);
        // setCourse(fetchedCourse);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting course: ", course);
    // Simulate saving the course. Replace this with actual API call.
    // await saveCourse(course);
    navigate('/courseapproval'); // Redirect to the course approval page or dashboard after submission
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
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            value={course.title}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="author"
            label="Author"
            name="author"
            autoComplete="author"
            value={course.author}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="description"
            label="Description"
            id="description"
            autoComplete="description"
            multiline
            rows={4}
            value={course.description}
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
