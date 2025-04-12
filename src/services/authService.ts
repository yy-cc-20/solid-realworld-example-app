import axios from 'axios';
import { user, setUser } from '../globalStates/currentUser';
import { User, LoginRequest, RegistrationRequest } from '../types';

export async function login(request: LoginRequest) {
    const apiUrl = import.meta.env.VITE_API_URL + '/users/login';
    try {
        // const response = await axios.post(apiUrl, user);
        // loginLogic(response.data.user);
        const response = {
            email: 'email@example.com',
            token: 'fake-jwt-token',
            username: 'Eric Simons',
            bio: "Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games",
            image: 'http://i.imgur.com/Qr71crq.jpg',
        } as User;
        loginLogic(response);
        console.log('User logged in');
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

function loginLogic(user: User) {
    localStorage.setItem('authToken', JSON.stringify(user.token));
    setUser(user);
}

export async function register(request: RegistrationRequest) {
    const apiUrl = import.meta.env.API_URL + '/users';
    try {
        // const response = await axios.post(apiUrl, user);
        // loginLogic(response.data.user);
        const response = {
            email: 'email@example.com',
            token: 'fake-jwt-token',
            username: 'Eric Simons',
            bio: "Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games",
            image: 'http://i.imgur.com/Qr71crq.jpg',
        } as User;
        loginLogic(response);
        console.log('User registered');
    } catch (error) {
        console.error('Error registering: ', error);
        throw error;
    }
}

export function logout() {
    localStorage.removeItem('authToken');
    setUser({
        email: '',
        token: '',
        username: 'Unauthenticated',
        bio: '',
        image: '',
    });
    console.log('User logged out');
    // console.log('User logged out:', user);
}

export const authHeader = {
    headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`,
    },
};

export function isAuthenticated(): boolean {
    return user !== undefined && user.token !== undefined && user.token !== null && user.token !== '' && user.token !== 'undefined';
}

export async function getCurrentUser(): Promise<User> {
    const apiUrl = import.meta.env.API_URL + '/user';

    try {
        // const response = await axios.get(apiUrl, authHeader);
        // setUser(response.data.user);
        const response = {
            email: 'email@example.com',
            token: 'fake-jwt-token',
            username: 'Eric Simons',
            bio: "Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games",
            image: 'http://i.imgur.com/Qr71crq.jpg',
        } as User;
        console.log('get current user');
        return response;
    } catch (error) {
        console.error('Error get current user:', error);
        throw error;
    }
}
