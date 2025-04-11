import { lazy } from 'solid-js';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const CreateEditArticle = lazy(() => import('./pages/CreateEditArticle'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const Article = lazy(() => import('./pages/Article'));

const PublicAccessRoutes = [
    {
        path: '/',
        component: Home,
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
        component: Article,
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
};

export default Routes;
