import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChatIcon from "@mui/icons-material/Chat";
import { useEffect,  useCallback } from "react";
import { deepOrange, deepPurple } from "@mui/material/colors";
import ChatSend from "../../components/ChatSend";
import ExtendedNavbar from "../../components/ExtendedNavbar";
import CourseBoxes from "../../components/CourseBoxes";
import JoinedCourseBoxes from "../../components/JoinedCourseBoxes";
import DashboardHome from "../../pages/assets/Home";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { alpha } from '@mui/material/styles';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


import SearchComponent  from "../../pages/Search/Search";
import { Navigate } from 'react-router-dom';


import SecondDrawer from "../../components/SecondDashboardDrawer";


import axios from "axios";
import { useCalendarState } from "@mui/x-date-pickers/internals";
import {debounce} from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "left",
    justifyContent: "flex-start",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

const ContentContainer = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    p: 3,
    pl: `calc(${theme.spacing(7)} + 1px)`, // Adjust padding-left to start after the sidebar
    pt: `calc(${theme.mixins.toolbar.minHeight}px + 1rem)`, // Adjust top padding to start below the header
    transition: "padding-left 0.3s ease", // Adding transition for padding-left
}));




export default function Dashboard(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [activeMenu, setActiveMenu] = React.useState(0);
    const [showProfile, setShowProfile] = React.useState(false);
    const [isSecondDrawerOpen, setIsSecondDrawerOpen] = useState(false); // Initial state set to closed
    const [searchTerm, setSearchTerm] = React.useState('');
    const [courses, setCourses] = useState([]);

    const handleLogout = async () => {
        // Optional: API call to backend to invalidate the session
        // const response = await fetch('/api/logout', { method: 'POST' });

        // Clear user data from storage
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');

        // Update global state if using (e.g., Context API or Redux)

        // Redirect to the login page
        navigate('/login');
    };


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerOpen = () => {
        setIsSecondDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsSecondDrawerOpen(false);
    };

    const handleSearchChange = useCallback(debounce((event) => {
        setSearchTerm(event.target.value);
        if (event.target.value.length > 2) { // Optionally, only search when there are 3 or more characters
            fetchCourses(event.target.value);
        } else {
            setCourses([]); // Clear results if the input is cleared or less than 3 characters
        }
    },300),[]);

    const fetchCourses = async (query) => {
        try {
            const response = await fetch(`http://127.0.0.1:8081/course/search/?q=${encodeURIComponent(query)}`);
            if (response.ok) {
                const data = await response.json();
                setCourses(data.courses);
            } else {
                throw new Error('Failed to fetch courses');
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };




    const handleSecondDrawerOpen = () => {
        setIsSecondDrawerOpen(!isSecondDrawerOpen); // Toggle the state when the icon is clicked
    };

    const handleSecondDrawerClose = () => {
        setIsSecondDrawerOpen(false);
    };

    console.log('isSecondDrawerOpen:', isSecondDrawerOpen); // Add this line for debugging




    var userFullName = localStorage.getItem("username");
    var name = userFullName || "User";

    const navigate = useNavigate();
    const location = useLocation();

    const access_ele = {
        Dashboard: "/",
        Home: "/",
        "My Courses": "/mycourses",
        "Browse": "/coursebrowse",
        Profile: "/profile",
        Chat: "/chat",
    };
    useEffect(() => {
        // This function will run every time the location changes
    }, [location.pathname]);

    const handleselection = (text) => {
        const basePath = location.pathname.split("/")[0];
        navigate(basePath + "/dashboard" + access_ele[text]);
    };

    const shouldRenderCourseBoxes = location.pathname.includes("/coursebrowse");

    const shouldRenderHomeDashboard = location.pathname.includes("dashboard/coursebrowse");
    const shouldRenderHomeDashboardbool = location.pathname.includes("dashboard/");

    const shouldRenderDashboardProps = location.pathname.includes("viewcourse/");




    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                open={open}
                sx={{
                    top: 0, // Start from the top of the screen
                    backgroundColor: "#1C4E80 !important",
                    color: "#ffffff !important",
                    zIndex: theme.zIndex.drawer,
                }}

            >
                <Toolbar sx={{paddingLeft: theme.spacing(2), display: "flex", justifyContent: "space-between"}}>
                    {/* Left-aligned content */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        style={{cursor: "pointer"}}
                        onClick={() => handleselection("Dashboard")}
                        paddingLeft={"3rem"}
                    >
                        Dashboard
                    </Typography>
                    <SearchComponent placeholder="Search…" onChange={handleSearchChange}/>


                    {/* Right-aligned content */}
                    <div sx={{display: "flex", alignItems: "center", p: 0}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            sx={{marginRight: -2}}
                        >
                            <AccountCircle/>
                        </IconButton>

                        {/* Menu component */}
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => handleselection("Profile")}>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>

            </AppBar>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader sx={{alignItems: "center", flexDirection: "column"}}>
                    <Avatar
                        sx={{
                            bgcolor: deepOrange[100],
                            color: deepPurple[600],
                            marginTop: 2,
                        }}
                    >
                        {name.charAt(0).toUpperCase()}
                    </Avatar>

                    <List>
                        <ListItem disablePadding>
                            <ListItemText
                                primary={name}
                                sx={{
                                    paddingLeft: 0.5, // Adjust the left margin
                                    paddingRight: 0.5, // Adjust the right margin
                                    fontSize: "5rem",
                                    color: "#1C4E80", // Set text color to blue
                                }}
                            />
                        </ListItem>
                    </List>
                </DrawerHeader>
                <Divider />
                <List>
                    {[
                        { text: "Home", icon: <HomeIcon /> },
                        { text: "Browse", icon: <AutoStoriesIcon /> },
                    ].map((item, index) => (
                        <ListItem
                            key={item.text}
                            disablePadding
                            onClick={() => handleselection(item.text)}
                        >

                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                }}
                            >
                                <Divider />

                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : "auto",
                                        justifyContent: "center",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{
                                        fontSize: "9rem", // Adjust the font size as needed for a smaller size
                                        fontWeight: 600, // Make the text bold
                                        color: "#1C4E80", // Match the color of the app header
                                        textAlign: "center",
                                        position: "absolute",
                                        bottom: "calc(-1.5 * 0.6rem)", // Position the text slightly above the bottom
                                        left: "50%", // Center the text under the icon
                                        transform: "translateX(-50%)", // Center horizontally
                                        width: "100%", // Ensure the text takes the full width of the ListItem
                                        whiteSpace: "nowrap", // Prevent text wrapping
                                        overflow: "hidden", // Hide overflow if text is too long
                                        textOverflow: "ellipsis", // Add ellipsis (...) if text overflows
                                    }}

                                />
                            </ListItemButton>
                        </ListItem>

                    ))}

                </List>
            </Drawer>

            {
                shouldRenderDashboardProps && (
                    <div>
                        <SecondDrawer isOpen={isSecondDrawerOpen} onClose={handleSecondDrawerClose} />
                        <ExtendedNavbar handleDrawerOpen={handleSecondDrawerOpen} isSecondDrawerOpen={isSecondDrawerOpen} />
                    </div>
                )
            }

            <Box
                sx={{
                    flexGrow: 1,
                    p: 3,
                    pl: `5rem`, // Add left padding to start after the sidebar
                    pt: `calc(${theme.mixins.toolbar.minHeight}px + 1rem)`, // Add top padding to start below the header
                    overflow: "auto",
                    // Add additional styling if needed
                }}
            >
                <ContentContainer
                    sx={{
                        paddingLeft: isSecondDrawerOpen ? `${drawerWidth}px` : `calc(${theme.spacing(7)} + 1px)`, // Adjust padding-left based on drawer state
                    }}
                >

                    {!shouldRenderHomeDashboard && shouldRenderHomeDashboardbool && !shouldRenderDashboardProps && <JoinedCourseBoxes courses={courses} />}

                    {shouldRenderCourseBoxes && <CourseBoxes searchCourses={courses} />}

                    {
                        shouldRenderDashboardProps && <div><DashboardHome/></div>
                    }
                    {/* Your content goes here */}
                </ContentContainer>
            </Box>

        </Box>
    );
}

