/**
 * Utility functions for analyzing JSON structure
 */

export interface JsonStats {
    sizeBytes: number;
    totalKeys: number;
    maxDepth: number;
    objectCount: number;
    arrayCount: number;
}

/**
 * Calculate comprehensive statistics for a JSON value
 */
export function calculateJsonStats(jsonString: string): JsonStats {
    const parsed = JSON.parse(jsonString);
    const sizeBytes = new Blob([jsonString]).size;

    let totalKeys = 0;
    let objectCount = 0;
    let arrayCount = 0;
    let maxDepth = 0;

    function traverse(obj: any, depth: number = 1) {
        maxDepth = Math.max(maxDepth, depth);

        if (Array.isArray(obj)) {
            arrayCount++;
            obj.forEach(item => {
                if (typeof item === 'object' && item !== null) {
                    traverse(item, depth + 1);
                }
            });
        } else if (typeof obj === 'object' && obj !== null) {
            objectCount++;
            const keys = Object.keys(obj);
            totalKeys += keys.length;

            keys.forEach(key => {
                const value = obj[key];
                if (typeof value === 'object' && value !== null) {
                    traverse(value, depth + 1);
                }
            });
        }
    }

    traverse(parsed);

    return {
        sizeBytes,
        totalKeys,
        maxDepth,
        objectCount,
        arrayCount,
    };
}

/**
 * Format bytes to human-readable format
 */
export function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
