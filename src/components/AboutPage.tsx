import React, { useEffect } from 'react';
import { Box, Container, Divider, Paper, Stack, Typography } from '@mui/material';

const AboutPage: React.FC = () => {
    useEffect(() => {
        document.title = 'About | JsonByte';
        const metaDescriptionTag = document.querySelector('meta[name="description"]');
        if (metaDescriptionTag) {
            metaDescriptionTag.setAttribute(
                'content',
                'Learn about JsonByte, a free online JSON validator, formatter, converter, size checker, and graphical viewer.'
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
                            About JsonByte
                        </Typography>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                            Fast, free JSON tools for developers and learners.
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            JsonByte is built to make working with JSON quicker and simpler. Whether you are validating syntax, formatting messy payloads, converting formats, or visualizing nested structures, the tools are designed to stay lightweight and easy to use.
                        </Typography>
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    <Stack spacing={3}>
                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                                What you can do here
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Validate JSON, format and minify it, convert between JSON, CSV, XML, and YAML, measure file size in bytes/KB/MB, and explore complex JSON in a graphical view.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                                Why it exists
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                The goal is to provide practical utility without friction. All major tools run in the browser, making it quick to test snippets, inspect data, and share results with others.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                                Built for everyday use
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Developers, students, QA teams, and content creators can use JsonByte to inspect payloads, prepare exports, and clean up JSON before using it in applications or documentation.
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};

export default AboutPage;
