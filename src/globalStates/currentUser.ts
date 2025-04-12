// create a global state using a singleton module export

import { createStore } from 'solid-js/store';
import { User } from '../types';

const unauthenticatedUser: User = {
    email: '',
    token: '',
    username: 'Unauthenticated',
    bio: '',
    image: '',
};
const [user, setUser] = createStore(unauthenticatedUser);

export { user, setUser, unauthenticatedUser };
