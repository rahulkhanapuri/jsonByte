import React, { useEffect } from 'react';
import { Box, Container, Divider, Paper, Stack, Typography } from '@mui/material';

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
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: { xs: 4, md: 6 } }}>
            <Container maxWidth="md">
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, md: 4 },
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 4,
                        bgcolor: 'background.paper',
                    }}
                >
                    <Stack spacing={2}>
                        <Typography variant="overline" color="primary.main" sx={{ letterSpacing: 2 }}>
                            Privacy Policy
                        </Typography>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                            Privacy Policy for JsonByte
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            This page explains how JsonByte works, what data is processed on your device, and how third-party services such as Google AdSense may behave on this website.
                        </Typography>
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                                1. Information we collect
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                JsonByte is a browser-based JSON toolkit. Most of the work happens directly in your browser. We do not usually collect personal information such as your name, email address, or uploaded files.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                                2. Data you enter
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                The JSON text you paste into the tool is processed locally in your browser. We do not send your content to our servers for analysis or storage in normal use.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                                3. Cookies and local storage
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                The site may use browser storage for preferences such as theme mode or other small settings. These are stored on your device and are not used to identify you personally.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                                4. Advertising
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                JsonByte may display advertisements through Google AdSense. Ad providers may use cookies and similar technologies to show relevant ads based on your browsing behavior. Please review Google’s privacy policies for details about ad personalization and data use.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                                5. Third-party services
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                We may use third-party services for hosting, analytics, or advertising. These services may collect technical information such as browser type, device information, IP address, and referral data as permitted by their own privacy policies.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                                6. Your choices
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                You can clear browser storage, block cookies, or use privacy tools in your browser to limit tracking. Please note that some features may not work correctly if you disable local storage or cookies.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                                7. Updates to this policy
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                We may update this policy from time to time to reflect changes in the site or legal requirements. The updated version will be available on this page.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                If you have questions about this Privacy Policy, please use the contact options available on the website.
                            </Typography>
                        </Box>
                    </Stack>

                    <Divider sx={{ my: 3 }} />
                    <Typography variant="body2" color="text.secondary">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default PrivacyPolicy;
