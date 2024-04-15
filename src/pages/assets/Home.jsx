import React from 'react';
import { Box, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom
import CalendarStud from './CalendarStud';
import AssignmentsTable from './AssignmentsTable';
import AnnouncementsTable from './AnnouncementsTable';
import MyCourses from "../../components/MyCourses";

export default function DashboardHome() {
  const location = useLocation(); // Get the current location pathname

  const courseTitle = localStorage.getItem("course_name");
  console.log(courseTitle);

  return (
    <Box sx={{ marginLeft: 2 }}>
      <Grid container spacing={2}>
        {/* Routing section */}
        <Grid item xs={12}>
            {courseTitle && (
              <span className="font-semibold">{`${courseTitle}`}</span>
            )}
        </Grid>
        {/* Grid items for tables and calendar */}
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
