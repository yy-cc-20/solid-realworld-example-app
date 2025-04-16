import axios from 'axios';
import { CreateCommentRequest } from './types';
import { authHeader } from '../../shared';

export async function addCommentToAnArticle(slug: string, comment: CreateCommentRequest) {
    const apiUrl = import.meta.env.API_URL + '/articles/' + slug + '/comments';
    try {
        // const response = await axios.post(apiUrl, comment, authHeader);
        console.log('add comment to an article');
        // return response.data.comment;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw error;
    }
}

export async function getCommentsFromAnArticle(slug: string) {
    const apiUrl = import.meta.env.API_URL + '/articles/' + slug + '/comments';
    try {
        // const response = await axios.get(apiUrl);
        console.log('get comments from an article');
        // return response.data.comments;

        return {
            comments: [
                {
                    id: 1,
                    createdAt: '2016-02-18T03:22:56.637Z',
                    updatedAt: '2016-02-18T03:22:56.637Z',
                    body: 'It takes a Jacobian',
                    author: {
                        username: 'jake',
                        bio: 'I work at statefarm',
                        image: 'http://i.imgur.com/N4VcUeJ.jpg',
                        following: false,
                    },
                },
                {
                    id: 2,
                    createdAt: '2016-02-18T03:22:56.637Z',
                    updatedAt: '2016-02-18T03:22:56.637Z',
                    body: 'It takes a Jacobian',
                    author: {
                        username: 'Eric Simons',
                        bio: "Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games",
                        image: 'http://i.imgur.com/Qr71crq.jpg',
                        following: false,
                    },
                },
            ],
        };
    } catch (error) {
        console.error('Error getting comments:', error);
        throw error;
    }
}

export async function deleteComment(slug: string, commentId: number) {
    const apiUrl = import.meta.env.API_URL + '/articles/' + slug + '/comments/' + commentId;
    try {
        // await axios.delete(apiUrl, authHeader);
        console.log('delete comment');
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
}
