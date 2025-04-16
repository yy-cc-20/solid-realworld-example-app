import type { Component } from 'solid-js';
import { ErrorBoundary, Show } from 'solid-js/web';
import { Router } from '@solidjs/router';
import Routes from './routes';
import { Layout } from '../templates';
import { isAuthenticated } from '../features/manageAccess';

const App: Component = () => {
    return (
        <ErrorBoundary fallback={(err) => (import.meta.env.VITE_DEBUG_MODE ? err.message : 'Opps.. An error occurred. Please try again later.')}>
            <Router root={Layout}>
                <Show when={!isAuthenticated()}>
                    <>{Routes.AuthRoutes}</>
                </Show>
                <Show when={isAuthenticated()}>
                    <>{Routes.ProtectedRoutes}</>
                </Show>
                <>{Routes.PublicAccessRoutes}</>
            </Router>
        </ErrorBoundary>
    );
};

export default App;
