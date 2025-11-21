export interface Topic {
    id: string;
    title: string;
    children?: Topic[];
    notes?: string;
    image?: {
        src: string; // Local path or URL
        width?: number;
        height?: number;
    };
}

export interface MindMapData {
    root: Topic;
}
