import {
    Box,
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography
} from "@mui/material";

export default function DashboardHomeAdmin() {

    return (
        <Box sx={{marginLeft:2}}>
            {/*<Grid container spacing={2} >*/}
            {/*    <Grid container spacing={2} sx={{ maxWidth: 2000, mt: 0 }}>*/}
            {/*        <CoursesPage />*/}
            {/*    </Grid>*/}
            {/*    <Grid container marginLeft={2}>*/}
                    <div style={{textAlign:"left"}}>
                        <span className='heading'>Welcome to EduNexa</span>
                    </div>
                
        </Box>
    );
}
