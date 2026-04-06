import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Box, Button, Paper, Alert, IconButton, Tooltip, useTheme, Select, MenuItem, FormControl, InputLabel, Chip, Grid } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CompressIcon from '@mui/icons-material/Compress';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useSnackbar } from 'notistack';
import { calculateJsonStats, formatBytes, type JsonStats } from '../utils/jsonStats';
import { useMediaQuery } from '@mui/material';

const exampleJson = JSON.stringify(
    {
        user: { id: 101, name: "Rahul", role: "admin", active: true },
        tools: ["Validator", "Formatter", "Converter"],
        settings: { theme: "dark", notifications: true }
    },
    null,
    2
);

const JsonValidator: React.FC = () => {
    const [jsonInput, setJsonInput] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [errorLine, setErrorLine] = useState<number | null>(null);
    const [isCopied, setIsCopied] = useState(false);
    const [spacing, setSpacing] = useState<number | string>(2); // 2, 4, or '\t'
    const [jsonStats, setJsonStats] = useState<JsonStats | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    const editorRef = useRef<any>(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const buttonSize = isMobile ? 'small' : isTablet ? 'medium' : 'medium';


    const handleEditorChange = (value: string | undefined) => {
        setJsonInput(value || '');
        setIsValid(null); // Reset validation state on change
        setErrorMessage('');
        setErrorLine(null); // Clear error line highlighting
        if (isCopied) setIsCopied(false);
    };

    const loadExample = () => {
        setJsonInput(exampleJson);
        setIsValid(null);
        setErrorMessage('');
        setErrorLine(null);
    };

    const validateJson = () => {
        if (!jsonInput.trim()) {
            setIsValid(null);
            setErrorMessage('');
            setErrorLine(null);
            setJsonStats(null);
            return;
        }
        try {
            JSON.parse(jsonInput);
            setIsValid(true);
            setErrorMessage('');
            setErrorLine(null);

            // Calculate JSON statistics
            const stats = calculateJsonStats(jsonInput);
            setJsonStats(stats);
        } catch (e: any) {
            setIsValid(false);
            setJsonStats(null);
            let msg = e.message;
            let lineNumber: number | null = null;

            // Parse line number from error message if available (e.g. "at position X")
            const match = msg.match(/at position (\d+)/);
            if (match) {
                const position = parseInt(match[1], 10);
                lineNumber = jsonInput.substring(0, position).split('\n').length;
                msg = `${msg} (Line ${lineNumber})`;
                setErrorLine(lineNumber);

                // Highlight the error line in the editor
                if (editorRef.current) {
                    editorRef.current.revealLineInCenter(lineNumber);
                    editorRef.current.setPosition({ lineNumber, column: 1 });
                }
            }
            setErrorMessage(msg);
        }
    };

    const formatJson = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            const indent = spacing === 'tab' ? '\t' : spacing;
            setJsonInput(JSON.stringify(parsed, null, indent));
            setIsValid(true);
            setErrorMessage('');
            enqueueSnackbar('JSON formatted', { variant: 'success' });
        } catch (e: any) {
            setIsValid(false);
            setErrorMessage('Cannot format invalid JSON: ' + e.message);
        }
    };

    const compressJson = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            setJsonInput(JSON.stringify(parsed));
            setIsValid(true);
            setErrorMessage('');
            enqueueSnackbar('JSON compressed', { variant: 'success' });
        } catch (e: any) {
            setIsValid(false);
            setErrorMessage('Cannot compress invalid JSON: ' + e.message);
        }
    };

    const handleSpacingChange = (event: SelectChangeEvent<number | string>) => {
        setSpacing(event.target.value);
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

    const copyToClipboard = () => {
        if (jsonInput) {
            navigator.clipboard.writeText(jsonInput);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 3000);
            enqueueSnackbar('Copied to clipboard', { variant: 'success' });
        }
    };

    const handleEditorDidMount = (editor: any) => {
        editorRef.current = editor;
    };

    // Apply error line highlighting using Monaco decorations
    useEffect(() => {
        if (editorRef.current && errorLine !== null) {
            const decorations = editorRef.current.deltaDecorations(
                [],
                [
                    {
                        range: {
                            startLineNumber: errorLine,
                            startColumn: 1,
                            endLineNumber: errorLine,
                            endColumn: 1
                        },
                        options: {
                            isWholeLine: true,
                            className: 'errorLineDecoration',
                            glyphMarginClassName: 'errorLineGlyphMargin',
                            linesDecorationsClassName: 'errorLineGutter'
                        }
                    }
                ]
            );

            return () => {
                editorRef.current?.deltaDecorations(decorations, []);
            };
        }
    }, [errorLine]);

    const validateButtonStyle = (isValid: boolean | null) => {
        if (isValid) {
            return {
                color: 'success' as const,
                icon: <CheckCircleIcon />
            };
        }
        return {
            color: 'primary' as const,
            icon: <CheckCircleIcon />
        };
    };

    const responsiveButtonSx = {
        minHeight: isMobile ? 32 : 36,
        fontSize: isMobile ? '0.7rem' : '0.8rem',
        px: isMobile ? 1 : 2,
    };

    return (
        <Box sx={{
            height: 'calc(100vh - 200px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: '1000px',
            margin: '0 auto',
            width: '100%'
        }}>
            <Grid container spacing={1.5}>
                {/* Import */}
                <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
                    <Button
                        fullWidth
                        component="label"
                        variant="outlined"
                        size={buttonSize} sx={responsiveButtonSx}
                        startIcon={<UploadFileIcon />}
                    >
                        Import
                        <input type="file" hidden accept=".json" onChange={handleFileUpload} />
                    </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        size={buttonSize} sx={responsiveButtonSx}
                        startIcon={<AutoAwesomeIcon />}
                        onClick={loadExample}
                    >
                        Load Example
                    </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
                    <Tooltip title={!jsonInput ? "Enter JSON to enable" : "Validate JSON "}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color={validateButtonStyle(isValid).color}
                            startIcon={validateButtonStyle(isValid).icon}
                            size={buttonSize} sx={responsiveButtonSx}
                            onClick={validateJson}
                        >
                            Validate
                        </Button>
                    </Tooltip>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
                    <Tooltip title={!jsonInput ? "Enter JSON to enable" : "Format JSON"}>
                        <Button
                            fullWidth
                            variant="outlined"
                            size={buttonSize} sx={responsiveButtonSx}
                            startIcon={<AutoFixHighIcon />}
                            onClick={formatJson}
                            disabled={!jsonInput}
                        >
                            Format
                        </Button>
                    </Tooltip>
                </Grid>

                {/* Compress */}
                <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
                    <Tooltip title={!jsonInput ? "Enter JSON to enable" : "Compress / Minify JSON"}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<CompressIcon />}
                            onClick={compressJson}
                            disabled={!jsonInput}
                            size={buttonSize} sx={responsiveButtonSx}
                        >
                            Compress
                        </Button>
                    </Tooltip>
                </Grid>

                {/* Spacing Select */}
                <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
                    <FormControl
                        fullWidth
                        size="small"
                        sx={{
                            minWidth: { md: 75 },
                            "& .MuiInputBase-root": {
                                minHeight: isMobile ? 32 : 36,
                                fontSize: isMobile ? "0.75rem" : "0.85rem",
                            },
                        }}
                    >
                        <InputLabel>Spacing</InputLabel>
                        <Select
                            value={spacing}
                            label="Spacing"
                            onChange={handleSpacingChange}
                        >
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value="tab">Tab</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
                    <Tooltip title={!jsonInput ? "Enter JSON to enable" : "Download JSON File"}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<DownloadIcon />}
                            onClick={handleDownload}
                            disabled={!jsonInput}
                        >
                            Download
                        </Button>
                    </Tooltip>
                </Grid>

                {/* Clear */}
                <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
                    <Tooltip title={!jsonInput ? "Enter JSON to enable" : "Clear JSON"}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={clearEditor}
                            disabled={!jsonInput}
                        >
                            Clear
                        </Button>
                    </Tooltip>
                </Grid>
            </Grid>

            <Paper sx={{
                flexGrow: 1,
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
                position: 'relative',
                '& .errorLineDecoration': {
                    background: theme.palette.mode === 'dark'
                        ? 'rgba(255, 0, 0, 0.15) !important'
                        : 'rgba(255, 0, 0, 0.1) !important'
                },
                '& .errorLineGutter': {
                    background: theme.palette.mode === 'dark'
                        ? 'rgba(255, 0, 0, 0.3) !important'
                        : 'rgba(255, 0, 0, 0.2) !important',
                    width: '5px !important',
                    marginLeft: '3px'
                },
                '& .errorLineGlyphMargin': {
                    background: 'transparent',
                    '&::before': {
                        content: '"⚠"',
                        color: theme.palette.error.main,
                        fontSize: '16px',
                        fontWeight: 'bold'
                    }
                }
            }}>
                <Box sx={{ position: 'absolute', top: 10, right: 20, zIndex: 10 }}>
                    <Tooltip title={isCopied ? "Copied!" : (!jsonInput ? "Enter JSON to enable" : "Copy Content")}>
                        <span>
                            <IconButton
                                onClick={copyToClipboard}
                                disabled={!jsonInput}
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
                    defaultLanguage="json"
                    value={jsonInput}
                    onChange={handleEditorChange}
                    onMount={handleEditorDidMount}
                    theme={theme.palette.mode === 'dark' ? "vs-dark" : "light"}
                    options={{
                        minimap: { enabled: false },
                        fontSize: window.innerWidth < 600 ? 12 : 14,
                        formatOnPaste: true,
                        formatOnType: true,
                        automaticLayout: true,
                    }}
                />
            </Paper>

            {isValid === true && (
                <Alert
                    severity="success"
                    icon={<CheckCircleIcon fontSize="inherit" />}
                    sx={{ ml: 'auto' }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Box sx={{ fontWeight: 'bold' }}>Valid JSON</Box>
                        {jsonStats && (
                            <>
                                <Box sx={{
                                    width: '1px',
                                    height: '16px',
                                    bgcolor: 'success.dark',
                                    opacity: 0.5,
                                    mx: 0.5
                                }} />
                                <Chip
                                    label={formatBytes(jsonStats.sizeBytes)}
                                    size="small"
                                    variant="outlined"
                                    color="success"
                                    sx={{ height: 24, fontSize: '0.75rem' }}
                                />
                                <Chip
                                    label={`${jsonStats.totalKeys} key${jsonStats.totalKeys !== 1 ? 's' : ''}`}
                                    size="small"
                                    variant="outlined"
                                    color="success"
                                    sx={{ height: 24, fontSize: '0.75rem' }}
                                />
                                <Chip
                                    label={`depth ${jsonStats.maxDepth}`}
                                    size="small"
                                    variant="outlined"
                                    color="success"
                                    sx={{ height: 24, fontSize: '0.75rem' }}
                                />
                                <Chip
                                    label={`${jsonStats.objectCount} object${jsonStats.objectCount !== 1 ? 's' : ''}`}
                                    size="small"
                                    variant="outlined"
                                    color="success"
                                    sx={{ height: 24, fontSize: '0.75rem' }}
                                />
                                <Chip
                                    label={`${jsonStats.arrayCount} array${jsonStats.arrayCount !== 1 ? 's' : ''}`}
                                    size="small"
                                    variant="outlined"
                                    color="success"
                                    sx={{ height: 24, fontSize: '0.75rem' }}
                                />
                            </>
                        )}
                    </Box>
                </Alert>
            )}
            {isValid === false && (
                <Alert severity="error" icon={<ErrorIcon fontSize="inherit" />} sx={{ ml: 'auto' }}>
                    Invalid JSON: {errorMessage}
                </Alert>
            )}
        </Box>
    );
};

export default JsonValidator;
