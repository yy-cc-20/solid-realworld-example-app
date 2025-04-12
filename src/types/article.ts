import { Profile } from './profile';

export interface Article {
    slug: string;
    title: string;
    description: string;
    body?: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: Profile;
}

export interface ArticleFilter {
    feed: boolean;
    tag: string;
    author: string;
    favorited: boolean;
}

export interface ArticleList {
    articles: Article[];
    articlesCount: number;
}

export interface CreateArticleRequest {
    article: {
        title: string;
        description: string;
        body: string;
        tagList?: string[];
    };
}

export interface UpdateArticleRequest {
    article: {
        title?: string;
        description?: string;
        body?: string;
        tagList?: string[];
    };
}
