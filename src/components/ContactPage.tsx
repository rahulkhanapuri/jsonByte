import React, { useEffect } from 'react';
import { Box, Container, Divider, Paper, Stack, Typography } from '@mui/material';

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
                            Contact
                        </Typography>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                            Need help or want to share feedback?
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            If you have questions about JsonByte, suggestions for improvements, or issues with the tools, this page gives you the right place to reach out.
                        </Typography>
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                                Support and feedback
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Please send your feedback about the user experience, new JSON tools you would like to see, or any bugs you encounter while using the site.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                                Contact details
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                You can reach out through the website contact form or the contact options provided on the project pages. We typically reply to meaningful feedback and improvement suggestions.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                                What to include
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                A short description of the issue, the page or tool you were using, and any sample JSON helps us understand and fix the problem faster.
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};

export default ContactPage;
