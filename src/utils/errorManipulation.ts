export function printInDebugMode(functionName: string, info: Error | string): void {
    if (!import.meta.env.VITE_DEBUG_MODE)
        return;

    if (info instanceof Error) 
        console.error('Error ', functionName, ' :', info);
    else 
        console.error(functionName, ' :', info);
    
}