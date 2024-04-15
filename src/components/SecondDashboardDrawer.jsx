import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AnnouncementsIcon from '@mui/icons-material/Announcement';
import ChatIcon from '@mui/icons-material/Chat';

const SecondDrawer = ({ isOpen, onClose }) => {
    return (
        <Drawer
            variant="temporary"
            open={isOpen}
            onClose={onClose}
            sx={{ width: '240px', flexShrink: 0, zIndex: 0 }}
        >
            <Toolbar /> {/* Placeholder for proper alignment */}
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Assignments" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AnnouncementsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Announcements" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <ChatIcon />
                    </ListItemIcon>
                    <ListItemText primary="Chat" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default SecondDrawer;
