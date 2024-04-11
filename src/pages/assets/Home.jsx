import React from 'react';
import { Box, Grid } from '@mui/material';
import CalendarStud from './CalendarStud';
import AssignmentsTable from './AssignmentsTable';
import AnnouncementsTable from './AnnouncementsTable';
import MyCourses from "../../components/MyCourses";
// Import CoursesPage if needed

export default function DashboardHome() {
  return (
    <Box sx={{ marginLeft: 2 }}>
      <Grid container spacing={2}>
        {/* Uncomment and adjust grid container structure if needed */}
        {/* <Grid item xs={12}> */}
        {/*   <CoursesPage /> */}
        {/* </Grid> */}
        {/* Grid item for Welcome message */}
        <Grid item xs={12}>
          <div style={{ textAlign: 'left' }}>
            <span className='heading'>Welcome to EduNexa</span>
          </div>
        </Grid>
        {/* Grid items for tables and calendar */}
        {/*<Grid item xs={12} md={6}>*/}
        {/*  <AssignmentsTable />*/}
        {/*</Grid>*/}
        {/*<Grid item xs={12} md={6}>*/}
        {/*  <AnnouncementsTable />*/}
        {/*</Grid>*/}
        <Grid item xs={12} md={4}>
          <CalendarStud />
        </Grid>
        <Grid item xs={12} md={8}>
          <MyCourses role="student" />
        </Grid>

      </Grid>
    </Box>
  );
}
