import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button,
    Collapse,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Box,
    Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useNavigate} from "react-router-dom";

function Row({ course,role }) {
    const [open, setOpen] = useState(false);
    const [announcements, setAnnouncements] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const user_id = localStorage.getItem('id');
    const navigate = useNavigate();

    // This function fetches announcements for a specific course based on its course_id
    const fetchAnnouncements = async (courseId) => {
        try {
            const url = `http://127.0.0.1:8000/announcement/?user_id=${user_id}&course_id=${courseId}`;
            const response = await axios.get(url);
            setAnnouncements(response.data);
        } catch (error) {
            console.error('Error fetching announcements for course ID:', courseId, error);
        }
    };
    const handleAddAnnouncement = () => {
        navigate('/dashboardInstructor/add-announcement', { state: { courseId: course.course_id } });
    };

    const handleAddAssignment = () => {
        navigate('/dashboardInstructor/add-assignment', { state: { courseId: course.course_id } });
        console.log('Add Assignment for Course ID:', course.course_id);
        // Navigate to add assignment page similar to announcements
    };

    useEffect(() => {
        if (open) {
            // Calls fetchAnnouncements for the specific course when the row is expanded
            fetchAnnouncements(course.course_id);
        }
    }, [open, course.course_id]);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {course.course_name}
                </TableCell>
                {role === 'Instructor' && (
                    <TableCell align="right">
                        <Button onClick={handleAddAnnouncement} variant="contained" color="primary">
                            Add Announcement
                        </Button>
                        <Button onClick={handleAddAssignment} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
                            Add Assignment
                        </Button>
                    </TableCell>
                )}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Announcements
                            </Typography>
                            {announcements.length > 0 ? (
                                announcements.map((announcement) => (
                                    <Typography key={announcement.id} paragraph>
                                        {announcement.title}: {announcement.message}
                                    </Typography>
                                ))
                            ) : (
                                <Typography variant="h6" paragraph>No announcements available for this course.</Typography>
                            )}

                            <Typography variant="h6" gutterBottom component="div">
                                Assignments
                            </Typography>
                            {assignments.length > 0 ? (
                                assignments.map((assignment) => (
                                    <Typography key={assignment.id} paragraph>
                                        {assignment.title}: {assignment.message}
                                    </Typography>
                                ))
                            ) : (
                                <Typography variant="h6" paragraph>No Assignments available for this course.</Typography>
                            )}
                        </Box>

                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

function CoursesTable({role}) {
    const [courses, setCourses] = useState([]);
    console.log(role);

    useEffect(() => {
        const fetchCourses = async () => {
            const user_id = localStorage.getItem('id');
            try {
                const response = await axios.get(`http://127.0.0.1:8000/course/?user_id=${user_id}`);
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="courses table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Course Name</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {courses.map((course) => (
                        <Row key={course.id} course={course} role={role}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CoursesTable;
