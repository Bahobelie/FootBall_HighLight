import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import image from '../assets/Logo.png';
import SidBar from "./SidBar";
import Menu from "./Menu";

export default function PrimarySearchAppBar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{
                backgroundColor: '#363636',
                mt: 2, ml: 4, mr: 4, p: 2,
                justifyContent: 'center',
                alignItems: 'center',
                width:'95%',
                border:'1px solid black',
                borderRadius:'8px'
            }}>
                <Toolbar>
                    <img src={image} width={'40'} alt={'image'}/>
                    <Typography sx={{ fontSize: '35px',ml:4 }}>
                        Football Highlights
                    </Typography>
                </Toolbar>
            </AppBar>
            <SidBar />
        </Box>
    );
}
