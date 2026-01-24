import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Box, Button, Select, MenuItem, Stack, FormControl, InputLabel, Alert, IconButton, Tooltip, Grid, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import yaml from 'js-yaml';
import { js2xml } from 'xml-js';
import Papa from 'papaparse';
import { useSnackbar } from 'notistack';


const JsonConverter: React.FC = () => {
    const [inputJson, setInputJson] = useState<string>('');
    const [outputContent, setOutputContent] = useState<string>('');
    const [targetFormat, setTargetFormat] = useState<string>('yaml');
    const [error, setError] = useState<string>('');
    const [isCopied, setIsCopied] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    const inputEditorRef = useRef<any>(null);
    const outputEditorRef = useRef<any>(null);

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
                <Grid size={{ xs: 12, md: 'grow' }}>
                    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<UploadFileIcon />}
                        >
                            Import JSON
                            <input type="file" hidden accept=".json" onChange={handleFileUpload} />
                        </Button>
                        <FormControl size="small" sx={{
                            minWidth: 100,
                            "& .MuiInputBase-root": {
                                height: 36, // 👈 controls overall height
                            },
                            "& .MuiSelect-select": {
                                padding: "4px 8px", // 👈 reduces inner spacing
                                display: "flex",
                                alignItems: "center",
                            },
                        }}
                        >
                            <InputLabel
                                sx={{
                                    top: "-4px",
                                    fontSize: "0.75rem",
                                }}
                            >Target Format</InputLabel>
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

                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<PlayArrowIcon />}
                            onClick={handleConvert}
                            disabled={!inputJson}
                        >
                            Convert
                        </Button>


                    </Stack>
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
