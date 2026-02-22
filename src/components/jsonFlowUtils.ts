import type { Node, Edge } from '@xyflow/react';
import dagre from 'dagre';
import type { JsonNodeData } from './JsonNode';

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export const generateGraph = (root: JsonValue): { nodes: Node<JsonNodeData>[]; edges: Edge[] } => {
    const nodes: Node<JsonNodeData>[] = [];
    const edges: Edge[] = [];

    const traverse = (key: string, value: JsonValue, parentId: string | null, parentHandle: string | null) => {
        // Sanitize ids to avoid weird characters in dagre
        const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, '');
        const id = parentId ? `${parentId}-${safeKey}-${nodes.length}` : 'root';
        
        let primitives: JsonNodeData['primitives'] = [];
        let complex: JsonNodeData['complex'] = [];
        
        const isArray = Array.isArray(value);
        const isObject = typeof value === 'object' && value !== null && !isArray;
        
        if (isArray) {
            value.forEach((v, index) => {
                const childObj = typeof v === 'object' && v !== null;
                const childString = v === null ? 'null' : String(v);
                
                if (childObj) {
                    const handleId = `${id}-${index}`;
                    complex.push({ key: `[${index}]`, length: Array.isArray(v) ? v.length : Object.keys(v).length, type: Array.isArray(v) ? 'array' : 'object', handleId });
                    traverse(`[${index}]`, v, id, handleId);
                } else {
                    primitives.push({ key: `[${index}]`, value: childString, type: v === null ? 'object' : typeof v });
                }
            });
        } else if (isObject) {
            Object.entries(value).forEach(([k, v]) => {
                 const childObj = typeof v === 'object' && v !== null;
                 const childString = v === null ? 'null' : (typeof v === 'string' ? `"${v}"` : String(v));
                
                 if (childObj) {
                     const handleId = `${id}-${k}`;
                     complex.push({ key: k, length: Array.isArray(v) ? v.length : Object.keys(v).length, type: Array.isArray(v) ? 'array' : 'object', handleId });
                     traverse(k, v, id, handleId);
                 } else {
                     primitives.push({ key: k, value: childString, type: v === null ? 'object' : typeof v });
                 }
            });
        }
        
        nodes.push({
            id,
            type: 'jsonNode',
            data: { label: key, isRoot: !parentId, primitives, complex },
            position: { x: 0, y: 0 } 
        });
        
        if (parentId && parentHandle) {
            edges.push({
                id: `e-${parentId}-${id}`,
                source: parentId,
                target: id,
                sourceHandle: parentHandle,
                label: key,
                labelStyle: { fill: '#757575', fontWeight: 600, fontSize: 11 },
                labelBgStyle: { fill: 'transparent' },
                type: 'smoothstep',
                animated: true,
                style: { stroke: '#888' }
            });
        }
    };

    if (root !== undefined && root !== null && typeof root === 'object') {
        traverse('root', root, null, null);
    }

    return { nodes, edges };
};

export const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'LR') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: direction, align: 'UL', ranksep: 200 });

    nodes.forEach((node) => {
        const data = node.data as JsonNodeData;
        const height = 60 + (data.primitives.length * 28) + (data.complex.length * 36);
        dagreGraph.setNode(node.id, { width: 250, height });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const newNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        return {
            ...node,
            position: {
                x: nodeWithPosition.x - 250 / 2,
                y: nodeWithPosition.y - nodeWithPosition.height / 2,
            }
        };
    });

    return { nodes: newNodes, edges };
};
