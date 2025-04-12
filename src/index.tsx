/* @refresh reload */
import { ErrorBoundary, render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import Routes from './routes';
import Layout from './components/Layout';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error('Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?');
}

render(
    () => (
        <ErrorBoundary fallback={(err) => (import.meta.env.VITE_DEBUG_MODE ? err.message : 'Opps.. An error occurred. Please try again later.')}>
            <Router root={Layout}>
                <>{Routes.AuthRoutes}</>
                <>{Routes.ProtectedRoutes}</>
                <>{Routes.PublicAccessRoutes}</>
            </Router>
        </ErrorBoundary>
    ),
    root!,
);
