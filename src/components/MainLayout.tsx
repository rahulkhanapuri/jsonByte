import React, { useState } from 'react';
import { Box, Tabs, Tab, Container, Paper } from '@mui/material';
import Header from './Header';
import JsonValidator from './JsonValidator';
import JsonConverter from './JsonConverter';

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
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const MainLayout: React.FC = () => {
    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Header />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
                        <Tab label="Validator" />
                        <Tab label="Converter" />
                    </Tabs>
                </Paper>
                <TabPanel value={value} index={0}>
                    <JsonValidator />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <JsonConverter />
                </TabPanel>
            </Container>
        </Box>
    );
};

export default MainLayout;
