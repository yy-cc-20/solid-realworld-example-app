import axios from 'axios';
import { UpdateUserRequest, User } from '../interfaces';
import { setUser } from '../stores/userStore';
import { authHeader } from './authService';

export async function updateUser(request: UpdateUserRequest) {
    const apiUrl = import.meta.env.API_URL + '/user';
    try {
        // const response = await axios.put(apiUrl, user, authHeader);
        // setUser(response.data.user);
        const response = {
            email: request.user.email ? request.user.email : 'email@example.com',
            token: 'fake-jwt-token',
            username: request.user.username ? request.user.username : 'Eric Simons',
            bio: request.user.bio
                ? request.user.bio
                : "Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games",
            image: request.user.image ? request.user.image : 'http://i.imgur.com/Qr71crq.jpg',
        } as User;
        setUser(response);
        console.log('User updated');
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}
