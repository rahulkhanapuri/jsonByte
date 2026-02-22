import React, { useState, useEffect, useCallback } from 'react';
import { Box, Tabs, Tab, Container, Paper } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import JsonValidator from './JsonValidator';
import JsonConverter from './JsonConverter';
import { useColorMode } from '../theme/ThemeContext';
import Snowfall from 'react-snowfall';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: { xs: 2, md: 3 } }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const MainLayout: React.FC = () => {
    const [value, setValue] = useState(0);
    const { snowMode } = useColorMode();
    const [wind, setWind] = useState<[number, number]>([0, 1]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        // Calculate wind based on horizontal mouse position
        // Map mouse X (0 to window.innerWidth) => wind (-3 to 3)
        const normalizedX = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
        const windValue = normalizedX * 3; // -3 to 3
        setWind([windValue - 0.5, windValue + 0.5]);
    }, []);

    useEffect(() => {
        if (snowMode) {
            window.addEventListener('mousemove', handleMouseMove);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [snowMode, handleMouseMove]);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            {snowMode && <Snowfall
                wind={wind}
                style={{
                    position: 'fixed',
                    width: '100vw',
                    height: '100vh',
                    zIndex: 1000
                }}
            />}
            <Header />
            <Container component="main" maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered aria-label="JSON tools">
                        <Tab label="JSON Validator" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                        <Tab label="JSON Converter" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
                    </Tabs>
                </Paper>
                <TabPanel value={value} index={0}>
                    <JsonValidator />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <JsonConverter />
                </TabPanel>
            </Container>
            <Footer />
        </Box>
    );
};

export default MainLayout;
