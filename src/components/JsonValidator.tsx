import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Box, Button, Paper, Alert, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';

const JsonValidator: React.FC = () => {
    const [jsonInput, setJsonInput] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleEditorChange = (value: string | undefined) => {
        setJsonInput(value || '');
        setIsValid(null); // Reset validation state on change
        setErrorMessage('');
    };

    const validateJson = () => {
        if (!jsonInput.trim()) {
            setIsValid(null);
            setErrorMessage('');
            return;
        }
        try {
            JSON.parse(jsonInput);
            setIsValid(true);
            setErrorMessage('');
        } catch (e: any) {
            setIsValid(false);
            setErrorMessage(e.message);
        }
    };

    const formatJson = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            setJsonInput(JSON.stringify(parsed, null, 2));
            setIsValid(true);
            setErrorMessage('');
        } catch (e: any) {
            setIsValid(false);
            setErrorMessage('Cannot format invalid JSON: ' + e.message);
        }
    };

    const clearEditor = () => {
        setJsonInput('');
        setIsValid(null);
        setErrorMessage('');
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            setJsonInput(content);
            // Optional: Auto-validate on load
            try {
                JSON.parse(content);
                setIsValid(true);
                setErrorMessage('');
            } catch (err: any) {
                setIsValid(false);
                setErrorMessage(err.message);
            }
        };
        reader.readAsText(file);
        // Reset input value to allow re-uploading the same file
        event.target.value = '';
    };

    const handleDownload = () => {
        if (!jsonInput) return;
        const blob = new Blob([jsonInput], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'validator-output.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <Box sx={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircleIcon />}
                    onClick={validateJson}
                >
                    Validate
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AutoFixHighIcon />}
                    onClick={formatJson}
                >
                    Format
                </Button>
                <Button
                    component="label"
                    variant="outlined"
                    startIcon={<UploadFileIcon />}
                >
                    Import
                    <input type="file" hidden accept=".json" onChange={handleFileUpload} />
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={handleDownload}
                    disabled={!jsonInput}
                >
                    Download
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={clearEditor}
                >
                    Clear
                </Button>

                {isValid === true && (
                    <Alert severity="success" icon={<CheckCircleIcon fontSize="inherit" />} sx={{ ml: 'auto' }}>
                        Valid JSON
                    </Alert>
                )}
                {isValid === false && (
                    <Alert severity="error" icon={<ErrorIcon fontSize="inherit" />} sx={{ ml: 'auto' }}>
                        Invalid JSON: {errorMessage}
                    </Alert>
                )}
            </Stack>

            <Paper sx={{ flexGrow: 1, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
                <Editor
                    height="100%"
                    defaultLanguage="json"
                    value={jsonInput}
                    onChange={handleEditorChange}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        formatOnPaste: true,
                        formatOnType: true,
                        automaticLayout: true,
                    }}
                />
            </Paper>
        </Box>
    );
};

export default JsonValidator;
