import { Navigate } from '@solidjs/router';
import type { Component } from 'solid-js';

const NotFound: Component = () => {
    return <Navigate href='/' />;
};

export default NotFound;
