import { Navigate } from '@solidjs/router';
import { lazy } from 'solid-js';
import { isAuthenticated } from './services/authService';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const CreateEditArticle = lazy(() => import('./pages/CreateEditArticle'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const ArticleDetails = lazy(() => import('./pages/ArticleDetails'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ProtectedRoute() {
    if (!isAuthenticated()) {
        <Navigate href='/login' />;
    }
}

function AuthRoute() {
    if (isAuthenticated()) {
        <Navigate href='/' />;
    }
}

const PublicAccessRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '*',
        component: NotFound,
    },
];

const ProtectedRoutes = [
    {
        path: '/settings',
        component: Settings,
    },
    {
        path: '/editor',
        component: CreateEditArticle,
    },
    {
        path: '/editor/:slug',
        component: CreateEditArticle,
    },
    {
        path: '/article/:slug',
        component: ArticleDetails,
    },
    {
        path: '/profile/:username',
        component: Profile,
    },
];

const AuthRoutes = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Register,
    },
];

const Routes = {
    PublicAccessRoutes,
    ProtectedRoutes,
    AuthRoutes,
    ProtectedRoute,
    AuthRoute,
};

export default Routes;
