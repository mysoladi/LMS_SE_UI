import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Badge, Box, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function CoursesPage() {
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
        <Button component={RouterLink} to="#" sx={{ justifyContent: 'start', my: 1 }}>Pending </Button>
        <Button component={RouterLink} to="#" sx={{ justifyContent: 'start', my: 1 }}>Approved</Button>
        <Button component={RouterLink} to="#" sx={{ justifyContent: 'start', my: 1 }}>Rejected</Button>
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
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Example row - Repeat for each course */}
              <TableRow
                key="COURSE001"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">COURSE001</TableCell>
                <TableCell>Introduction to Computer Science</TableCell>
                <TableCell>John Smith</TableCell>
                <TableCell>This course provides an introduction to the field of computer science.</TableCell>
                <TableCell>
                  <IconButton color="success" size="large">
                    <CheckIcon />
                  </IconButton>
                  <IconButton color="error" size="large">
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              {/* Repeat TableRow for each course */}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
