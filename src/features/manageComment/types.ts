import { Profile } from '../manageProfile/types';

export interface Comment {
    id: number;
    body: string;
    createdAt: string;
    updatedAt: string;
    author: Profile;
}

export interface CommentList {
    comments: Comment[];
}

export interface CreateCommentRequest {
    comment: {
        body: string;
    };
}
