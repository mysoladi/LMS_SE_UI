import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import axios from 'axios'; // Import axios for making API requests

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const userRole = localStorage.getItem('user_role'); // Retrieve user_role from local storage
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    fetchCourses(userRole); // Initial fetch when component mounts
  }, [userRole]); // Include userRole in the dependency array to re-fetch courses if user_role changes

  const fetchCourses = async (role) => {
    try {
      const response = await axios.get('https://course-management-service.onrender.com/course/pending', {
        params: {
          user_role: role // Include user_role in the GET request params
        }
      });
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleApprove = async (courseId, userRole, userId) => {
    try {
      // Make PUT request to approve course with query parameters
      const response = await axios.put(`https://course-management-service.onrender.com/course/approve?user_id=${userId}&user_role=${userRole}`,  {
        course_id: courseId,
      });
  
      // Handle success response
      console.log('Course approved:', response.data);
      fetchCourses(userRole);
    } catch (error) {
      console.error('Error approving course:', error);
    }
  };

const handleDeny = async (courseId, userRole, userId) => {
    try {
      // Make PUT request to deny course with query parameters
      const response = await axios.put(`https://course-management-service.onrender.com/course/deny?user_id=${userId}&user_role=${userRole}`,  {
        course_id: courseId,
      });

      // Handle success response
      console.log('Course denied:', response.data);
      fetchCourses(userRole);
    } catch (error) {
      console.error('Error denying course:', error);
    }
  };

return (
  <Box sx={{ display: 'flex', height: '100vh' }}>
    {/* Sidebar */}
    <Box sx={{ width: '280px', borderRight: 1, borderColor: 'divider', px: 2 }}>
      <Toolbar>
        <MenuBookIcon sx={{ mr: 1 }} />
        <Typography variant="h6" noWrap component="div">
          Courses
        </Typography>
      </Toolbar>
      <Button component={RouterLink} to="/dashboardAdmin/courseapproval" sx={{ justifyContent: 'start', my: 1 }}>Pending</Button>
      <Button component={RouterLink} to="/dashboardAdmin/courseapprovalapprove" sx={{ justifyContent: 'start', my: 1 }}>Approved</Button>
      <Button component={RouterLink} to="/dashboardAdmin/courseapprovalreject" sx={{ justifyContent: 'start', my: 1 }}>Rejected</Button>
    </Box>

    {/* Main content */}
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper sx={{ mb: 2, display: 'flex', alignItems: 'center', width: '100%' }}>
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Courses"
          inputProps={{ 'aria-label': 'search courses' }}
        />
      </Paper>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Course ID</TableCell>
              <TableCell>Course Name</TableCell>
              <TableCell>Course Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map(course => (
              <TableRow key={course.course_id}>
                <TableCell>{course.course_id}</TableCell>
                <TableCell>{course.course_name}</TableCell>
                <TableCell>{course.course_description}</TableCell>
                <TableCell>
                  <IconButton color="success" size="large" onClick={() => handleApprove(course.course_id, userRole, userId)}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton color="error" size="large" onClick={() => handleDeny(course.course_id, userRole, userId)}>
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </Box>
);
}
