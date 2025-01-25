import React, { useEffect, useState } from 'react';
import Sidebar from './sidebar.jsx';
import ChatWindow from './windowchat.jsx';
import { fetchTeams } from '../api'; // Assurez-vous d'importer la fonction fetchTeams

const Chat = () => {
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [teams, setTeams] = useState([]);

    // Récupération des équipes au montage du composant
    useEffect(() => {
        const loadTeams = async () => {
            try {
                const userTeams = await fetchTeams(); // Appeler la fonction fetchTeams pour récupérer les équipes
                setTeams(userTeams); // Mettre à jour l'état avec les équipes reçues
            } catch (error) {
                console.error("Erreur lors du chargement des équipes:", error.message);
            }
        };

        loadTeams();
    }, []); // Appel uniquement au montage du composant

    return (
        <div className="app-container">
            <Sidebar teams={teams} onTeamSelect={setSelectedTeam} />
            <ChatWindow selectedTeam={selectedTeam} />
        </div>
    );
};

export default Chat;
