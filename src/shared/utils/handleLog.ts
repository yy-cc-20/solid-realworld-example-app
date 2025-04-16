export function printLogInDebugMode(functionName: string, info: Error | string): void {
    if (!import.meta.env.VITE_DEBUG_MODE) {
        console.log('An unexpected error occurred.');
        return;
    }
        
    if (info instanceof Error) 
        console.error('Error ', functionName, ' :', info);
    else 
        console.error(functionName, ' :', info);
    
}