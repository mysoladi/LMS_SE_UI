// Importing necessary components from Material UI and other custom components
import React from "react";
import {
    Box,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Paper
} from "@mui/material";
import CalendarStud from "./CalendarStud";
import AssignmentsTable from "./AssignmentsTable";
import AnnouncementsTable from "./AnnouncementsTable";

// CoursesPage import - using the uncommented import as it seems to be the most recent change
import CoursesPage from "../AdminCourseApproval/CourseApproval";
import MyCourses from "../../components/MyCourses";

export default function DashboardHomeInstructor() {
    return (
        <Box sx={{ flexGrow: 1, m: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        Welcome to EduNexa, Instructor
                    </Typography>
                </Grid>
                {/*<Grid item xs={12} md={6} lg={4}>*/}
                {/*    <Paper elevation={3}>*/}
                {/*        <CalendarStud />*/}
                {/*    </Paper>*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12} md={6} lg={8}>*/}
                {/*    <Card>*/}
                {/*        <CardActionArea>*/}
                {/*            <CardContent>*/}
                {/*                <AssignmentsTable />*/}
                {/*            </CardContent>*/}
                {/*        </CardActionArea>*/}
                {/*    </Card>*/}
                {/*</Grid>*/}
                {/*<Grid item xs={12} md={6} lg={4}>*/}
                {/*    <Card>*/}
                {/*        <CardActionArea>*/}
                {/*            <CardContent>*/}
                {/*                <AnnouncementsTable />*/}
                {/*            </CardContent>*/}
                {/*        </CardActionArea>*/}
                {/*    </Card>*/}
                    <MyCourses role="Instructor"/>
                {/*</Grid>*/}
            </Grid>
        </Box>
    );
}
