import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/system";

const baseUrl = "https://edusphere.vercel.app";


const theme = createTheme({
    // Customize your theme here
});

const StyledCalendar = styled(Calendar)(({ theme }) => ({
    borderWidth: "0 !important",
    width: '450px',
    "& .react-calendar__viewContainer": {
        "& .react-calendar__tile--active": {
            borderRadius: "4px",
            backgroundColor: "#01a8b8 !important",
        },
        "& .react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth)": {
            color: "#333",
        },
        "& .react-calendar__year-view__months__month": {
            color: "#000 ",
        },
        "& .react-calendar__tile--now": {
            color: "#01a8b8 !important",
            backgroundColor: "rgba(0,0,0,0) !important",
        },
    },
    "& .react-calendar__navigation": {
        backgroundColor: "#1C4E80",
        "& .react-calendar__navigation__arrow": {
            color: "#ffffff",
            "&:enabled": {
                "&:hover, &:focus": {
                    backgroundColor: "#E5E7E9 !important",
                    color: "#000",
                },
            },
        },
        "& .react-calendar__navigation__label": {
            color: "#ffffff",
            "&:enabled": {
                "&:hover, &:focus": {
                    backgroundColor: "#E5E7E9 !important",
                    color: "#000",
                },
            },
        },
    },
}));

export default function CalendarStud() {
    // const classes = useClasses(styles);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [assignments, setAssignments] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const courseId = useState();

    const fetchAnnouncements = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/'+ `api/announcement/?user_id=${localStorage.getItem("id")}&course_id=${courseId}`, {
                method: 'GET',
            });
            const data = await response.json();
            setAnnouncements(data.response);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAssignments = async () => {
        try {
            const response = await fetch(baseUrl +`/api/getUserAssignment/?username=${localStorage.getItem("userId")}`, {
                method: 'GET',
            });
            const data = await response.json();
            setAssignments(data.response);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    async function fetchCalenderViewData(date){
        try {
            const response = await fetch( baseUrl+ `/api/calendarView/?username=${localStorage.getItem("userId")}&date=${date}`, {
                method: 'GET',
            });
            const data = await response.json();

            setAssignments(data.Assignments);
            setAnnouncements(data.Announcements);

            console.log("fetchCalenderViewData : ",data);
        } catch (error) {
            console.error(error);
        }
    }

    // const handleDateClick = (date) => {
    //   setSelectedDate(date);
    //   fetchAssignments(date);
    //   fetchAnnouncements(date);
    // };

    const handleDateClick = (date) => {
        // console.log("selectd date : ",date)
        let month = (date.getMonth() + 1).toString().padStart(2, "0");
        let day = date.getDate().toString().padStart(2, "0");
        let year = date.getFullYear();
        let formattedDate = `${year}-${month}-${day}`;
        // var newDate = date.getFullYear() + "-" + (parseInt(date.getMonth()) + 1) + "-" + date.getDate()
        setSelectedDate(date);
        fetchCalenderViewData(formattedDate);
    };

    useEffect(() => {
        fetchAnnouncements();
        // fetchAssignments();
    }, []);



    return (
        <>
            <ThemeProvider theme={theme}>
                <h2>Calendar</h2>
                <StyledCalendar onClickDay={handleDateClick} />
                {/*<div>*/}
                {/*    <h2>Assignments</h2>*/}
                {/*    {assignments.length === 0 ? (*/}
                {/*        <p>No assignments due on {selectedDate.toLocaleDateString()}</p>*/}
                {/*    ) : (*/}
                {/*        <ul>*/}
                {/*            <table style={{ borderCollapse: "collapse", width: "100%" }}>*/}
                {/*                <thead>*/}
                {/*                <tr style={{ backgroundColor: "#f7f7f7" }}>*/}
                {/*                    <th style={{ border: "1px solid #ccc", padding: "10px" }}>Course Name</th>*/}
                {/*                    <th style={{ border: "1px solid #ccc", padding: "10px" }}>Assignment Title</th>*/}
                {/*                    <th style={{ border: "1px solid #ccc", padding: "10px" }}>Due Date</th>*/}
                {/*                </tr>*/}
                {/*                </thead>*/}
                {/*                <tbody>*/}
                {/*                {assignments.map((a) => (*/}
                {/*                    <tr key={a.assignmentTitle}>*/}
                {/*                        <td style={{ border: "1px solid #ccc", padding: "10px" }}>{a.courseName}</td>*/}
                {/*                        <td style={{ border: "1px solid #ccc", padding: "10px" }}>{a.assignmentTitle}</td>*/}
                {/*                        <td style={{ border: "1px solid #ccc", padding: "10px" }}>{a.dueDate}</td>*/}
                {/*                    </tr>*/}
                {/*                ))}*/}
                {/*                </tbody>*/}
                {/*            </table>*/}
                {/*        </ul>*/}
                {/*    )}*/}
                {/*</div>*/}
                <div>
                    <h2>Announcements</h2>
                    {announcements.length === 0 ? (
                        <p>No announcements on {selectedDate.toLocaleDateString()}</p>
                    ) : (
                        <ul>
                            <table style={{ borderCollapse: "collapse", width: "100%" }}>
                                <thead>
                                <tr style={{ backgroundColor: "#f7f7f7" }}>
                                    <th style={{ border: "1px solid #ccc", padding: "10px" }}>Course Name</th>
                                    <th style={{ border: "1px solid #ccc", padding: "10px" }}>Announcement Title</th>
                                    <th style={{ border: "1px solid #ccc", padding: "10px" }}>Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {announcements.map((a) => (
                                    <tr key={a.announcementTitle}>
                                        <td style={{ border: "1px solid #ccc", padding: "10px" }}>{a.courseName}</td>
                                        <td style={{ border: "1px solid #ccc", padding: "10px" }}>{a.announcementTitle}</td>
                                        <td style={{ border: "1px solid #ccc", padding: "10px" }}>{a.dateCreated}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </ul>
                    )}
                </div>
            </ThemeProvider>
        </>
    );
}
