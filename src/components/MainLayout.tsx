import React, { useState, useEffect, useCallback } from 'react';
import { Box, Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import JsonValidator from './JsonValidator';
import JsonConverter from './JsonConverter';
import JsonSizeChecker from './JsonSizeChecker';
import JsonGraphView from './JsonGraphView';
import InfoSection from './InfoSection';
import { useColorMode } from '../theme/ThemeContext';
import Snowfall from 'react-snowfall';
import { useLocation } from 'react-router-dom';
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
    const location = useLocation();
    const { snowMode } = useColorMode();
    const [wind, setWind] = useState<[number, number]>([0, 1]);
    // Map routes to tab indices
    const getTabIndex = (pathname: string) => {
        if (pathname === '/json-to-csv' || pathname === '/json-to-xml' || pathname === '/json-to-yaml') return 1;
        if (pathname === '/json-size-checker' || pathname === '/json-size-in-bytes' || pathname === '/json-size-in-kb' || pathname === '/json-size-in-mb') return 2;
        if (pathname === '/json-graphical-view') return 3;
        return 0; // default to Validator for /, /json-validator, /json-formatter, /json-minifier
    };
    const value = getTabIndex(location.pathname);
    // Update document title and meta tags based on route for SEO
    useEffect(() => {
        let title = "Free Online JSON Validator & Converter  | JsonByte";
        let desc = "100% free online JSON tools — validate, format, beautify, minify, and convert JSON to YAML, CSV, XML and more.";
        switch (location.pathname) {
            case '/json-validator':
                title = "Free JSON Validator Online | JsonByte";
                desc = "Quickly validate your JSON data online. Pinpoint syntax errors, highlight missing brackets, and format your JSON code — all for free.";
                break;
            case '/json-formatter':
                title = "Free JSON Formatter & Beautifier | JsonByte";
                desc = "Beautify, format, and organize unreadable JSON code instantly. The definitive online JSON formatter, 100% free.";
                break;
            case '/json-minifier':
                title = "Free JSON Minifier & Compressor | JsonByte";
                desc = "Compress JSON data and remove all spaces/newlines for smaller file sizes. Completely free online JSON minifer tool.";
                break;
            case '/json-to-csv':
                title = "Convert JSON to CSV Online Free | JsonByte";
                desc = "Instantly convert JSON arrays to CSV format online. Fast, secure, browser-based conversion. No registration required.";
                break;
            case '/json-to-xml':
                title = "Convert JSON to XML Online Free | JsonByte";
                desc = "Instantly convert JSON data to XML format online. Fast, secure, browser-based conversion. No registration required.";
                break;
            case '/json-to-yaml':
                title = "Convert JSON to YAML Online Free | JsonByte";
                desc = "Instantly convert JSON data to YAML format online. Fast, secure, browser-based conversion. No registration required.";
                break;
            case '/json-size-checker':
                title = "Free JSON Size Checker Online | JsonByte";
                desc = "Instantly check the size of your JSON data in Bytes, KB, and MB. See character count, line count, and minified size — 100% free.";
                break;
            case '/json-size-in-bytes':
                title = "Check JSON Size in Bytes Online Free | JsonByte";
                desc = "Instantly measure your JSON file size in Bytes. Paste your JSON and get the exact byte count — 100% free, no signup.";
                break;
            case '/json-size-in-kb':
                title = "Check JSON Size in KB Online Free | JsonByte";
                desc = "Instantly measure your JSON file size in Kilobytes (KB). Paste your JSON and get the precise KB size — 100% free, no signup.";
                break;
            case '/json-size-in-mb':
                title = "Check JSON Size in MB Online Free | JsonByte";
                desc = "Instantly measure your JSON file size in Megabytes (MB). Paste your JSON and get the exact MB size — 100% free, no signup.";
                break;
            case '/json-graphical-view':
                title = "JSON Graphical View Online Free | JsonByte";
                desc = "Visualize your JSON as an expandable structure tree. Explore nested objects and arrays in a clean graphical view.";
                break;
        }
        document.title = title;
        const metaDescriptionTag: HTMLMetaElement | null = document.querySelector('meta[name="description"]');
        if (metaDescriptionTag) {
            metaDescriptionTag.content = desc;
        }
        // Update canonical URL based on route
        const canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
        if (canonicalTag) {
            const path = location.pathname === '/' ? '' : location.pathname;
            canonicalTag.href = `https://jsonbyte.com${path}`;
        }
    }, [location.pathname]);
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
        const windValue = normalizedX * 3;
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
            <Container component="main" maxWidth={value === 3 ? false : "xl"} sx={{ mt: 4, mb: 4, flexGrow: 1, ...(value === 3 && { px: { xs: 2, lg: '50px' } }) }}>
                <TabPanel value={value} index={0}>
                    <JsonValidator />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <JsonConverter defaultTargetFormat={
                        location.pathname === '/json-to-csv' ? 'csv' :
                            location.pathname === '/json-to-xml' ? 'xml' :
                                location.pathname === '/json-to-yaml' ? 'yaml' : 'yaml'
                    } />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <JsonSizeChecker />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <JsonGraphView />
                </TabPanel>
                <InfoSection />
            </Container>
            <Footer />
        </Box>
    );
};
export default MainLayout;
