export interface Profile {
    username: string;
    bio: string;
    image: string;
    following: boolean;
}

export interface UpdateUserRequest {
    user: {
        email?: string;
        username?: string;
        bio?: string;
        password?: string;
        image?: string;
    };
}
