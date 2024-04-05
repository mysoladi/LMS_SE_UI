import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import axios from 'axios'; // Import axios for making API requests

export default function CoursesPageReject() {
  const [courses, setCourses] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const userRole = localStorage.getItem('user_role'); // Retrieve user_role from local storage

  useEffect(() => {
    const fetchCourses = async (role) => {
      try {
        const response = await axios.get('https://course-management-service.onrender.com/course/denied', {
          params: {
            user_role: role // Include user_role in the GET request params
          }
        });
        setCourses(response.data);

        // Calculate counts for each status
        let pending = 0;
        let approved = 0;
        let rejected = 0;
        response.data.forEach(course => {
          console.log(course.status)
          if (course.status == 'Pending') pending++;
          else if (course.status == 'Approved') approved++;
          else if (course.status == 'Denied') rejected++;
        });
        setPendingCount(pending);
        setApprovedCount(approved);
        setRejectedCount(rejected);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses(userRole); // Call fetchCourses with user_role from local storage
  }, [userRole]); // Include userRole in the dependency array to re-fetch courses if user_role changes

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
        <Button component={RouterLink} to="/dashboardAdmin/courseapproval" sx={{ justifyContent: 'start', my: 1 }}>Pending ({pendingCount})</Button>
        <Button component={RouterLink} to="/dashboardAdmin/courseapprovalapprove" sx={{ justifyContent: 'start', my: 1 }}>Approved ({approvedCount})</Button>
        <Button component={RouterLink} to="/dashboardAdmin/courseapprovalreject" sx={{ justifyContent: 'start', my: 1 }}>Rejected ({rejectedCount})</Button>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map(course => (
                <TableRow key={course.course_id}>
                  <TableCell>{course.course_id}</TableCell>
                  <TableCell>{course.course_name}</TableCell>
                  <TableCell>{course.course_description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
