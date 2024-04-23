import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    styled,
    tableCellClasses
} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import {TfiAnnouncement} from "react-icons/tfi";
import {MdAssignment, MdOutlineChat} from "react-icons/md";

// StyledTableCell component with custom styling
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//     padding: theme.spacing(1),
//     fontWeight: "bold",
// }));
//
// // StyledTableRow component with custom styling
// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.background.default,
//     },
//     '&:nth-of-type(even)': {
//         backgroundColor: theme.palette.primary.light,
//     },
// }));
const StyledTable = styled(Table)(() => ({

}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const CourseHomePage = () => {
    const [assignments, setAssignments] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [calendarDate, setCalendarDate] = useState(new Date());
    const user_id = localStorage.getItem('id');
    const location = useLocation();
    const courseId = location.state && location.state.courseId;
    const course_name = location.state && location.state.course_name;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const assignmentsResponse = await axios.get(`https://course-management-service.onrender.com/assignment/?user_id=${user_id}&course_id=${courseId}`);
                const announcementsResponse = await axios.get(`https://course-management-service.onrender.com/announcement/?user_id=${user_id}&course_id=${courseId}`);

                setAssignments(assignmentsResponse.data);
                setAnnouncements(announcementsResponse.data);
            } catch (error) {
                console.error("Error fetching course details:", error);
            }
        };

        fetchCourseDetails();
    }, [courseId, user_id]);

    const hasAssignmentOrAnnouncement = (date) => {
        // Convert the date to string in yyyy-mm-dd format
        const dateString = date.toISOString().split('T')[0];

        // Check if there is an assignment or announcement on this date
        const hasAssignment = assignments.some(assignment => assignment.due_date === dateString);
        const hasAnnouncement = announcements.some(announcement => announcement.date === dateString);

        return hasAssignment || hasAnnouncement;
    };

    const handleAssignmentClick = (assignment) => {
        console.log(assignment);
        navigate('/dashboard/mycourses/AssignmentSubmission/assignment-submit');
    }
    const handleChat = () => {

        navigate('/');
    }
    return (
        <>
        <Box p={3}>
            <Typography variant='h4' gutterBottom style={{ color: "#1C4E80", fontFamily: "Arial", fontWeight: "bold", textAlign: "center" }}>{course_name}</Typography>

            <Box my={4} textAlign="center">
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Typography variant='h5' gutterBottom style={{ color: "#1C4E80", fontFamily: "Arial", fontWeight: "bold" }}>
                        Assignments
                    </Typography>
                    <MdAssignment size='25px' style={{ marginLeft: '10px' }} />
                </Box>
                {assignments.length === 0 ? (
                    <Typography style={{ color: "#1C4E80", fontFamily: "Arial" }}>No Assignments</Typography>
                ) : (
                    <StyledTable className='m-auto w-3/5!important'>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Title</StyledTableCell>
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell>Due Date</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {assignments.map((assignment) => (
                                <StyledTableRow key={assignment.id}>
                                    <TableCell className='hover:cursor-pointer hover:font-black' onClick={() => handleAssignmentClick(assignment)}>{assignment.title}</TableCell>
                                    <TableCell>{assignment.description}</TableCell>
                                    <TableCell>{assignment.due_date}</TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </StyledTable>
                )}
            </Box>

            <Box mb={4} textAlign="center">
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Typography variant="h5" gutterBottom style={{ color: "#1C4E80", fontFamily: "Arial", fontWeight: "bold" }}>
                        Announcements
                    </Typography>
                    <TfiAnnouncement size='25px' style={{ marginLeft: '10px' }} />
                </Box>
                <StyledTable className='m-auto w-3/5!important'>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell>Content</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {announcements.map((announcement) => (
                            <StyledTableRow key={announcement.id}>
                                <TableCell>{announcement.date}</TableCell>
                                <TableCell>{announcement.title}</TableCell>
                                <TableCell>{announcement.message}</TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </Box>

            <Box mt={8} style={{ maxWidth: 300, margin: 'auto' }} textAlign="center">
                <Typography variant="h5" gutterBottom style={{ color: "#1C4E80", fontFamily: "Arial", fontWeight: "bold" }}>Calendar</Typography>
                <Calendar
                    color='skyblue'
                    onChange={setCalendarDate}
                    value={calendarDate}
                    className="ml-auto mr-auto"
                    tileClassName={'.react-calendar__tile--active'?'border-radius:100%':''}
                    tileContent={({ date }) => hasAssignmentOrAnnouncement(date) ? <div className='m-auto' style={{ backgroundColor: '#b31212', borderRadius: '100%', width: '10px', height: '10px' }} /> : null}
                    calendarType="US"
                />
            </Box>
        </Box>
            <div className="hover:cursor-pointer"
                style={{position: 'fixed', bottom: '20px', right: '20px', zIndex: '999', borderRadius: '50%', backgroundColor: '#1976d2', padding: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}
                onClick={handleChat}>
                <MdOutlineChat size='45px' color='white'/>
            </div>

        </>
    );
};

export default CourseHomePage;
