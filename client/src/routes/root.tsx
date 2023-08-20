import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link} from "@mui/material";
import {Image, Photo} from "@mui/icons-material";


export default function Root(){
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Gibbie Inc.
                        </Typography>
                        <Link
                            color="inherit"
                            href="/login"
                            onClick={() => {
                                console.info("I'm a login button.");
                            }}
                        >
                            Login
                        </Link>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box>
                <img className={"welcomeImg"} src={"https://images.pexels.com/photos/3564390/pexels-photo-3564390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt={"welcomeImg"}/>
            </Box>
        </>
    )
}



/*
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Root() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

 */