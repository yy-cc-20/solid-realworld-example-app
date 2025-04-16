import { lazy } from 'solid-js';

const Home = lazy(() => import('../features/manageArticle/pages/Home'));
const Login = lazy(() => import('../features/manageAccess/pages/Login'));
const Register = lazy(() => import('../features/manageAccess/pages/Register'));
const CreateEditArticle = lazy(() => import('../features/manageArticle/pages/CreateEditArticle'));
const Profile = lazy(() => import('../features/manageProfile/pages/ProfilePage'));
const Settings = lazy(() => import('../features/manageProfile/pages/Settings'));
const ArticleDetails = lazy(() => import('../features/manageArticle/pages/ArticleDetails'));
const NotFound = lazy(() => import('./NotFoundPage'));

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
};

export default Routes;
