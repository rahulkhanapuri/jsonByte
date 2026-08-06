import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Paper,
    Divider,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CodeIcon from '@mui/icons-material/Code';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import DevicesIcon from '@mui/icons-material/Devices';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BugReportIcon from '@mui/icons-material/BugReport';
import StorageIcon from '@mui/icons-material/Storage';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useLocation } from 'react-router-dom';
import AdSenseBanner from './AdSenseBanner';

const generalFeatures = [
    {
        icon: <CheckCircleOutlineIcon color="primary" sx={{ fontSize: 32 }} />,
        title: 'Instant JSON Validation',
        desc: 'Detect syntax errors in real time with line and column highlighting based on standard RFC 8259 specifications.',
    },
    {
        icon: <AutoFixHighIcon color="primary" sx={{ fontSize: 32 }} />,
        title: 'Format & Beautify',
        desc: 'Re-indent messy, minified JSON payloads into clean multiline trees with configurable space/tab indents.',
    },
    {
        icon: <CodeIcon color="primary" sx={{ fontSize: 32 }} />,
        title: 'Minify & Compress',
        desc: 'Strip unnecessary whitespace and line breaks to optimize JSON byte sizes for API calls and storage.',
    },
    {
        icon: <DataUsageIcon color="primary" sx={{ fontSize: 32 }} />,
        title: 'UTF-8 Size Calculator',
        desc: 'Measure exact JSON string sizes in Bytes, KB, and MB with line count and character breakdown.',
    },
    {
        icon: <SwapHorizIcon color="primary" sx={{ fontSize: 32 }} />,
        title: 'CSV, YAML & XML Converters',
        desc: 'Convert JSON structures to tabular CSV, clean YAML configurations, or XML node trees in one click.',
    },
    {
        icon: <AccountTreeIcon color="primary" sx={{ fontSize: 32 }} />,
        title: 'Graphical Tree Explorer',
        desc: 'Visualize complex nested JSON payloads as interactive, expandable node graphs powered by React Flow.',
    },
    {
        icon: <SpeedIcon color="primary" sx={{ fontSize: 32 }} />,
        title: 'Blazing Fast Execution',
        desc: 'All parsing and transformations execute in client-side memory using high-performance JavaScript engines.',
    },
    {
        icon: <SecurityIcon color="primary" sx={{ fontSize: 32 }} />,
        title: '100% Client-Side Privacy',
        desc: 'Zero server uploads or background data logging. Your JSON data never leaves your device memory.',
    },
    {
        icon: <DevicesIcon color="primary" sx={{ fontSize: 32 }} />,
        title: 'Cross-Device Responsive',
        desc: 'Optimized touch and desktop Monaco Editor controls for seamless editing on mobile, tablet, or PC.',
    },
];

const generalSteps = [
    { step: '1', title: 'Paste or Load JSON', desc: 'Enter raw JSON text into the Monaco editor or load sample payloads.' },
    { step: '2', title: 'Real-time Linting', desc: 'Syntax errors, missing quotes, or trailing commas are highlighted instantly.' },
    { step: '3', title: 'Format, Minify or Convert', desc: 'Choose your desired operation (Format, Minify, CSV, YAML, XML, or Size Check).' },
    { step: '4', title: 'Copy or Download Output', desc: 'Export formatted output, download converted files, or copy to clipboard.' },
];

const InfoSection: React.FC = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const isValidatorOrFormatter = pathname === '/' || pathname === '/json-validator' || pathname === '/json-formatter' || pathname === '/json-minifier';
    const isConverter = pathname === '/json-to-csv' || pathname === '/json-to-yaml' || pathname === '/json-to-xml';
    const isSizeChecker = pathname === '/json-size-checker' || pathname === '/json-size-in-bytes' || pathname === '/json-size-in-kb' || pathname === '/json-size-in-mb';
    const isGraphView = pathname === '/json-graphical-view';

    return (
        <Box component="section" sx={{ mt: 5, mb: 4 }} aria-label="Publisher Content & Developer Guides">
            <Container maxWidth="xl">
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, md: 5 },
                        borderRadius: 4,
                        border: 1,
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                    }}
                >
                    {/* DYNAMIC PUBLISHER CONTENT BASED ON ROUTE */}
                    {isValidatorOrFormatter && (
                        <Box>
                            <Box sx={{ mb: 4 }}>
                                <Chip icon={<MenuBookIcon />} label="Comprehensive Technical Guide" color="primary" variant="outlined" sx={{ mb: 2, fontWeight: 600 }} />
                                <Typography variant="h4" component="h2" fontWeight={800} gutterBottom>
                                    JSON Validator, Formatter & Minifier — Complete Technical Guide
                                </Typography>
                                <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                                    JavaScript Object Notation (JSON) is the global standard for data exchange across modern microservices, RESTful APIs, GraphQL endpoints, and web applications. Governed by <strong>RFC 8259</strong> and <strong>ECMA-404</strong> standards, JSON mandates strict syntax formatting. Even minor syntax violations—such as a misplaced comma, single quotes around keys, or unescaped newlines—cause catastrophic runtime exceptions such as <code>SyntaxError: Unexpected token...</code> across JavaScript, Python, Java, Go, C#, and PHP backends.
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 4 }} />

                            <Grid container spacing={4}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'action.hover', border: 1, borderColor: 'divider', height: '100%' }}>
                                        <Box display="flex" alignItems="center" gap={1} mb={2}>
                                            <BugReportIcon color="error" />
                                            <Typography variant="h6" fontWeight={700}>
                                                Common JSON Syntax Errors
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                                            <strong>1. Trailing Commas:</strong> Adding a trailing comma after the last property (e.g., <code>{`{"id": 1, "name": "JsonByte",}`}</code>) is valid in JavaScript objects but strictly illegal in JSON standards.
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                                            <strong>2. Single Quotes:</strong> JSON requires double quotation marks (<code>"key": "value"</code>). Using single quotes (<code>'key': 'value'</code>) throws a parsing exception.
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                                            <strong>3. Unquoted Keys:</strong> Keys must be enclosed in double quotes (<code>{`"name": "Alice"`}</code>). Omitting quotes around object keys is invalid.
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                            <strong>4. Non-Standard Values:</strong> Special floating-point literals such as <code>NaN</code>, <code>Infinity</code>, or <code>undefined</code> are not supported in valid JSON documents.
                                        </Typography>
                                    </Paper>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'action.hover', border: 1, borderColor: 'divider', height: '100%' }}>
                                        <Box display="flex" alignItems="center" gap={1} mb={2}>
                                            <CompareArrowsIcon color="primary" />
                                            <Typography variant="h6" fontWeight={700}>
                                                Formatting (Beautify) vs. Minification
                                            </Typography>
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                                            <strong>JSON Formatting (Pretty-Printing):</strong> Re-formats compact or unorganized JSON strings into clean, multi-line tree views with consistent 2-space or 4-space indentation. This greatly improves visual scanning during debugging, code reviews, and technical documentation creation.
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                                            <strong>JSON Minification (Compressing):</strong> Removes all non-essential whitespace, line breaks, and space padding. Minifying JSON payloads can reduce byte length by <strong>20% to 50%</strong>, lowering network bandwidth consumption, improving HTTP transfer speeds, and optimizing database storage footprint.
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 4, mb: 2 }}>
                                <Typography variant="h6" fontWeight={700} gutterBottom>
                                    Syntax Comparison Table
                                </Typography>
                                <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                                    <Table size="small">
                                        <TableHead sx={{ bgcolor: 'action.hover' }}>
                                            <TableRow>
                                                <TableCell><strong>Format Type</strong></TableCell>
                                                <TableCell><strong>Structure Sample</strong></TableCell>
                                                <TableCell><strong>Primary Use Case</strong></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Raw Minified JSON</TableCell>
                                                <TableCell><code>{`{"status":"success","data":[1,2,3]}`}</code></TableCell>
                                                <TableCell>API Payloads, Database Storage, Bandwidth Savings</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Formatted JSON (2 spaces)</TableCell>
                                                <TableCell><code>{`{\n  "status": "success",\n  "data": [1, 2, 3]\n}`}</code></TableCell>
                                                <TableCell>Debugging, Documentation, Visual Code Reviews</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                    )}

                    {isConverter && (
                        <Box>
                            <Box sx={{ mb: 4 }}>
                                <Chip icon={<SwapHorizIcon />} label="Data Transformation Reference" color="primary" variant="outlined" sx={{ mb: 2, fontWeight: 600 }} />
                                <Typography variant="h4" component="h2" fontWeight={800} gutterBottom>
                                    JSON Data Converters — CSV, YAML & XML Conversion Standards
                                </Typography>
                                <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                                    Data pipelines, software architectures, and analytical platforms frequently require translating JSON objects into tabular spreadsheets (CSV), configuration manifests (YAML), or structured markup documents (XML). JsonByte handles these multi-format conversions completely client-side in your browser, maintaining strict data fidelity without uploading files to remote servers.
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 4 }} />

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'action.hover', border: 1, borderColor: 'divider', height: '100%' }}>
                                        <Typography variant="h6" fontWeight={700} color="primary.main" gutterBottom>
                                            JSON to CSV Conversion
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                                            Converts JSON arrays of objects into comma-separated tabular values according to <strong>RFC 4180</strong> guidelines. Column headers are generated from JSON keys. Ideal for importing API datasets into Microsoft Excel, Google Sheets, PostgreSQL, and SQL Server tables.
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'action.hover', border: 1, borderColor: 'divider', height: '100%' }}>
                                        <Typography variant="h6" fontWeight={700} color="primary.main" gutterBottom>
                                            JSON to YAML Conversion
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                                            Serializes JSON structures into clean, human-readable YAML documents. Essential for DevOps and cloud engineers managing Kubernetes manifests (<code>deployment.yaml</code>), Docker Compose files, Ansible playbooks, and GitHub Actions CI/CD workflows.
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'action.hover', border: 1, borderColor: 'divider', height: '100%' }}>
                                        <Typography variant="h6" fontWeight={700} color="primary.main" gutterBottom>
                                            JSON to XML Conversion
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                                            Maps JSON property trees into nested XML element nodes with start and end tags. Crucial for integrating legacy enterprise SOAP APIs, RSS/Atom feeds, Android layout resources, and financial software systems.
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    {isSizeChecker && (
                        <Box>
                            <Box sx={{ mb: 4 }}>
                                <Chip icon={<StorageIcon />} label="UTF-8 Size & Memory Analytics" color="primary" variant="outlined" sx={{ mb: 2, fontWeight: 600 }} />
                                <Typography variant="h4" component="h2" fontWeight={800} gutterBottom>
                                    JSON Size Checker & Payload Calculator — Bytes, KB & MB
                                </Typography>
                                <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                                    Measuring exact JSON payload sizes is essential when engineering high-performance Web APIs, microservices, and serverless functions. Under standard <strong>UTF-8 text encoding</strong>, standard ASCII characters require <strong>1 Byte</strong> each, whereas non-Latin scripts, mathematical symbols, and multi-byte emojis consume <strong>2 to 4 Bytes</strong> per character. String length alone does not accurately reflect binary network bandwidth usage.
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 4 }} />

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'action.hover', border: 1, borderColor: 'divider', height: '100%' }}>
                                        <Typography variant="h6" fontWeight={700} color="primary.main" gutterBottom>
                                            1. Size in Bytes (B)
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                                            The fundamental binary unit of data storage (1 Byte = 8 bits). Used to evaluate low-level socket buffers, webhook payloads, and individual database record storage overhead.
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'action.hover', border: 1, borderColor: 'divider', height: '100%' }}>
                                        <Typography variant="h6" fontWeight={700} color="primary.main" gutterBottom>
                                            2. Size in Kilobytes (KB)
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                                            Calculated using binary standard conversion (1 KB = 1024 Bytes). Critical for monitoring REST API endpoint response sizes and client-side HTTP payload transfers.
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'action.hover', border: 1, borderColor: 'divider', height: '100%' }}>
                                        <Typography variant="h6" fontWeight={700} color="primary.main" gutterBottom>
                                            3. Size in Megabytes (MB)
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                                            Calculated as 1 MB = 1024 KB (1,048,576 Bytes). Essential when auditing large batch dataset files, database exports, and serverless payload limits (e.g., AWS API Gateway 10MB limit).
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    {isGraphView && (
                        <Box>
                            <Box sx={{ mb: 4 }}>
                                <Chip icon={<AccountTreeIcon />} label="Interactive Data Visualization" color="primary" variant="outlined" sx={{ mb: 2, fontWeight: 600 }} />
                                <Typography variant="h4" component="h2" fontWeight={800} gutterBottom>
                                    JSON Graphical View — Visual Tree Diagram Explorer
                                </Typography>
                                <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                                    Reading deeply nested JSON documents with complex arrays and child sub-objects in raw text format can be overwhelming. The JSON Graphical View parses your payload into an interactive node-and-edge graph diagram. Powered by <strong>React Flow</strong> and <strong>Dagre layout algorithms</strong>, you can expand, collapse, and visually inspect object hierarchies with ease.
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 4 }} />

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'action.hover', border: 1, borderColor: 'divider', height: '100%' }}>
                                        <Typography variant="h6" fontWeight={700} gutterBottom>
                                            Key Features of Graphical Explorer
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                                            • <strong>Expand & Collapse Nodes:</strong> Click on nested object or array nodes to expand sub-trees or collapse branches for easy visual navigation.
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                                            • <strong>Color-Coded Types:</strong> Instantly differentiate between Strings, Numbers, Booleans, Objects, and Arrays with distinct theme colors.
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                            • <strong>Auto-Layout Positioning:</strong> Automatic hierarchical layout positioning prevents overlapping nodes even on large datasets.
                                        </Typography>
                                    </Paper>
                                </Grid>

                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'action.hover', border: 1, borderColor: 'divider', height: '100%' }}>
                                        <Typography variant="h6" fontWeight={700} gutterBottom>
                                            Developer Use Cases
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                                            • <strong>GraphQL Response Auditing:</strong> Inspect complex GraphQL query responses and deeply nested field aliases visually.
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                                            • <strong>State Management Debugging:</strong> Trace Redux, Zustand, or React state trees to locate state anomalies.
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                            • <strong>Teaching & Documentation:</strong> Explain complex API schemas and data contracts visually to team members.
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    {/* ADVERTISMENT BANNER LOCATED DIRECTLY ALONGSIDE PUBLISHER CONTENT */}
                    <Box sx={{ my: 5 }}>
                        <AdSenseBanner />
                    </Box>

                    <Divider sx={{ my: 5 }} />

                    {/* GENERAL FEATURES GRID */}
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h5" component="h3" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
                            Why Developers Choose JsonByte
                        </Typography>
                        <Grid container spacing={3}>
                            {generalFeatures.map((f) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={f.title}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 3,
                                            height: '100%',
                                            borderRadius: 3,
                                            border: 1,
                                            borderColor: 'divider',
                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                            '&:hover': {
                                                transform: 'translateY(-4px)',
                                                boxShadow: 4,
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

                    <Divider sx={{ my: 5 }} />

                    {/* HOW TO USE STEP BY STEP */}
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h5" component="h3" fontWeight={700} gutterBottom sx={{ mb: 3 }}>
                            How to Use JsonByte Step-by-Step
                        </Typography>
                        <Grid container spacing={2}>
                            {generalSteps.map((item) => (
                                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.step}>
                                    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, height: '100%', border: 1, borderColor: 'divider', bgcolor: 'action.hover' }}>
                                        <Typography
                                            variant="h3"
                                            component="span"
                                            fontWeight={800}
                                            color="primary.main"
                                            sx={{ opacity: 0.2, display: 'block', lineHeight: 1, mb: 1 }}
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

                    <Divider sx={{ my: 5 }} />

                    {/* EXPANDABLE FAQ ACCORDIONS FOR ALL ROUTES */}
                    <Box>
                        <Box display="flex" alignItems="center" gap={1} mb={3}>
                            <LightbulbIcon color="primary" />
                            <Typography variant="h5" component="h3" fontWeight={700}>
                                Frequently Asked Questions (FAQ)
                            </Typography>
                        </Box>

                        <Accordion elevation={0} sx={{ border: 1, borderColor: 'divider', mb: 1.5, borderRadius: '12px !important' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography fontWeight={600}>What is JsonByte and how does it work?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                                    JsonByte is a free, web-based JSON developer suite. It allows software engineers, data analysts, and students to validate, format, minify, convert (CSV, YAML, XML), measure size in Bytes/KB/MB, and visually explore JSON structures directly in the browser.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion elevation={0} sx={{ border: 1, borderColor: 'divider', mb: 1.5, borderRadius: '12px !important' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography fontWeight={600}>Is my JSON data kept 100% private and secure?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                                    Yes, completely. All parsing, validation, formatting, and conversion operations run locally in your browser memory using client-side JavaScript. Your JSON data is never sent to any remote server or stored in any database.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion elevation={0} sx={{ border: 1, borderColor: 'divider', mb: 1.5, borderRadius: '12px !important' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography fontWeight={600}>Why does JSON validation fail on single quotes or trailing commas?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                                    The official JSON standard (RFC 8259) strictly requires double quotes for string property keys and string values. Single quotes and trailing commas after object/array items are illegal in standard JSON, even though they are allowed in JavaScript objects.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion elevation={0} sx={{ border: 1, borderColor: 'divider', mb: 1.5, borderRadius: '12px !important' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography fontWeight={600}>How does JSON to CSV conversion handle nested objects?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                                    When converting JSON arrays to CSV format, flat key-value pairs become column headers. Nested objects or arrays are flattened or serialized into stringified cells to preserve tabular column alignment for Excel and database imports.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion elevation={0} sx={{ border: 1, borderColor: 'divider', mb: 1.5, borderRadius: '12px !important' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography fontWeight={600}>What is the difference between string length and JSON byte size?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                                    String length counts the number of characters in a string. However, under UTF-8 encoding, special symbols, accented characters, and emojis take up between 2 and 4 Bytes each. JsonByte's Size Checker measures the exact UTF-8 binary byte length of your payload.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion elevation={0} sx={{ border: 1, borderColor: 'divider', mb: 1.5, borderRadius: '12px !important' }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography fontWeight={600}>Is JsonByte free to use for commercial and personal projects?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                                    Yes! JsonByte is 100% free with no registration requirements, no paid tiers, and no hidden usage limits.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default InfoSection;
