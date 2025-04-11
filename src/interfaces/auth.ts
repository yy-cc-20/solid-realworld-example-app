export interface LoginRequest {
    user: {
        email: string;
        password: string;
    };
}

export interface RegistrationRequest {
    user: {
        username: string;
        email: string;
        password: string;
    };
}
