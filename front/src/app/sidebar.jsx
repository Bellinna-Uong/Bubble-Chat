import React, { useState } from "react";
import fetchApi from "../api"; // Import de la fonction fetchApi

const Sidebar = ({ teams, setTeams, onTeamSelect }) => {
    const [newTeamName, setNewTeamName] = useState("");

    const handleCreateTeam = async () => {
        if (newTeamName.trim() === "") {
            alert("Please enter a team name");
            return;
        }

        try {
            const data = await fetchApi("teams.php", {
                method: "POST",
                body: JSON.stringify({
                    command: "create",
                    args: [newTeamName],
                }),
            });

            if (data.success) {
                // Mettre à jour les équipes après la création
                setTeams((prevTeams) => [
                    ...prevTeams,
                    { id: prevTeams.length + 1, name: newTeamName },
                ]);
                setNewTeamName(""); // Réinitialiser le champ
            }
        } catch (error) {
            alert(`Erreur lors de la création de l'équipe : ${error.message}`);
        }
    };

    return (
        <div className="sidebar">
            <h3>Your channels</h3>
            <ul>
                {teams.map((team) => (
                    <li key={team.id} onClick={() => onTeamSelect(team)}>
                        {team.name}
                    </li>
                ))}
            </ul>

            <div className="create-team">
                <input
                    type="text"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    placeholder="Enter team name"
                />
                <button onClick={handleCreateTeam}>Create Team</button>
            </div>
        </div>
    );
};

export default Sidebar;
