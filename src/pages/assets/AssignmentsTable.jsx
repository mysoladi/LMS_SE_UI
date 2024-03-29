import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    // Typography,
} from "@mui/material";
import Box from '@mui/material/Box'
import {styled} from "@mui/system";


// const styles = (theme) => ({
//     tableContainer: {
//         maxHeight: 330
//     },
//     tableHeaderCell: {
//         backgroundColor: "#D7DBDD ",
//         fontWeight: "bold"
//     }
// });


// var baseUrl = "http://127.0.0.1:8000"



const AssignmentsTable = ({ classes }) => {
    const [assignments, setAssignments] = useState([]);

    // useEffect(() => {
    //     const fetchAssignments = async () => {
    //         try{
    //             const response = await fetch(baseUrl + `/api/getUserAssignment/?username=${localStorage.getItem("userId")}`, {
    //                 method: 'GET',
    //             });
    //             const data = await response.json();
    //             setAssignments(data.response);
    //             console.log('Assignment Table',data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     fetchAssignments();
    // }, []);

    return (
        <Box sx={{margin:2}}>
            <h2>Assignment</h2>
            <TableContainer className='tableContainer' component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell className='tableHeaderCell'>Course</TableCell>
                            <TableCell className='tableHeaderCell'>
                                Assignment
                            </TableCell>
                            <TableCell className='tableHeaderCell'>
                                Due Date
                            </TableCell>
                            <TableCell className='tableHeaderCell'>
                                Instructor
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assignments &&
                            assignments.length > 0 &&
                            assignments.map((assignment) => (
                                <TableRow key={assignment.id}>
                                    <TableCell>{assignment.CourseName}</TableCell>
                                    <TableCell>{assignment["Assignment Title"]}</TableCell>
                                    <TableCell>{assignment.DueDate}</TableCell>
                                    <TableCell>{assignment.ProfessorName}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AssignmentsTable;
