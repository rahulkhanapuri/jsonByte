import React, { useEffect } from 'react';
import { Box, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

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
                            About JsonByte
                        </Typography>
                        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                            Fast, free, privacy-first JSON tools for developers.
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                            JsonByte is a modern developer platform designed for validating, formatting, minifying, converting, measuring, and visually exploring JSON data. Built with performance and privacy at its core, all processing runs 100% locally in your browser.
                        </Typography>
                    </Stack>

                    <Divider sx={{ my: 4 }} />

                    <Stack spacing={4}>
                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
                                Comprehensive Developer Capabilities
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                                Working with JSON shouldn't mean copying private payloads to random backend servers. JsonByte solves this by handling syntax validation, pretty-printing formatting, minification, CSV/YAML/XML conversions, UTF-8 byte calculations, and tree graphing directly inside your browser session using web standards and client-side processing engines.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
                                Why Privacy & Client-Side Processing Matter
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                                API payloads, user data, config files, and backend logs often contain sensitive database fields, user tokens, or proprietary structures. JsonByte guarantees that zero data is ever uploaded, logged, or sent to external servers. Your JSON stays strictly inside your device's memory.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
                                Built for Modern Software Teams
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                Software engineers, data analysts, DevOps specialists, QA testers, and students use JsonByte every day to clean up API responses, convert data pipelines, inspect webhook sizes, and format configuration files effortlessly.
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
            <Footer />
        </Box>
    );
};

export default AboutPage;
