import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Typography, TextField, Button, Box, Snackbar, Alert } from '@mui/material';

const AssignmentSubmission = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [comment, setComment] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('comment', comment);

    const csrfToken = Cookies.get('csrftoken');

    try {
      await axios.post('https://course-management-service.onrender.com/fileuploads/', formData, {
        withCredentials: true,
      });

      setSnackbarMessage('Success: File uploaded successfully');
      setSnackbarSeverity('success');
    } catch (error) {
      let errorMessage = 'Unknown error';
      if (error.response && error.response.data) {
        errorMessage = error.response.data.detail || JSON.stringify(error.response.data);
      }
      setSnackbarMessage(`Error: ${errorMessage}`);
      setSnackbarSeverity('error');
    } finally {
      setOpenSnackbar(true);
      setFile(null);
      setFileName('');
      setComment('');
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Box my={4} textAlign="center">
        <Typography variant="h4" gutterBottom>Assignment Submission</Typography>
        <Typography variant="subtitle1" gutterBottom>Due: Fri Apr 12, 2024 11:59pm</Typography>
        <Typography variant="subtitle1" gutterBottom>100 Points Possible</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Button variant="contained" component="label" fullWidth sx={{ marginBottom: 2 }}>
          Choose File
          <input type="file" hidden onChange={handleFileChange} />
          {fileName && <Typography variant="caption" display="block">{fileName}</Typography>}
        </Button>
        <TextField
          label="Add a comment (optional)"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={comment}
          onChange={handleCommentChange}
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>Submit Assignment</Button>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AssignmentSubmission;
