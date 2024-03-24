import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';

const defaultCourse = {
  id: '',
  title: '',
  author: '',
  description: '',
};

export default function CourseFormDemo({ existingCourse, onSubmit }) {
  const [course, setCourse] = useState(defaultCourse);

  useEffect(() => {
    // If existingCourse is provided, we're updating an existing course
    if (existingCourse) {
      setCourse(existingCourse);
    }
  }, [existingCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(course);
    if (!existingCourse) {
      // Reset form if adding a new course
      setCourse(defaultCourse);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={6} sx={{ my: 4, p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {existingCourse ? 'Update Course' : 'Add New Course'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="id"
            label="Course ID"
            name="id"
            autoComplete="off"
            autoFocus={!existingCourse}
            value={course.id}
            onChange={handleChange}
            disabled={!!existingCourse} // Disable editing ID if updating
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="off"
            value={course.title}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="author"
            label="Author"
            name="author"
            autoComplete="off"
            value={course.author}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
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
            {existingCourse ? 'Update' : 'Submit'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
