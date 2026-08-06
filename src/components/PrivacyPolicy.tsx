import React, { useEffect } from 'react';
import { Box, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const PrivacyPolicy: React.FC = () => {
    useEffect(() => {
        document.title = 'Privacy Policy | JsonByte';
        const metaDescriptionTag = document.querySelector('meta[name="description"]');
        if (metaDescriptionTag) {
            metaDescriptionTag.setAttribute(
                'content',
                'Privacy Policy for JsonByte. Learn how we handle your data, cookies, ads, and local browser-based JSON tools.'
            );
        }
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Header />
            <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 6, flexGrow: 1 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, md: 5 },
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 4,
                        bgcolor: 'background.paper',
                    }}
                >
                    <Stack spacing={2}>
                        <Typography variant="overline" color="primary.main" sx={{ letterSpacing: 2, fontWeight: 700 }}>
                            Privacy & Transparency
                        </Typography>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                            Privacy Policy for JsonByte
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                            This page explains how JsonByte operates as a privacy-first web utility, what data processing occurs on your local device, and how third-party services like Google AdSense function on this website.
                        </Typography>
                    </Stack>

                    <Divider sx={{ my: 4 }} />

                    <Stack spacing={4}>
                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
                                1. Client-Side Processing & Zero Server Uploads
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                JsonByte is designed so that all data parsing, validation, formatting, minification, conversions (CSV/YAML/XML), size calculations, and graph visualisations execute entirely inside your local web browser using client-side JavaScript. Your JSON input data is never transmitted to any external server or stored in any database.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
                                2. Data Security & Storage
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                Because all operations run client-side, your confidential API tokens, customer records, database exports, and configuration secrets remain strictly within your device's browser memory. We do not collect or save user text inputs.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
                                3. Local Storage & Theme Settings
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                The website may use standard browser `localStorage` or `sessionStorage` solely to remember user display preferences such as dark mode, light mode, or snowfall animation toggles. No personally identifiable information is stored in local storage.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
                                4. Advertising & Google AdSense Cookies
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                JsonByte displays advertisements served by Google AdSense to support server hosting and development. Google AdSense uses cookies and device identifiers to serve personalized and non-personalized advertisements based on user visits to this and other websites on the internet. You can manage your ad personalization settings at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
                                5. Third-Party Analytics & Infrastructure
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                Third-party service providers (such as hosting networks or web analytics platforms like Google Tag Manager) may collect standard technical metadata including IP addresses, browser user agents, referring pages, and timestamp request data as permitted by their privacy policies.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
                                6. Contact & Updates
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                If you have questions regarding this Privacy Policy or data handling practices, please refer to our Contact page. This privacy policy may be updated periodically to reflect software enhancements or regulatory standards.
                            </Typography>
                        </Box>
                    </Stack>

                    <Divider sx={{ my: 4 }} />
                    <Typography variant="body2" color="text.secondary">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </Typography>
                </Paper>
            </Container>
            <Footer />
        </Box>
    );
};

export default PrivacyPolicy;
