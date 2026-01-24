import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Tooltip, useTheme } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useColorMode } from '../theme/ThemeContext';

const Header: React.FC = () => {
    const theme = useTheme();
    const { toggleColorMode } = useColorMode();

    return (
        <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Toolbar>
                <CodeIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
                    JSON Validator & Converter
                </Typography>
                <Box>
                    <Tooltip title="Toggle light/dark theme">
                        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="View Source">
                        <IconButton color="inherit" component="a" href="#" target="_blank">
                            <GitHubIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
