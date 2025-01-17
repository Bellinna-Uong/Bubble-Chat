import '../style.css'
import React, { useState } from 'react';
import Sidebar from './sidebar.jsx';
import ChatWindow from './windowchat.jsx';

const Chat = () => {
    const [selectedTeam, setSelectedTeam] = useState(null);

    const teams = [
        { id: 1, name: "Team A" },
        { id: 2, name: "Team B" },
        { id: 3, name: "Team C" },
    ];

    const profile = {
        name: "Bellinna",
    };

    const members = [
        { name: "Alice"},
        { name: "Bob"},
        { name: "Charlie"},
    ];

    return (
        <div className="app-container">
            <Sidebar teams={teams} onTeamSelect={setSelectedTeam} />
            <ChatWindow selectedTeam={selectedTeam} />
        </div>
    );
};

export default Chat;
