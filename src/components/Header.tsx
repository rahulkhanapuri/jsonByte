import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Tooltip, useTheme } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useColorMode } from '../theme/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import DataObjectIcon from '@mui/icons-material/DataObject';
import DataArrayIcon from '@mui/icons-material/DataArray';

const Header: React.FC = () => {
    const { toggleColorMode, toggleSnowMode, snowMode } = useColorMode();
    const theme = useTheme(); // Ensuring theme is defined if not already

    return (
        <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', top: 0, zIndex: 1100, bgcolor: 'background.paper' }}>
            <Toolbar>
                <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
                    <DataObjectIcon
                        sx={{
                            mr: 1,
                            fontSize: 28,
                            color: 'primary.main',
                        }}
                        />

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: "0.5px",
                            color: "text.primary",
                        }}
                    >
                        JSON{" "}
                        <Box component="span" sx={{ color: "primary.main" }}>
                        LAB
                        </Box>{" "}
                        PRO
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {theme.palette.mode === 'dark' ? <Tooltip title={snowMode ? "Disable Snow" : "Enable Snow"}>
                        <IconButton onClick={toggleSnowMode} color={snowMode ? "primary" : "inherit"}>
                            <AcUnitIcon />
                        </IconButton>
                    </Tooltip> : <></>}
                    <Tooltip title="Toggle light/dark theme">
                        <IconButton onClick={toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                        </IconButton>
                    </Tooltip>
                    {/* <Tooltip title="View Source">
                        <IconButton color="inherit" component="a" href="#" target="_blank">
                            <GitHubIcon />
                        </IconButton>
                    </Tooltip> */}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
