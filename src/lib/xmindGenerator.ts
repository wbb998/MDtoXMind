import JSZip from 'jszip';
import { Topic } from './types';

interface XMindTopic {
    id: string;
    class: 'topic';
    title: string;
    children?: {
        attached: XMindTopic[];
    };
    notes?: {
        plain: {
            content: string;
        };
    };
    image?: {
        src: string;
    };
}

interface XMindSheet {
    id: string;
    class: 'sheet';
    title: string;
    rootTopic: XMindTopic;
}

export async function generateXMind(rootTopic: Topic): Promise<Blob> {
    const zip = new JSZip();

    // 1. Transform Topic tree to XMind structure (initial transformation will happen after image processing)

    // 1. Transform Topic tree to XMind structure (initial transformation will happen after image processing)

    // 2. Add metadata.json (minimal)
    const metadata = {
        creator: { name: 'MDtoXMind', version: '1.0.0' }
    };
    zip.file('metadata.json', JSON.stringify(metadata));

    // 4. Add manifest.json
    const manifest = {
        "file-entries": {
            "content.json": {},
            "metadata.json": {}
        }
    };

    // Process images
    let imageCounter = 0;

    // Helper to traverse and collect/process images
    async function processImages(topic: Topic) {
        if (topic.image && topic.image.src) {
            try {
                // @ts-ignore - window.electronAPI is injected by Electron context bridge
                const data = await window.electronAPI.readImage(topic.image.src);
                if (data) {
                    const ext = topic.image.src.split('.').pop() || 'png';
                    const filename = `image_${imageCounter++}.${ext}`;
                    const path = `resources/${filename}`;

                    zip.file(path, data);
                    // @ts-ignore
                    manifest["file-entries"][path] = {};

                    // Update topic image src to xap:resources/filename
                    topic.image.src = `xap:${path}`;
                }
            } catch (e) {
                console.error("Failed to process image", topic.image.src, e);
            }
        }
        if (topic.children) {
            for (const child of topic.children) {
                await processImages(child);
            }
        }
    }

    // Clone root to avoid mutating original
    const rootClone = JSON.parse(JSON.stringify(rootTopic));
    await processImages(rootClone);

    const xmindRoot = transformTopic(rootClone);

    const contentWithImage = [
        {
            id: crypto.randomUUID(),
            class: 'sheet',
            title: 'Sheet 1',
            rootTopic: xmindRoot
        }
    ];

    zip.file('content.json', JSON.stringify(contentWithImage));
    zip.file('manifest.json', JSON.stringify(manifest));

    return await zip.generateAsync({ type: 'blob' });
}

function transformTopic(topic: Topic): XMindTopic {
    const xTopic: XMindTopic = {
        id: topic.id,
        class: 'topic',
        title: topic.title
    };

    if (topic.notes) {
        xTopic.notes = {
            plain: {
                content: topic.notes
            }
        };
    }

    if (topic.image && topic.image.src.startsWith('xap:')) {
        xTopic.image = {
            src: topic.image.src
        };
    }

    if (topic.children && topic.children.length > 0) {
        xTopic.children = {
            attached: topic.children.map(transformTopic)
        };
    }

    return xTopic;
}
