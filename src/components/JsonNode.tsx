import type { Node, NodeProps } from '@xyflow/react';
import { Handle, Position } from '@xyflow/react';
import { Box, Paper, Typography, useTheme } from '@mui/material';

export type JsonNodeData = {
    label: string;
    isRoot?: boolean;
    primitives: { key: string; value: string; type: string }[];
    complex: { key: string; length: number; type: 'object' | 'array'; handleId: string }[];
};

export type JsonNodeType = Node<JsonNodeData, 'jsonNode'>;

const JsonNode = ({ data, selected }: NodeProps<JsonNodeType>) => {
    const theme = useTheme();

    return (
        <Paper
            elevation={selected ? 4 : 1}
            sx={{
                minWidth: 200,
                borderRadius: 3,
                border: '1px solid',
                borderColor: selected ? 'primary.main' : 'divider',
                overflow: 'visible',
                bgcolor: 'background.paper',
            }}
        >
            {!data.isRoot && <Handle type="target" position={Position.Left} style={{ background: theme.palette.text.secondary, width: 8, height: 8, left: -4 }} />}
            
            <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider', bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {data.label}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {data.primitives.map((p, i) => {
                    const typeColor = p.type === 'string' ? '#2196f3' 
                                    : p.type === 'number' ? '#9c27b0' 
                                    : p.type === 'boolean' ? '#4caf50' 
                                    : '#757575';
                    return (
                        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.75, px: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: typeColor, flexShrink: 0 }} />
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, minWidth: 'max-content' }}>{p.key}:</Typography>
                            <Typography variant="body2" sx={{ color: typeColor, wordBreak: 'break-all' }}>{p.value}</Typography>
                        </Box>
                    );
                })}

                {data.complex.map((c, i) => {
                    const isObj = c.type === 'object';
                    const handleColor = isObj ? '#ff9800' : '#f44336';
                    const isLast = i === data.complex.length - 1;
                    return (
                        <Box key={i} sx={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 1, py: 0.75, px: 2, borderBottom: isLast ? 'none' : '1px solid', borderColor: 'divider' }}>
                            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: handleColor, flexShrink: 0 }} />
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>{c.key}:</Typography>
                            <Typography variant="body2" sx={{ color: handleColor, opacity: 0.8 }}>
                                {c.type === 'array' ? `[${c.length} items]` : `{${c.length} keys}`}
                            </Typography>
                            <Handle
                                type="source"
                                position={Position.Right}
                                id={c.handleId}
                                style={{ 
                                    background: handleColor, 
                                    right: -5,
                                    width: 10,
                                    height: 10,
                                    border: `2px solid ${theme.palette.background.paper}`,
                                    top: '50%'
                                }}
                            />
                        </Box>
                    );
                })}
                {data.primitives.length === 0 && data.complex.length === 0 && (
                     <Typography variant="body2" color="text.secondary" sx={{ px: 1, fontStyle: 'italic' }}>Empty</Typography>
                )}
            </Box>
        </Paper>
    );
};

export default JsonNode;
