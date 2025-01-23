const BASE_URL = 'http://localhost:8000/api';

const fetchApi = async (endpoint, options = {}) => {
    try {
        const url = `${BASE_URL}/${endpoint}`;
        console.log('Fetching from URL:', url); // Log l'URL générée
        const response = await fetch(url, {
            headers: { 'Content-Type': 'application/json', ...options.headers },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const result = await response.json();
        if (result.success === false) {
            throw new Error(result.message || 'Erreur inconnue');
        }

        return result;
    } catch (error) {
        console.error('Erreur API:', error.message);
        throw error;
    }
};

export default fetchApi;
