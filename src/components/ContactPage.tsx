import React, { useEffect } from 'react';
import { Box, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const ContactPage: React.FC = () => {
    useEffect(() => {
        document.title = 'Contact | JsonByte';
        const metaDescriptionTag = document.querySelector('meta[name="description"]');
        if (metaDescriptionTag) {
            metaDescriptionTag.setAttribute(
                'content',
                'Contact JsonByte for feedback, support, or questions about the JSON tools and website.'
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
                            Contact Us
                        </Typography>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                            Need help or want to share feedback?
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                            We appreciate feedback from developers, students, and teams using JsonByte. If you have feature requests, bug reports, or questions about our online tools, reach out using the details below.
                        </Typography>
                    </Stack>

                    <Divider sx={{ my: 4 }} />

                    <Stack spacing={4}>
                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
                                Support and Feedback
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                Tell us about your experience using JsonByte! Suggestions for new converters, improved visual layout, or additional file export formats help us make the application better for everyone.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
                                Contact Channels
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                You can connect with our development team via our official GitHub repository discussions, issue tracker, or directly through the project repository pages linked in the header navigation.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
                                Reporting Bugs or Syntax Issues
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                When reporting a bug or parsing issue, please include a sanitized sample of the JSON snippet, your browser version, and the tool page URL where the issue occurred.
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
            <Footer />
        </Box>
    );
};

export default ContactPage;
