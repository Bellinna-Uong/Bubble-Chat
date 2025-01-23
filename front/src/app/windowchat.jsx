import React, { useState, useEffect } from 'react';

const ChatWindow = ({ selectedTeam }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    // Charger les messages périodiquement
    useEffect(() => {
        if (!selectedTeam) return;

        const fetchMessages = async () => {
            try {
                const response = await fetch(`http://localhost/chat_app/getMessages.php?teamId=${selectedTeam.id}`);
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        // Appel initial et rafraîchissement toutes les 3 secondes
        fetchMessages();
        const interval = setInterval(fetchMessages, 2000);

        return () => clearInterval(interval);
    }, [selectedTeam]);

    const handleSendMessage = async () => {
        if (input.trim() === "") return;

        // Vérifier si le message est une commande
        if (input.startsWith("/")) {
            const [command, ...args] = input.slice(1).split(" ");

            try {
                const response = await fetch('http://localhost/chat_app/commands.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        command,
                        args,
                        teamId: selectedTeam.id, // Envoyer l'ID de l'équipe si nécessaire
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { username: "System", text: data.message }, // Affichez la réponse du système
                    ]);
                } else {
                    console.error("Error processing command");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            // Envoyer un message normal
            try {
                const response = await fetch('http://localhost/chat_app/sendMessage.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        teamId: selectedTeam.id,
                        message: input,
                    }),
                });

                if (response.ok) {
                    setInput("");
                    const updatedMessages = await response.json();
                    setMessages(updatedMessages);
                } else {
                    console.error("Error sending message");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }

        setInput(""); // Réinitialiser l'input après envoi
    };

    return (
        <div className="chat-window">
            {selectedTeam ? (
                <>
                    <h2>{selectedTeam.name} - Chat</h2>
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div key={index} className="message">
                                {msg.username}: {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="message-input">
                        <input
                            type="text"
                            placeholder="Type a message or command..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </>
            ) : (
                <p>Please select a team to view and send messages.</p>
            )}
        </div>
    );
};

export default ChatWindow;
