import axios from 'axios';
import { User } from '../manageAccess';
import { UpdateUserRequest } from './types';
import { setUser } from '../manageAccess/store';
import { authHeader } from '../../shared/api/authHeader';

export async function updateProfile(request: UpdateUserRequest) {
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

export async function getProfile(username: string) {
    const apiUrl = import.meta.env.API_URL + '/profiles/' + username;

    try {
        // const response = await axios.get(apiUrl);
        // return response.data.profile;
        console.log('get profile');
        if (username === 'eric-simons')
            return {
                username: 'Eric Simons',
                bio: "Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games",
                image: 'http://i.imgur.com/Qr71crq.jpg',
                following: false,
            };
        else
            return {
                username: 'test',
                bio: 'This is a test bio',
                image: 'http://i.imgur.com/N4VcUeJ.jpg',
                following: false,
            };
    } catch (error) {
        console.error('Error get profile:', error);
        throw error;
    }
}