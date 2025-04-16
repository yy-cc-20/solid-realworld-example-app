export const authHeader = {
    headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`,
    },
};
