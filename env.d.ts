interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_API_SECRET: string;
    readonly VITE_DEBUG_MODE: boolean;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
