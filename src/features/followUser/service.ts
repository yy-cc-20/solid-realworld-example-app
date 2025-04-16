import axios from 'axios';
import { authHeader } from '../../shared';

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
