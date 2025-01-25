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

const fetchTeams = async () => {
    try {
        const data = await fetchApi('teams.php', {
            method: 'POST',
            body: JSON.stringify({
                command: 'user_teams',  // Commande pour récupérer les équipes
                args: [],
            }),
        });

        // Retourner les équipes reçues
        return data.teams || [];
    } catch (error) {
        console.error('Erreur lors de la récupération des équipes:', error.message);
        throw error; // Propager l'erreur
    }
};

export { fetchTeams };
