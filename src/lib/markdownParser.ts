import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import { Topic } from './types';

export async function parseMarkdown(markdown: string): Promise<Topic> {
    const processor = unified().use(remarkParse).use(remarkGfm);
    const tree = processor.parse(markdown);

    let root: Topic = { id: 'root', title: 'Central Topic', children: [] };
    const stack: { node: Topic; level: number }[] = [{ node: root, level: 0 }];

    visit(tree, (node: any) => {
        if (node.type === 'heading') {
            const depth = node.depth;
            const text = node.children
                .filter((c: any) => c.type === 'text' || c.type === 'inlineCode')
                .map((c: any) => c.value)
                .join('');

            const newTopic: Topic = {
                id: crypto.randomUUID(),
                title: text || 'Untitled',
                children: [],
            };

            // Find parent
            while (stack.length > 0 && stack[stack.length - 1].level >= depth) {
                stack.pop();
            }

            const parent = stack[stack.length - 1].node;
            if (!parent.children) parent.children = [];
            parent.children.push(newTopic);

            stack.push({ node: newTopic, level: depth });
        }
        else if (node.type === 'list') {
            // Lists are handled by their items, but we might need context
        }
        else if (node.type === 'listItem') {
            // Simple list item handling (treat as child of current topic)
            // This is a simplification; complex lists might need recursion
            const textNode = node.children.find((c: any) => c.type === 'paragraph');
            if (textNode) {
                const text = textNode.children
                    .filter((c: any) => c.type === 'text')
                    .map((c: any) => c.value)
                    .join('');

                const newTopic: Topic = {
                    id: crypto.randomUUID(),
                    title: text || 'Untitled',
                    children: [],
                };
                const parent = stack[stack.length - 1].node;
                if (!parent.children) parent.children = [];
                parent.children.push(newTopic);
                // Note: We don't push list items to stack unless they have nested lists, 
                // but for now let's keep it flat or simple. 
                // To support nested lists properly, we'd need to track list depth or recursion.
            }
        }
        else if (node.type === 'paragraph') {
            // Check if it's an image
            const image = node.children.find((c: any) => c.type === 'image');
            if (image) {
                const currentTopic = stack[stack.length - 1].node;
                // If the current topic is the root (level 0) and it's just a paragraph, 
                // it might be a mistake to attach to root, but let's attach to current.
                currentTopic.image = {
                    src: image.url
                };
            } else {
                // Treat as note for the current topic if it's not a heading
                // But we need to be careful not to capture heading text again (though heading nodes are separate)
                // And we should only capture notes if they immediately follow a heading?
                // For now, let's append text to notes
                const text = node.children
                    .filter((c: any) => c.type === 'text')
                    .map((c: any) => c.value)
                    .join('');

                if (text.trim()) {
                    const currentTopic = stack[stack.length - 1].node;
                    if (currentTopic.id !== 'root') { // Don't add notes to the invisible root container if possible, or maybe root is the H1?
                        currentTopic.notes = currentTopic.notes ? currentTopic.notes + '\n' + text : text;
                    }
                }
            }
        }
    });

    // If the root has only one child and that child is H1, maybe return that as the real root?
    // XMind usually expects one Central Topic.
    if (root.children && root.children.length === 1) {
        return root.children[0];
    }

    return root;
}
