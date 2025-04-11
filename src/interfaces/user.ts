export interface User {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
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
