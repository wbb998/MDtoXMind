import React, { useState, useEffect } from 'react';
import { FileDown, FileText, Layout, Settings } from 'lucide-react';
import { parseMarkdown } from './lib/markdownParser';
import { generateXMind } from './lib/xmindGenerator';
import { Topic } from './lib/types';

function App() {
    const [markdown, setMarkdown] = useState<string>('# Central Topic\n## Main Topic 1\n- Subtopic 1\n- Subtopic 2\n## Main Topic 2\nNote for topic 2');
    const [rootTopic, setRootTopic] = useState<Topic | null>(null);

    useEffect(() => {
        const parse = async () => {
            const root = await parseMarkdown(markdown);
            setRootTopic(root);
        };
        parse();
    }, [markdown]);

    const handleExport = async () => {
        if (!rootTopic) return;
        const blob = await generateXMind(rootTopic);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mindmap.xmind';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="h-screen w-screen flex flex-col bg-white text-slate-900">
            {/* Toolbar */}
            <div className="h-12 border-b border-slate-200 flex items-center px-4 justify-between bg-slate-50 draggable">
                <div className="flex items-center gap-2 text-slate-600">
                    <Layout size={18} />
                    <span className="font-semibold text-sm">MDtoXMind</span>
                </div>
                <div className="flex items-center gap-2 no-drag">
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        <FileDown size={16} />
                        Export XMind
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Editor */}
                <div className="w-1/2 border-r border-slate-200 flex flex-col">
                    <div className="h-8 bg-slate-50 border-b border-slate-200 flex items-center px-4 text-xs font-medium text-slate-500">
                        MARKDOWN INPUT
                    </div>
                    <textarea
                        className="flex-1 p-4 resize-none focus:outline-none font-mono text-sm leading-relaxed"
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        placeholder="Type your markdown here..."
                    />
                </div>

                {/* Preview */}
                <div className="w-1/2 flex flex-col bg-slate-50">
                    <div className="h-8 bg-slate-50 border-b border-slate-200 flex items-center px-4 text-xs font-medium text-slate-500">
                        STRUCTURE PREVIEW
                    </div>
                    <div className="flex-1 p-8 overflow-auto">
                        {rootTopic ? (
                            <TopicNode topic={rootTopic} isRoot />
                        ) : (
                            <div className="text-slate-400 text-center mt-20">Start typing to see preview</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TopicNode({ topic, isRoot = false }: { topic: Topic; isRoot?: boolean }) {
    return (
        <div className="flex flex-col items-start">
            <div className={`
        px-4 py-2 rounded-lg border shadow-sm mb-4
        ${isRoot
                    ? 'bg-blue-600 text-white border-blue-700 font-bold text-lg'
                    : 'bg-white border-slate-200 text-slate-800 font-medium'}
      `}>
                {topic.title}
                {topic.notes && (
                    <div className={`text-xs mt-1 whitespace-pre-wrap ${isRoot ? 'text-blue-100' : 'text-slate-500'}`}>
                        {topic.notes}
                    </div>
                )}
            </div>

            {topic.children && topic.children.length > 0 && (
                <div className="pl-8 border-l-2 border-slate-200 ml-4 flex flex-col gap-2">
                    {topic.children.map(child => (
                        <TopicNode key={child.id} topic={child} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
