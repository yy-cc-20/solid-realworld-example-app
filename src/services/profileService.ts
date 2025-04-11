import axios from 'axios';
import { authHeader } from './authService';

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

export async function toggleFollowUser(username: string) {
    if (username === '') throw new Error('Username is required to follow/unfollow a user.');

    const apiUrl = import.meta.env.API_URL + '/profiles/' + username + '/follow';

    try {
        // const response = await axios.put(apiUrl, authHeader);
        console.log('toggle follow user');
        // return response.data.profile;
    } catch (error) {
        console.error('Error following user:', error);
        throw error;
    }
}
