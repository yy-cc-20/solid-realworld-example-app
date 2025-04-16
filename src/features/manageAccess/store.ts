// create a global state using a singleton module export

import { createStore } from 'solid-js/store';
import { User } from './types';

const [user, setUser] = createStore<User>({
    email: '',
    token: '',
    username: 'Unauthenticated',
    bio: '',
    image: '',
});

function isAuthenticated(): boolean {
    return user !== undefined && user.token !== undefined && user.token !== null && user.token !== '' && user.token !== 'undefined';
}

export { user, setUser, isAuthenticated };
