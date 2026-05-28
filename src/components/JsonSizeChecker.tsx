import React, { useState, useRef, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import {
    Box, Paper, Typography, IconButton, Tooltip, useTheme, Button, Grid
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useSnackbar } from 'notistack';
import { useMediaQuery } from '@mui/material';
import {usesizeValidatorStore} from '../stores/sizeValidatorStore';
const exampleJson = JSON.stringify(
    {
        user: { id: 101, name: "Rahul", role: "admin", active: true },
        tools: ["Validator", "Formatter", "Converter"],
        settings: { theme: "dark", notifications: true }
    },
    null,
    2
);

interface SizeInfo {
    bytes: number;
    kb: string;
    mb: string;
    characters: number;
    lines: number;
}

const JsonSizeChecker: React.FC = () => {
    const { jsonInput, setJsonInput, sizeInfo, setSizeInfo, minifiedSize, setMinifiedSize } = usesizeValidatorStore();
    const [isCopied, setIsCopied] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const editorRef = useRef<any>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const calculateSize = useCallback((text: string): SizeInfo => {
        const blob = new Blob([text]);
        const bytes = blob.size;
        return {
            bytes,
            kb: (bytes / 1024).toFixed(2),
            mb: (bytes / (1024 * 1024)).toFixed(4),
            characters: text.length,
            lines: text.split('\n').length,
        };
    }, []);

    const handleEditorChange = (value: string | undefined) => {
        const text = value || '';
        setJsonInput(text);

        if (isCopied) setIsCopied(false);

        if (text.trim()) {
            // Always show the size of the EXACT text in the editor
            setSizeInfo(calculateSize(text));

            // Try to calculate what the minified size would be
            try {
                const parsed = JSON.parse(text);
                const minified = JSON.stringify(parsed);
                setMinifiedSize(calculateSize(minified));
            } catch {
                setMinifiedSize(null);
            }
        } else {
            setSizeInfo(null);
            setMinifiedSize(null);
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            handleEditorChange(content);
        };
        reader.readAsText(file);
        event.target.value = '';
    };

    const clearEditor = () => {
        setJsonInput('');
        setSizeInfo(null);
        setMinifiedSize(null);
    };

    const loadExample = () => {
        handleEditorChange(exampleJson);
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

    const SizeCard = ({ label, value, unit, color }: { label: string; value: string; unit: string; color: string }) => (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                background: theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, ${color}15, ${color}08)`
                    : `linear-gradient(135deg, ${color}12, ${color}05)`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 4px 20px ${color}20`,
                },
            }}
        >
            <Typography
                variant="caption"
                sx={{
                    color: 'text.secondary',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    fontSize: '0.65rem',
                }}
            >
                {label}
            </Typography>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    color,
                    mt: 0.5,
                    fontSize: isMobile ? '1.5rem' : '2rem',
                    fontFamily: '"Roboto Mono", monospace',
                }}
            >
                {value}
            </Typography>
            <Typography
                variant="body2"
                sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.75rem' }}
            >
                {unit}
            </Typography>
        </Paper>
    );

    const responsiveButtonSx = {
        minHeight: isMobile ? 32 : 36,
        fontSize: isMobile ? '0.7rem' : '0.8rem',
        px: isMobile ? 1 : 2,
    };
    const buttonSize = isMobile ? 'small' as const : 'medium' as const;

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
            {/* Toolbar */}
            <Grid container spacing={1.5}>
                <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
                    <Button
                        fullWidth
                        component="label"
                        variant="outlined"
                        size={buttonSize}
                        sx={responsiveButtonSx}
                        startIcon={<UploadFileIcon />}
                    >
                        Import JSON
                        <input type="file" hidden accept=".json,.txt" onChange={handleFileUpload} />
                    </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        size={buttonSize}
                        sx={responsiveButtonSx}
                        startIcon={<AutoAwesomeIcon />}
                        onClick={loadExample}
                    >
                        Load Example
                    </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
                    <Tooltip title={!jsonInput ? "Enter JSON to enable" : "Clear"}>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={clearEditor}
                            disabled={!jsonInput}
                            size={buttonSize}
                            sx={responsiveButtonSx}
                        >
                            Clear
                        </Button>
                    </Tooltip>
                </Grid>
            </Grid>

            {/* Size Display Cards */}
            {sizeInfo && (
                <Grid container spacing={2}>
                    <Grid size={{ xs: 6, sm: 4 }}>
                        <SizeCard
                            label="Bytes"
                            value={sizeInfo.bytes.toLocaleString()}
                            unit="B"
                            color={theme.palette.primary.main}
                        />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4 }}>
                        <SizeCard
                            label="Kilobytes"
                            value={sizeInfo.kb}
                            unit="KB"
                            color={theme.palette.success.main}
                        />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4 }}>
                        <SizeCard
                            label="Megabytes"
                            value={sizeInfo.mb}
                            unit="MB"
                            color={theme.palette.warning.main}
                        />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4 }}>
                        <SizeCard
                            label="Characters"
                            value={sizeInfo.characters.toLocaleString()}
                            unit="chars"
                            color={theme.palette.info.main}
                        />
                    </Grid>
                    <Grid size={{ xs: 6, sm: 4 }}>
                        <SizeCard
                            label="Lines"
                            value={sizeInfo.lines.toLocaleString()}
                            unit="lines"
                            color={theme.palette.secondary.main}
                        />
                    </Grid>
                    {minifiedSize && (
                        <Grid size={{ xs: 6, sm: 4 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 2,
                                    background: theme.palette.mode === 'dark'
                                        ? `linear-gradient(135deg, ${theme.palette.error.main}15, ${theme.palette.error.main}08)`
                                        : `linear-gradient(135deg, ${theme.palette.error.main}12, ${theme.palette.error.main}05)`,
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: `0 4px 20px ${theme.palette.error.main}20`,
                                    },
                                }}
                            >
                                <Typography variant="caption" sx={{
                                    color: 'text.secondary', fontWeight: 600,
                                    textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.65rem',
                                }}>
                                    Minified Size
                                </Typography>
                                <Typography variant="h4" sx={{
                                    fontWeight: 700, color: theme.palette.error.main,
                                    mt: 0.5, fontSize: isMobile ? '1.5rem' : '2rem',
                                    fontFamily: '"Roboto Mono", monospace',
                                }}>
                                    {minifiedSize.bytes.toLocaleString()}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.75rem' }}>
                                    B ({sizeInfo.bytes > 0
                                        ? `${((1 - minifiedSize.bytes / sizeInfo.bytes) * 100).toFixed(1)}% smaller`
                                        : '0%'})
                                </Typography>
                            </Paper>
                        </Grid>
                    )}
                </Grid>
            )}

            {/* Prompt when empty */}
            {!sizeInfo && (
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        textAlign: 'center',
                        border: '1px dashed',
                        borderColor: 'divider',
                        borderRadius: 2,
                        bgcolor: 'transparent',
                    }}
                >
                    <DataUsageIcon sx={{ fontSize: 40, color: 'text.disabled', mb: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                        Paste or type your JSON below to instantly check its size in Bytes, KB, and MB
                    </Typography>
                </Paper>
            )}

            {/* Editor */}
            <Paper sx={{
                flexGrow: 1,
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
                position: 'relative',
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
        </Box>
    );
};

export default JsonSizeChecker;
