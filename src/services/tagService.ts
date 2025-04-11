import axios from 'axios';

export default async function getTagList(): Promise<string[] | undefined> {
    const apiUrl = import.meta.env.API_URL + '/tags';

    try {
        // const response = await axios.get(apiUrl);
        // return response.data.tags;
        const response = ['programming', 'javascript', 'emberjs', 'angularjs', 'react', 'mean', 'node', 'rails'];
        return response;
    } catch (error) {
        console.error('Error get tag list:', error);
        throw error;
    }
}
