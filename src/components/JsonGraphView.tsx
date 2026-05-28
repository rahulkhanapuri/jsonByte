import React, { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { ReactFlow, Background, Controls, MiniMap, useNodesState, useEdgesState, ConnectionLineType } from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import JsonNode from './JsonNode';
import { generateGraph, getLayoutedElements } from './jsonFlowUtils';
import {
    Alert,
    Box,
    Button,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ErrorIcon from '@mui/icons-material/Error';
import DeleteIcon from '@mui/icons-material/Delete';
import { useGraphViewStore } from '../stores/graphViewStore';


type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

const exampleJson = JSON.stringify(
    {
        app: "JsonByte",
        version: "1.0.0",
        generatedAt: "2026-04-05T12:30:00Z",
        user: {
            id: 101,
            name: "Rahul",
            role: "admin",
            active: true,
        },
        stats: {
            projects: 4,
            storageMB: 18.75,
            lastSync: null,
        },
        tools: [
            { name: "Validator", enabled: true },
            { name: "Converter", enabled: true },
            { name: "Graphical View", enabled: true },
        ],
        settings: {
            theme: "dark",
            notifications: {
                email: true,
                push: false,
            },
        },
    },
    null,
    2
);

const nodeTypes = {
    jsonNode: JsonNode as any,
};

const JsonGraphView: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [graphData, setGraphData] = useState<JsonValue | null>(null);
    const [error, setError] = useState('');

    const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    //zustand store for json input
    const { jsonInput, setJsonInput } = useGraphViewStore();

    useEffect(() => {
        if (graphData) {
            const { nodes: initNodes, edges: initEdges } = generateGraph(graphData);
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initNodes, initEdges);
            setNodes(layoutedNodes);
            setEdges(layoutedEdges);
        } else {
            setNodes([]);
            setEdges([]);
        }
    }, [graphData, setNodes, setEdges]);

    const loadExample = () => {
        setJsonInput(exampleJson);
        setGraphData(JSON.parse(exampleJson) as JsonValue);
        setError('');
    };

    const handleVisualize = () => {
        if (!jsonInput.trim()) {
            setGraphData(null);
            setError('');
            return;
        }

        try {
            const parsed = JSON.parse(jsonInput) as JsonValue;
            setGraphData(parsed);
            setError('');
        } catch (e: any) {
            setGraphData(null);
            setError(e.message);
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            setJsonInput(content);
        };
        reader.readAsText(file);
        event.target.value = '';
    };

    const handleLayout = () => {
        if (nodes.length > 0) {
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);
        }
    };

    const clearAll = () => {
        setJsonInput('');
        setGraphData(null);
        setError('');
    };

    return (
        <Box sx={{ height: { xs: 'auto', lg: 'calc(100vh - 120px)' }, minHeight: { xs: 'calc(100vh - 120px)', lg: 0 }, display: 'flex', flexDirection: 'column', width: '100%' }}>

            <Grid container spacing={1.5} sx={{ mb: 1 }}>
                <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
                    <Button fullWidth component="label" variant="outlined" startIcon={<UploadFileIcon />} size={isMobile ? 'small' : 'medium'}>
                        Import JSON
                        <input type="file" hidden accept=".json,.txt" onChange={handleFileUpload} />
                    </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
                    <Button fullWidth variant="outlined" startIcon={<AutoAwesomeIcon />} onClick={loadExample} size={isMobile ? 'small' : 'medium'}>
                        Load Example
                    </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
                    <Button fullWidth variant="contained" startIcon={<VisibilityIcon />} onClick={handleVisualize} disabled={!jsonInput.trim()} size={isMobile ? 'small' : 'medium'}>
                        Generate View
                    </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
                    <Button fullWidth variant="outlined" startIcon={<VisibilityIcon />} onClick={handleLayout} disabled={nodes.length === 0} size={isMobile ? 'small' : 'medium'}>
                        Re-Layout
                    </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 'auto' }}>
                    <Button fullWidth variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={clearAll} disabled={!jsonInput && !graphData} size={isMobile ? 'small' : 'medium'}>
                        Clear
                    </Button>
                </Grid>
            </Grid>

            {error && (
                <Alert severity="error" icon={<ErrorIcon fontSize="inherit" />}>
                    Invalid JSON: {error}
                </Alert>
            )}

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, flexGrow: 1, minHeight: 0, gap: 0, borderTop: '1px solid', borderColor: 'divider' }}>
                {/* Left Editor Pane */}
                <Box sx={{
                    resize: { lg: 'horizontal' },
                    overflow: 'hidden',
                    width: { xs: '100%', lg: '35%' },
                    minWidth: { lg: '200px' },
                    maxWidth: { lg: '80%' },
                    height: { xs: 450, lg: '100%' },
                    display: 'flex',
                    flexShrink: 0,
                    borderRight: { lg: '1px solid' },
                    borderBottom: { xs: '1px solid', lg: 'none' },
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                    pt: 1
                }}>
                    <Box sx={{ flexGrow: 1, minHeight: 0, width: '100%', height: '100%' }}>
                        <Editor
                            height="100%"
                            defaultLanguage="json"
                            value={jsonInput}
                            onChange={(value) => setJsonInput(value || '')}
                            theme={theme.palette.mode === 'dark' ? 'vs-dark' : 'light'}
                            options={{
                                minimap: { enabled: false },
                                automaticLayout: true,
                                fontSize: isMobile ? 12 : 14,
                                formatOnPaste: true,
                                formatOnType: true,
                            }}
                        />
                    </Box>
                </Box>

                {/* Right Graph Pane */}
                <Box sx={{ flexGrow: 1, minHeight: { xs: 400, lg: 0 }, display: 'flex', minWidth: 0, height: { xs: 'auto', lg: '100%' }, position: 'relative' }}>
                    <Box
                        sx={{
                            height: '100%',
                            width: '100%',
                            backgroundImage: theme.palette.mode === 'dark'
                                ? 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 100%)'
                                : 'radial-gradient(circle at center, rgba(0,0,0,0.02) 0%, transparent 100%)',
                            bgcolor: theme.palette.mode === 'dark' ? '#0d1117' : '#f8f9fa'
                        }}
                    >
                        {graphData !== null ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
                                <Box sx={{
                                    flexGrow: 1,
                                    minHeight: 0,
                                    position: 'relative',
                                    '& .react-flow__controls': {
                                        display: 'flex',
                                        flexDirection: 'column',
                                        bgcolor: 'background.paper',
                                        boxShadow: 2,
                                        borderRadius: 1,
                                        overflow: 'hidden',
                                        border: '1px solid',
                                        borderColor: 'divider'
                                    },
                                    '& .react-flow__controls-button': {
                                        bgcolor: 'transparent',
                                        borderBottom: '1px solid',
                                        borderColor: 'divider',
                                        color: 'text.primary',
                                        fill: 'currentColor',
                                        width: 32,
                                        height: 32,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        '&:hover': {
                                            bgcolor: 'action.hover'
                                        },
                                        '&:last-of-type': {
                                            borderBottom: 'none'
                                        }
                                    }
                                }}>
                                    <ReactFlow
                                        nodes={nodes}
                                        edges={edges}
                                        onNodesChange={onNodesChange}
                                        onEdgesChange={onEdgesChange}
                                        nodeTypes={nodeTypes}
                                        proOptions={{ hideAttribution: true }}
                                        connectionLineType={ConnectionLineType.SmoothStep}
                                        fitView
                                        style={{ background: 'transparent', height: '100%', minHeight: 400 }}
                                    >
                                        <Controls />
                                        <MiniMap
                                            nodeColor={() => theme.palette.mode === 'dark' ? '#555' : '#ccc'}
                                            maskColor={theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(240, 240, 240, 0.6)'}
                                            style={{ backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#ffffff' }}
                                        />
                                        <Background color={theme.palette.divider} gap={16} />
                                    </ReactFlow>
                                </Box>
                            </Box>
                        ) : (
                            <Box sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', px: 3 }}>
                                <Box>
                                    <VisibilityIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1, opacity: 0.5 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                                        Visualize JSON dynamically
                                    </Typography>
                                    <Button sx={{ mt: 2, textTransform: 'none' }} variant="outlined" onClick={loadExample}>
                                        Load Example Graph
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default JsonGraphView;
