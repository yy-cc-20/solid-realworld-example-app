/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import Routes from './routes';
import Layout from './components/Layout';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error('Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?');
}

render(
    () => (
        <Router root={Layout}>
            <>{Routes.AuthRoutes}</>
            <>{Routes.ProtectedRoutes}</>
            <>{Routes.PublicAccessRoutes}</>
        </Router>
    ),
    root!,
);
