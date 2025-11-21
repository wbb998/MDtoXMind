export { };

declare global {
    interface Window {
        electronAPI: {
            readImage: (path: string) => Promise<Uint8Array | null>;
        };
    }
}
