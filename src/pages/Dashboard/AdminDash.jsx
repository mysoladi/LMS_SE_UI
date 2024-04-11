import {useEffect, useState} from "react";
import {Box, Collapse, Grid, Typography} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { MdExpandMore } from "react-icons/md";
import DOMPurify from 'dompurify';
const AdminDashboard = () => {
    const [courses, setCourses] = useState([]);
    const adminid = localStorage.getItem('id');
    const userType = localStorage.getItem("user_role");
    const [showMessage, setShowMessage] = useState(false);
    const [approve,setApprove] = useState(true);

    const[coursenm, setCoursenm] = useState();

    const [expanded, setExpanded] = useState({});
    const handleExpandClick = (courseId) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [courseId]: !prevExpanded[courseId],
        }));
    };

    const getAllCourses = async () => {

        try {
            const response = await fetch('https://course-management-service.onrender.com/course/pending?user_role='+userType, {
                method: 'GET',
            });
            const data = await response.json();
            if (response.status === 200) {
                setCourses(data);
                console.log(data);
            }
            else {
                console.log('failed');
                console.log(data.response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllCourses();
    }, []);

    const handleClick = async ({course,isApproved})=>{
        console.log(course,isApproved);
        setCoursenm(course.courseName);
        let link;
        if (isApproved){
            link = 'approve';
        }
        else{
            link = 'deny';
        }
        try {
            const response = await fetch(`https://course-management-service.onrender.com/course/${link}?user_id=${adminid}&user_role=${userType}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "course_id": course.course_id
                }),
            });
            console.log('checl')
            const data = await response.json();
            if (response.status === 200) {
                console.log(data.message);
                getAllCourses();
                setShowMessage(!!isApproved);
                setTimeout(() => {
                    setShowMessage(false);
                }, 2000);
            }
            else {
                console.log('failed');
                console.log(data.response);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box mt={3} ml={3} mr={3} >
            <Grid container justifyContent="space-between">
                <Grid item>
                    <Typography variant='string' fontWeight="bold">Admin View - Approve Courses</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1} mt={4} >
                {showMessage && (
                    <Grid container justifyContent="center">
                        <Typography variant="h6" fontWeight="bold" color="success.main">
                            {coursenm} approved successfully!
                        </Typography>
                    </Grid>
                )}
                {courses && (courses.map((course) => (
                    <Card sx={{ width: "100%", mb: 1, backgroundColor: "#f5f5f5" }}>
                        <CardContent>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item>
                                    <Typography variant="h6" >
                                        {course.course_name}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary" sx={{borderColor: "primary.main", textTransform: "none",marginRight: 1,}}
                                            onClick={()=>handleClick({course: course, isApproved: true})}>
                                        Approve
                                    </Button>
                                    <Button variant="outlined" color="primary" sx={{borderColor: "primary.main", textTransform: "none",marginRight: 1,}}
                                            onClick={()=>handleClick({course: course, isApproved: false})}>
                                        Reject
                                    </Button>

                                    <IconButton
                                        onClick={() => handleExpandClick(course.courseId)}
                                        aria-expanded={expanded[course.courseId]}
                                        aria-label="show more"
                                    >
                                        <MdExpandMore />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Collapse in={expanded[course.courseId]} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Description:
                                </Typography>
                                <Typography paragraph> {course.course_description}</Typography>
                                {/*<Typography variant="subtitle1" color="text.secondary">*/}
                                {/*    Professor:*/}
                                {/*</Typography>*/}
                                {/*<Typography paragraph>{course.professorName}</Typography>*/}
                            </CardContent>
                        </Collapse>
                    </Card>
                )))}

                {(courses.length === 0) && (
                    <Grid container justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                        <Typography variant="h6" fontStyle="italic" align="center"
                                    color="text.disabled"> No courses to approve </Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default AdminDashboard;