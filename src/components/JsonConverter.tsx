import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Box, Button, Select, MenuItem, Stack, FormControl, InputLabel, Alert, IconButton, Tooltip } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import yaml from 'js-yaml';
import { js2xml } from 'xml-js';
import Papa from 'papaparse';
import { useSnackbar } from 'notistack';

const JsonConverter: React.FC = () => {
    const [inputJson, setInputJson] = useState<string>('');
    const [outputContent, setOutputContent] = useState<string>('');
    const [targetFormat, setTargetFormat] = useState<string>('yaml');
    const [error, setError] = useState<string>('');
    const { enqueueSnackbar } = useSnackbar();

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
            enqueueSnackbar('Copied to clipboard', { variant: 'info' });
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

    return (
        <Box sx={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                <Stack direction="row" spacing={2} alignItems="center" flexGrow={1}>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
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

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PlayArrowIcon />}
                        onClick={handleConvert}
                    >
                        Convert
                    </Button>

                    <Button
                        component="label"
                        variant="outlined"
                        startIcon={<UploadFileIcon />}
                        sx={{ ml: 2 }}
                    >
                        Import JSON
                        <input type="file" hidden accept=".json" onChange={handleFileUpload} />
                    </Button>
                </Stack>

                <Box>
                    <Tooltip title="Download Output">
                        <IconButton onClick={handleDownload} color="primary" disabled={!outputContent}>
                            <DownloadIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Copy Output">
                        <IconButton onClick={copyToClipboard} color="primary" disabled={!outputContent}>
                            <ContentCopyIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Stack>

            {error && <Alert severity="error">{error}</Alert>}

            <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, height: '100%' }}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ flexGrow: 1, border: '1px solid', borderColor: 'divider' }}>
                        <Editor
                            height="100%"
                            defaultLanguage="json"
                            value={inputJson}
                            onChange={(val) => setInputJson(val || '')}
                            theme="vs-dark"
                            options={{ minimap: { enabled: false }, automaticLayout: true }}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <SwapHorizIcon color="action" />
                </Box>

                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ flexGrow: 1, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
                        <Editor
                            height="100%"
                            language={targetFormat} // monaco supports yaml, xml. csv might fallback to plaintext
                            value={outputContent}
                            theme="vs-dark"
                            options={{
                                readOnly: true,
                                minimap: { enabled: false },
                                automaticLayout: true,
                                domReadOnly: true
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default JsonConverter;
