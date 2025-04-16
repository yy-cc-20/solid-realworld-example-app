import { Navigate } from '@solidjs/router';
import { isAuthenticated } from '../features/manageAccess';

export function ProtectedRouteGuard() {
    if (!isAuthenticated()) {
        <Navigate href='/login' />;
    }
}

export function AuthRouteGuard() {
    if (isAuthenticated()) {
        <Navigate href='/' />;
    }
}
