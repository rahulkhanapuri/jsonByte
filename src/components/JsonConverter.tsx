import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Box, Button, Select, MenuItem, FormControl, InputLabel, Alert, IconButton, Tooltip, useTheme, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import yaml from 'js-yaml';

const exampleJson = JSON.stringify(
    {
        user: { id: 101, name: "Rahul", role: "admin", active: true },
        tools: ["Validator", "Formatter", "Converter"],
        settings: { theme: "dark", notifications: true }
    },
    null,
    2
);
import { js2xml } from 'xml-js';
import Papa from 'papaparse';
import { useSnackbar } from 'notistack';
import { useMediaQuery } from "@mui/material";


interface JsonConverterProps {
    defaultTargetFormat?: string;
}

const JsonConverter: React.FC<JsonConverterProps> = ({ defaultTargetFormat = 'yaml' }) => {
    const [inputJson, setInputJson] = useState<string>('');
    const [outputContent, setOutputContent] = useState<string>('');
    const [targetFormat, setTargetFormat] = useState<string>(defaultTargetFormat);
    const [error, setError] = useState<string>('');
    const [isCopied, setIsCopied] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    const inputEditorRef = useRef<any>(null);
    const outputEditorRef = useRef<any>(null);

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // Update targetFormat if defaultTargetFormat prop changes (e.g. route navigation)
    useEffect(() => {
        setTargetFormat(defaultTargetFormat);
    }, [defaultTargetFormat]);

    const handleConvert = () => {
        if (!inputJson.trim()) {
            setOutputContent('');
            setError('');
            return;
        }

        try {
            const parsed = JSON.parse(inputJson);
            setError('');
            let result = '';

            switch (targetFormat) {
                case 'yaml':
                    result = yaml.dump(parsed);
                    break;
                case 'xml':
                    result = js2xml(parsed, { compact: true, spaces: 2 });
                    break;
                case 'csv':
                    // CSV conversion works best with arrays of objects
                    const data = Array.isArray(parsed) ? parsed : [parsed];
                    result = Papa.unparse(data);
                    break;
                default:
                    result = '';
            }
            setOutputContent(result);
            enqueueSnackbar('Conversion successful', { variant: 'success' });
        } catch (e: any) {
            console.error(e);
            setError(e.message);
            enqueueSnackbar('Conversion failed: ' + e.message, { variant: 'error' });
        }
    };

    const copyToClipboard = () => {
        if (outputContent) {
            navigator.clipboard.writeText(outputContent);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000);
            enqueueSnackbar('Copied to clipboard', { variant: 'success' });
        }
    };

    const loadExample = () => {
        setInputJson(exampleJson);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            setInputJson(content);
            // Optional: don't auto-convert on load, let user click convert
        };
        reader.readAsText(file);
        event.target.value = '';
    };

    const handleDownload = () => {
        if (!outputContent) return;
        let type = 'text/plain';
        let ext = 'txt';
        if (targetFormat === 'yaml') {
            type = 'text/yaml';
            ext = 'yaml';
        } else if (targetFormat === 'xml') {
            type = 'application/xml';
            ext = 'xml';
        } else if (targetFormat === 'csv') {
            type = 'text/csv';
            ext = 'csv';
        }

        const blob = new Blob([outputContent], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `converted-output.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleInputEditorDidMount = (editor: any) => {
        inputEditorRef.current = editor;
    };

    const handleOutputEditorDidMount = (editor: any) => {
        outputEditorRef.current = editor;
    };

    return (
        <Box sx={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid container spacing={1.5} alignItems="center">

                    {/* Import Button */}
                    <Grid size={{ xs: 12, sm: 6, md: "auto" }}>
                        <Button
                            fullWidth={isMobile}
                            size={isMobile ? "small" : "medium"}
                            component="label"
                            variant="outlined"
                            startIcon={<UploadFileIcon />}
                            sx={{
                                minHeight: isMobile ? 32 : 36,
                                fontSize: isMobile ? "0.7rem" : "0.85rem",
                            }}
                        >
                            {isMobile ? "Import" : "Import JSON"}
                            <input
                                type="file"
                                hidden
                                accept=".json"
                                onChange={handleFileUpload}
                            />
                        </Button>
                    </Grid>

                    {/* Load Example Button */}
                    <Grid size={{ xs: 12, sm: 6, md: "auto" }}>
                        <Button
                            fullWidth={isMobile}
                            size={isMobile ? "small" : "medium"}
                            variant="outlined"
                            startIcon={<AutoAwesomeIcon />}
                            onClick={loadExample}
                            sx={{
                                minHeight: isMobile ? 32 : 36,
                                fontSize: isMobile ? "0.7rem" : "0.85rem",
                            }}
                        >
                            Load Example
                        </Button>
                    </Grid>

                    {/* Target Format Select */}
                    <Grid size={{ xs: 12, sm: 6, md: "auto" }}>
                        <FormControl
                            fullWidth={isMobile}
                            size="small"
                            sx={{
                                minWidth: { md: 110 },
                                "& .MuiInputBase-root": {
                                    minHeight: isMobile ? 32 : 36,
                                    fontSize: isMobile ? "0.75rem" : "0.85rem",
                                },
                            }}
                        >
                            <InputLabel>Target Format</InputLabel>
                            <Select
                                value={targetFormat}
                                label="Target Format"
                                onChange={(e) => setTargetFormat(e.target.value)}
                            >
                                <MenuItem value="yaml">YAML</MenuItem>
                                <MenuItem value="xml">XML</MenuItem>
                                <MenuItem value="csv">CSV</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Convert Button */}
                    <Grid size={{ xs: 12, sm: 6, md: "auto" }}>
                        <Button
                            fullWidth={isMobile}
                            size={isMobile ? "small" : "medium"}
                            variant="contained"
                            color="primary"
                            startIcon={<PlayArrowIcon />}
                            onClick={handleConvert}
                            disabled={!inputJson}
                            sx={{
                                minHeight: isMobile ? 32 : 36,
                                fontSize: isMobile ? "0.7rem" : "0.85rem",
                            }}
                        >
                            Convert
                        </Button>
                    </Grid>

                </Grid>


                <Grid size={{ xs: 12, md: 'auto' }} sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Download Output">
                        <IconButton onClick={handleDownload} color="primary" disabled={!outputContent}>
                            <DownloadIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>

            {error && <Alert severity="error">{error}</Alert>}

            <Grid container spacing={2} sx={{ flexGrow: 1, minHeight: 0 }}>
                {/* Input Editor */}
                <Grid size={{ xs: 12, md: 5.5 }} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ flexGrow: 1, border: '1px solid', borderColor: 'divider', height: '100%' }}>
                        <Editor
                            height="100%"
                            defaultLanguage="json"
                            value={inputJson}
                            onChange={(val) => setInputJson(val || '')}
                            onMount={handleInputEditorDidMount}
                            theme={theme.palette.mode === 'dark' ? "vs-dark" : "light"}
                            options={{ minimap: { enabled: false }, automaticLayout: true }}
                        />
                    </Box>
                </Grid>

                {/* Divider / Icon */}
                <Grid size={{ xs: 12, md: 1 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <SwapHorizIcon
                        sx={{
                            color: theme.palette.primary.main,
                            transform: { xs: 'rotate(90deg)', md: 'none' }
                        }}
                    />
                </Grid>

                {/* Output Editor */}
                <Grid size={{ xs: 12, md: 5.5 }} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ flexGrow: 1, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', height: '100%', position: 'relative' }}>
                        <Box sx={{ position: 'absolute', top: 10, right: 20, zIndex: 10 }}>
                            <Tooltip title={isCopied ? "Copied!" : "Copy Output"}>
                                <span>
                                    <IconButton
                                        onClick={copyToClipboard}
                                        color="primary"
                                        disabled={!outputContent}
                                        size="small"
                                        sx={{
                                            bgcolor: isCopied ? 'success.main' : 'background.paper',
                                            color: isCopied ? 'common.white' : 'text.secondary',
                                            border: 1,
                                            borderColor: isCopied ? 'success.main' : 'divider',
                                            transition: 'all 0.2s',
                                            '&:hover': {
                                                bgcolor: isCopied ? 'success.dark' : 'action.hover',
                                                borderColor: isCopied ? 'success.dark' : 'text.primary',
                                            },
                                            boxShadow: 2
                                        }}
                                    >
                                        {isCopied ? <CheckCircleIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Box>
                        <Editor
                            height="100%"
                            language={targetFormat}
                            value={outputContent}
                            onMount={handleOutputEditorDidMount}
                            theme={theme.palette.mode === 'dark' ? "vs-dark" : "light"}
                            options={{
                                readOnly: true,
                                minimap: { enabled: false },
                                automaticLayout: true,
                                domReadOnly: true
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default JsonConverter;
