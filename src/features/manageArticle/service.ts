import axios from 'axios';
import Pagination from '../../shared';
import { ArticleFilter, CreateArticleRequest, UpdateArticleRequest, ArticleList } from '../manageArticle/types';
import { user, isAuthenticated } from '../manageAccess'
import { authHeader } from '../../shared';

export async function getArticleList(ArticleFilter: ArticleFilter, articlePagination: Pagination): Promise<ArticleList | undefined> {
    if (ArticleFilter.feed && isAuthenticated()) {
        return feedArticleList(articlePagination);
    }

    let apiUrl = import.meta.env.API_URL + '/articles' + '?limit=' + articlePagination.limit + '&offset=' + articlePagination.offset;

    if (ArticleFilter.tag.length > 0) apiUrl += '&tag=' + ArticleFilter.tag;
    if (ArticleFilter.author.length > 0) apiUrl += '&author=' + ArticleFilter.author;
    if (ArticleFilter.favorited) apiUrl += '&favorited=' + user.username;

    try {
        // const response = await axios.get(apiUrl);
        // return response.data;
        const response: ArticleList = {
            articles: [
                {
                    slug: 'how-to-buil-webapps-that-scale',
                    title: 'How to build webapps that scale',
                    description: 'This is the description for the post.',
                    tagList: ['realworld', 'implementations'],
                    createdAt: '2016-02-18T03:22:56.637Z',
                    updatedAt: '2016-02-18T03:48:35.824Z',
                    favorited: true,
                    favoritesCount: 29,
                    author: {
                        username: 'Eric Simons',
                        bio: "Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games",
                        image: 'http://i.imgur.com/Qr71crq.jpg',
                        following: false,
                    },
                },
                {
                    slug: 'the-song-you',
                    title: "The song you won't ever stop singing. No matter how hard you try.",
                    description: 'This is the description for the post.',
                    tagList: ['Music', 'Song'],
                    createdAt: '2016-02-18T03:22:56.637Z',
                    updatedAt: '2016-02-18T03:48:35.824Z',
                    favorited: false,
                    favoritesCount: 32,
                    author: {
                        username: 'Albert Pai',
                        bio: 'I work at statefarm',
                        image: 'http://i.imgur.com/N4VcUeJ.jpg',
                        following: false,
                    },
                },
                {
                    slug: 'how-to-train-your-dragon',
                    title: 'How to train your dragon',
                    description: 'Ever wonder how?',
                    tagList: ['dragons', 'training'],
                    createdAt: '2016-02-18T03:22:56.637Z',
                    updatedAt: '2016-02-18T03:48:35.824Z',
                    favorited: false,
                    favoritesCount: 0,
                    author: {
                        username: 'jake',
                        bio: 'I work at statefarm',
                        image: 'https://i.stack.imgur.com/xHWG8.jpg',
                        following: false,
                    },
                },
                {
                    slug: 'how-to-train-your-dragon-2',
                    title: 'How to train your dragon 2',
                    description: 'So toothless',
                    tagList: ['dragons', 'training'],
                    createdAt: '2016-02-18T03:22:56.637Z',
                    updatedAt: '2016-02-18T03:48:35.824Z',
                    favorited: false,
                    favoritesCount: 0,
                    author: {
                        username: 'jake',
                        bio: 'I work at statefarm',
                        image: 'https://i.stack.imgur.com/xHWG8.jpg',
                        following: false,
                    },
                },
            ],
            articlesCount: 4,
        };
        console.log('get articles');
        return response;
    } catch (error) {
        console.error('Error get articles:', error);
        throw error;
    }
}

async function feedArticleList(articlePagination: Pagination) {
    let apiUrl = import.meta.env.API_URL + '/articles/feed' + '?limit=' + articlePagination.limit + '&offset=' + articlePagination.offset;

    try {
        // const response = await axios.get(apiUrl, authHeader);
        console.log('get feed articles');
        // return response.data;
        return {
            articles: [
                {
                    slug: 'how-to-buil-webapps-that-scale',
                    title: 'How to build webapps that scale',
                    description: 'This is the description for the post.',
                    tagList: ['realworld', 'implementations'],
                    createdAt: '2016-02-18T03:22:56.637Z',
                    updatedAt: '2016-02-18T03:48:35.824Z',
                    favorited: false,
                    favoritesCount: 29,
                    author: {
                        username: 'Eric Simons',
                        bio: "Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games",
                        image: 'http://i.imgur.com/Qr71crq.jpg',
                        following: false,
                    },
                },
                {
                    slug: 'the-song-you',
                    title: "The song you won't ever stop singing. No matter how hard you try.",
                    description: 'This is the description for the post.',
                    tagList: ['Music', 'Song'],
                    createdAt: '2016-02-18T03:22:56.637Z',
                    updatedAt: '2016-02-18T03:48:35.824Z',
                    favorited: false,
                    favoritesCount: 32,
                    author: {
                        username: 'Albert Pai',
                        bio: 'I work at statefarm',
                        image: 'http://i.imgur.com/N4VcUeJ.jpg',
                        following: false,
                    },
                },
                {
                    slug: 'how-to-train-your-dragon',
                    title: 'How to train your dragon',
                    description: 'Ever wonder how?',
                    tagList: ['dragons', 'training'],
                    createdAt: '2016-02-18T03:22:56.637Z',
                    updatedAt: '2016-02-18T03:48:35.824Z',
                    favorited: false,
                    favoritesCount: 0,
                    author: {
                        username: 'jake',
                        bio: 'I work at statefarm',
                        image: 'http://i.imgur.com/N4VcUeJ.jpg',
                        following: false,
                    },
                },
                {
                    slug: 'how-to-train-your-dragon-2',
                    title: 'How to train your dragon 2',
                    description: 'So toothless',
                    tagList: ['dragons', 'training'],
                    createdAt: '2016-02-18T03:22:56.637Z',
                    updatedAt: '2016-02-18T03:48:35.824Z',
                    favorited: false,
                    favoritesCount: 0,
                    author: {
                        username: 'jake',
                        bio: 'I work at statefarm',
                        image: 'http://i.imgur.com/N4VcUeJ.jpg',
                        following: false,
                    },
                },
            ],
            articlesCount: 4,
        };
    } catch (error) {
        console.error('Error get articles:', error);
        throw error;
    }
}

export async function getArticleDetail(slug: string) {
    const apiUrl = import.meta.env.API_URL + '/articles/' + slug;

    try {
        // const response = await axios.get(apiUrl);
        console.log('get article detail');
        // return response.data.article;
        const response = {
            article: {
                slug: 'how-to-buil-webapps-that-scale',
                title: 'How to build webapps that scale',
                description: 'This is the description for the post.',
                body: 'This is the body for the post.',
                tagList: ['realworld', 'implementations'],
                createdAt: '2016-02-18T03:22:56.637Z',
                updatedAt: '2016-02-18T03:48:35.824Z',
                favorited: true,
                favoritesCount: 29,
                author: {
                    username: 'Eric Simons',
                    bio: "Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games",
                    image: 'http://i.imgur.com/Qr71crq.jpg',
                    following: false,
                },
            },
        };
        return response.article;
    } catch (error) {
        console.error('Error get article detail:', error);
        throw error;
    }
}

export async function createArticle(article: CreateArticleRequest) {
    const apiUrl = import.meta.env.API_URL + '/articles';
    try {
        // const response = await axios.post(apiUrl, article, authHeader);
        console.log('create article');
        // return response.data.article;
    } catch (error) {
        console.error('Error creating article:', error);
        throw error;
    }
}

export async function updateArticle(slug: string, article: UpdateArticleRequest) {
    const apiUrl = import.meta.env.API_URL + '/articles/' + slug;
    try {
        // const response = await axios.put(apiUrl, article, authHeader);
        console.log('update article');
        // return response.data.article;
    } catch (error) {
        console.error('Error updating article:', error);
        throw error;
    }
}

export async function deleteArticle(slug: string) {
    const apiUrl = import.meta.env.API_URL + '/articles/' + slug;
    try {
        // await axios.delete(apiUrl, authHeader);
        console.log('delete article');
    } catch (error) {
        console.error('Error deleting article:', error);
        throw error;
    }
}


