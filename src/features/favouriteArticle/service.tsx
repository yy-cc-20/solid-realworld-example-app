export async function toggleFavoriteArticle(slug: string) {
    if (slug.length === 0) throw new Error('slug is empty');

    const apiUrl = import.meta.env.API_URL + '/articles/' + slug + '/favorite';
    try {
        // const response = await axios.post(apiUrl, {}, authHeader);
        console.log('favorite article');
        // return response.data.article;
    } catch (error) {
        console.error('Error favoriting article:', error);
        throw error;
    }
}
