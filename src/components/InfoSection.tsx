import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Paper,
    Divider,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CodeIcon from '@mui/icons-material/Code';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import DevicesIcon from '@mui/icons-material/Devices';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

const features = [
    {
        icon: <CheckCircleOutlineIcon color="primary" sx={{ fontSize: 36 }} />,
        title: 'Instant JSON Validation',
        desc: 'Paste your JSON and get instant feedback. Errors are highlighted with exact line numbers so you can fix issues in seconds.',
    },
    {
        icon: <AutoFixHighIcon color="primary" sx={{ fontSize: 36 }} />,
        title: 'Format & Beautify',
        desc: 'Automatically format messy, minified JSON into clean, human-readable output with proper indentation.',
    },
    {
        icon: <CodeIcon color="primary" sx={{ fontSize: 36 }} />,
        title: 'Minify JSON',
        desc: 'Strip all whitespace from your JSON to produce compact output — perfect for APIs and data transfer.',
    },
    {
        icon: <SwapHorizIcon color="primary" sx={{ fontSize: 36 }} />,
        title: 'Convert JSON to YAML, CSV & XML',
        desc: 'Seamlessly convert JSON to YAML, CSV, or XML with a single click. Great for config files and data pipelines.',
    },
    {
        icon: <SpeedIcon color="primary" sx={{ fontSize: 36 }} />,
        title: 'Blazing Fast',
        desc: 'Everything runs locally in your browser — no server round-trips, no waiting. Results are instant.',
    },
    {
        icon: <SecurityIcon color="primary" sx={{ fontSize: 36 }} />,
        title: 'Completely Private',
        desc: 'Your data never leaves your device. JsonByte processes everything client-side, so your JSON stays 100% private.',
    },
    {
        icon: <DevicesIcon color="primary" sx={{ fontSize: 36 }} />,
        title: 'Works on Any Device',
        desc: 'Fully responsive design that works seamlessly on desktops, tablets, and mobile phones.',
    },
];

const faqs = [
    {
        q: 'What is JsonByte?',
        a: 'JsonByte is a free, browser-based JSON toolkit. It lets you validate, format, minify, and convert JSON to other formats like YAML, CSV, and XML — all without signing up or installing anything.',
    },
    {
        q: 'Is JsonByte free to use?',
        a: 'Yes, 100% free. There are no hidden fees, no usage limits, and no account required. Just open the site and start working.',
    },
    {
        q: 'Is my data safe when using JsonByte?',
        a: 'Absolutely. All processing happens entirely in your browser. Your JSON data is never sent to any server, ensuring complete privacy.',
    },
    {
        q: 'What formats can I convert JSON to?',
        a: 'JsonByte supports converting JSON to YAML, CSV, and XML. More formats may be added in the future.',
    },
    {
        q: 'Can I use JsonByte on mobile?',
        a: 'Yes! JsonByte is fully responsive and works great on smartphones and tablets.',
    },
    {
        q: 'Does JsonByte highlight JSON errors?',
        a: 'Yes. When your JSON is invalid, JsonByte highlights the exact line with the error so you can find and fix the problem quickly.',
    },
];

const steps = [
    { step: '1', title: 'Paste or type your JSON', desc: 'Enter your JSON data into the editor on the left.' },
    { step: '2', title: 'Validate instantly', desc: 'JsonByte checks your JSON in real time and highlights any errors.' },
    { step: '3', title: 'Format or minify', desc: 'Click "Format" to beautify or "Minify" to compress your JSON.' },
    { step: '4', title: 'Convert if needed', desc: 'Switch to the Converter tab to export your JSON as YAML, CSV, or XML.' },
];

const InfoSection: React.FC = () => {
    return (
        <Box component="section" sx={{ mt: 6, mb: 4 }} aria-label="About JsonByte">
            <Container maxWidth="xl">

                {/* About JsonByte */}
                <Box sx={{ textAlign: 'center', mb: 5 }}>
                    <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
                        About JsonByte
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ maxWidth: 720, mx: 'auto', lineHeight: 1.8 }}
                    >
                        <strong>JsonByte</strong> is a free, fast, and privacy-first online JSON tool designed for developers,
                        data engineers, and anyone who works with JSON data. Validate your JSON, format it for readability,
                        minify it for production, or convert it to YAML, CSV, and XML — all without ever leaving your browser.
                        No signup. No install. No data shared.
                    </Typography>
                </Box>

                <Divider sx={{ mb: 5 }} />

                {/* Features Grid */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h5" component="h3" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
                        Features
                    </Typography>
                    <Grid container spacing={3}>
                        {features.map((f) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={f.title}>
                                <Paper
                                    elevation={2}
                                    sx={{
                                        p: 3,
                                        height: '100%',
                                        borderRadius: 3,
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 6,
                                        },
                                    }}
                                >
                                    <Box sx={{ mb: 1.5 }}>{f.icon}</Box>
                                    <Typography variant="h6" fontWeight={600} gutterBottom>
                                        {f.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                                        {f.desc}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Divider sx={{ mb: 5 }} />

                {/* How to Use */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h5" component="h3" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
                        How to Use JsonByte
                    </Typography>
                    <Grid container spacing={2}>
                        {steps.map((item) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.step}>
                                <Paper elevation={1} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                                    <Typography
                                        variant="h3"
                                        component="span"
                                        fontWeight={800}
                                        color="primary.main"
                                        sx={{ opacity: 0.15, display: 'block', lineHeight: 1, mb: 1 }}
                                    >
                                        {item.step}
                                    </Typography>
                                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                                        {item.desc}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Divider sx={{ mb: 5 }} />

                {/* FAQ */}
                <Box>
                    <Typography variant="h5" component="h3" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
                        Frequently Asked Questions
                    </Typography>
                    <Grid container spacing={2}>
                        {faqs.map((faq) => (
                            <Grid size={{ xs: 12, md: 6 }} key={faq.q}>
                                <Paper elevation={1} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                                        {faq.q}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                                        {faq.a}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            </Container>
        </Box>
    );
};

export default InfoSection;
