import React, { useMemo, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Tooltip, useTheme, Button, Menu, MenuItem, ListItemText } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useColorMode } from '../theme/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useLocation, useNavigate } from 'react-router-dom';


const Header: React.FC = () => {
    const { toggleColorMode, toggleSnowMode, snowMode } = useColorMode();
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const [converterAnchor, setConverterAnchor] = useState<null | HTMLElement>(null);

    const menuItems = useMemo(() => ([
        { label: 'JSON Validator', description: 'Validate, format, and minify JSON', path: '/json-validator' },
        { label: 'Graphical View', description: 'See your JSON in a visual structure tree', path: '/json-graphical-view' },
        { label: 'Size Checker', description: 'Check JSON size in bytes, KB, and MB', path: '/json-size-checker' },
    ]), []);
    const converterItems = useMemo(() => ([
        { label: 'JSON to CSV', description: 'Convert JSON arrays into CSV', path: '/json-to-csv' },
        { label: 'JSON to XML', description: 'Convert JSON data into XML', path: '/json-to-xml' },
        { label: 'JSON to YAML', description: 'Convert JSON data into YAML', path: '/json-to-yaml' },
    ]), []);

    const activeLabel = useMemo(
        () => {
            if (location.pathname === '/' || location.pathname === '/json-validator' || location.pathname === '/json-formatter' || location.pathname === '/json-minifier') {
                return 'JSON Validator';
            }

            if (location.pathname === '/json-size-in-bytes' || location.pathname === '/json-size-in-kb' || location.pathname === '/json-size-in-mb') {
                return 'Size Checker';
            }

            if (location.pathname === '/json-graphical-view') {
                return 'Graphical View';
            }

            if (location.pathname === '/json-to-csv' || location.pathname === '/json-to-xml' || location.pathname === '/json-to-yaml') {
                return 'Converter';
            }

            return menuItems.find((item) => item.path === location.pathname)?.label ?? 'Tools';
        },
        [location.pathname, menuItems]
    );

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setMenuAnchor(null);
    };

    const handleOpenConverterMenu = (event: React.MouseEvent<HTMLElement>) => {
        setConverterAnchor(event.currentTarget);
    };

    const handleCloseConverterMenu = () => {
        setConverterAnchor(null);
    };

    const handleNavigate = (path: string) => {
        navigate(path);
        handleCloseMenu();
        handleCloseConverterMenu();
    };

    return (
        <AppBar
            position="sticky"
            color="default"
            elevation={0}
            sx={{
                borderBottom: 1,
                borderColor: 'divider',
                top: 0,
                zIndex: 1100,
                bgcolor: 'background.paper',
                backdropFilter: 'blur(14px)',
            }}
        >
            <Toolbar sx={{ gap: 2, py: 1 }}>
                <Box
                    display="flex"
                    alignItems="center"
                    sx={{ cursor: 'pointer', minWidth: 'fit-content' }}
                    onClick={() => navigate('/json-validator')}
                >
                    <Box
                        component="img"
                        src="/jsonByte.png"
                        alt="JsonByte logo"
                        sx={{
                            width: 40,
                            height: 40,
                            objectFit: 'contain',
                            mr: 1.25,
                        }}
                    />

                    <Typography
                        variant="h6"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: "0.5px",
                            color: "text.primary",
                            fontSize: 20,
                            margin: 0,
                            lineHeight: 1,
                        }}
                    >
                        Json
                        <Box component="span" sx={{ color: "primary.main" }}>
                            Byte
                        </Box>
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        flexGrow: 1,
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'inline-flex',
                            gap: 0.75,
                            p: 0.75,
                            borderRadius: 999,
                            border: `1px solid ${theme.palette.divider}`,
                            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                            boxShadow: theme.palette.mode === 'dark'
                                ? '0 12px 30px rgba(0,0,0,0.24)'
                                : '0 12px 30px rgba(15,23,42,0.08)',
                        }}
                    >
                        {menuItems.map((item) => {
                            const isActive =
                                activeLabel === item.label &&
                                (location.pathname === item.path ||
                                    (item.path === '/json-validator' &&
                                        (location.pathname === '/' ||
                                            location.pathname === '/json-formatter' ||
                                            location.pathname === '/json-minifier')) ||
                                    (item.path === '/json-size-checker' &&
                                        (location.pathname === '/json-size-in-bytes' ||
                                            location.pathname === '/json-size-in-kb' ||
                                            location.pathname === '/json-size-in-mb')));

                            return (
                                <Button
                                    key={item.path}
                                    onClick={() => handleNavigate(item.path)}
                                    color="inherit"
                                    sx={{
                                        px: 2,
                                        py: 1,
                                        borderRadius: 999,
                                        fontWeight: 700,
                                        fontSize: 13,
                                        letterSpacing: '0.01em',
                                        color: isActive ? 'common.white' : 'text.secondary',
                                        bgcolor: isActive ? 'primary.main' : 'transparent',
                                        boxShadow: isActive ? '0 8px 22px rgba(144,202,249,0.32)' : 'none',
                                        '&:hover': {
                                            bgcolor: isActive ? 'primary.main' : 'action.hover',
                                            color: isActive ? 'common.white' : 'text.primary',
                                        },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            );
                        })}
                        <Button
                            color="inherit"
                            onClick={handleOpenConverterMenu}
                            endIcon={<KeyboardArrowDownIcon />}
                            sx={{
                                px: 2,
                                py: 1,
                                borderRadius: 999,
                                fontWeight: 700,
                                fontSize: 13,
                                letterSpacing: '0.01em',
                                color: activeLabel === 'Converter' ? 'common.white' : 'text.secondary',
                                bgcolor: activeLabel === 'Converter' ? 'primary.main' : 'transparent',
                                boxShadow: activeLabel === 'Converter' ? '0 8px 22px rgba(144,202,249,0.32)' : 'none',
                                '&:hover': {
                                    bgcolor: activeLabel === 'Converter' ? 'primary.main' : 'action.hover',
                                    color: activeLabel === 'Converter' ? 'common.white' : 'text.primary',
                                },
                            }}
                        >
                            Converter
                        </Button>
                    </Box>
                </Box>

                <IconButton
                    color="inherit"
                    onClick={handleOpenMenu}
                    sx={{
                        display: { xs: 'inline-flex', md: 'none' },
                        ml: 'auto',
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 3,
                    }}
                    aria-label="Open tools menu"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    anchorEl={menuAnchor}
                    open={Boolean(menuAnchor)}
                    onClose={handleCloseMenu}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    slotProps={{
                        paper: {
                            sx: {
                                mt: 1,
                                minWidth: 260,
                                borderRadius: 3,
                                border: `1px solid ${theme.palette.divider}`,
                                boxShadow: theme.palette.mode === 'dark'
                                    ? '0 20px 45px rgba(0,0,0,0.35)'
                                    : '0 20px 45px rgba(15,23,42,0.12)',
                            },
                        },
                    }}
                >
                    {converterItems.map((item) => (
                        <MenuItem
                            key={item.path}
                            selected={location.pathname === item.path}
                            onClick={() => handleNavigate(item.path)}
                            sx={{ py: 1.2, px: 1.5, borderRadius: 2, mx: 0.75, my: 0.25 }}
                        >
                            <ListItemText primary={item.label} secondary={item.description} />
                        </MenuItem>
                    ))}
                    {menuItems.map((item) => (
                        <MenuItem
                            key={item.path}
                            selected={location.pathname === item.path}
                            onClick={() => handleNavigate(item.path)}
                            sx={{ py: 1.2, px: 1.5, borderRadius: 2, mx: 0.75, my: 0.25 }}
                        >
                            <ListItemText primary={item.label} secondary={item.description} />
                        </MenuItem>
                    ))}
                </Menu>
                <Menu
                    anchorEl={converterAnchor}
                    open={Boolean(converterAnchor)}
                    onClose={handleCloseConverterMenu}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                    slotProps={{
                        paper: {
                            sx: {
                                mt: 1,
                                minWidth: 240,
                                borderRadius: 3,
                                border: `1px solid ${theme.palette.divider}`,
                                boxShadow: theme.palette.mode === 'dark'
                                    ? '0 20px 45px rgba(0,0,0,0.35)'
                                    : '0 20px 45px rgba(15,23,42,0.12)',
                            },
                        },
                    }}
                >
                    {converterItems.map((item) => (
                        <MenuItem
                            key={item.path}
                            selected={location.pathname === item.path}
                            onClick={() => handleNavigate(item.path)}
                            sx={{ py: 1.2, px: 1.5, borderRadius: 2, mx: 0.75, my: 0.25 }}
                        >
                            <ListItemText primary={item.label} secondary={item.description} />
                        </MenuItem>
                    ))}
                </Menu>
                <Box sx={{ display: 'flex', gap: 1, ml: { xs: 0, md: 1 } }}>
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
