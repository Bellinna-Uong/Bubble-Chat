import React, { useState, useEffect } from 'react';

const avatarParts = {
    body: [
        '/images/body1.png',
        '/images/body2.png',
        '/images/body3.png',
        '/images/body4.png',
        '/images/body5.png'
    ],
    eyes: [
        '/images/eyes1.png',
        '/images/eyes2.png',
        '/images/eyes3.png',
        '/images/eyes4.png',
        '/images/eyes5.png'
    ],
    mouth: [
        '/images/mouth1.png',
        '/images/mouth2.png',
        '/images/mouth3.png',
        '/images/mouth4.png',
        '/images/mouth5.png'
    ],
    hair: [
        '/images/hair1.png',
        '/images/hair2.png',
        '/images/hair3.png',
        '/images/hair4.png',
        '/images/hair5.png'
    ],
    clothes: [
        '/images/outfit1.png',
        '/images/outfit2.png',
        '/images/outfit3.png',
        '/images/outfit4.png',
        '/images/outfit5.png'
    ]
};

const AvatarCreator = () => {
    const [avatar, setAvatar] = useState(
        Object.keys(avatarParts).reduce((acc, part) => {
            acc[part] = {
                currentIndex: 0,
                images: avatarParts[part]
            };
            return acc;
        }, {})
    );

    const changeImage = (part, direction) => {
        setAvatar(prev => {
            const currentPart = prev[part];
            let newIndex = currentPart.currentIndex + direction;

            if (newIndex < 0) newIndex = currentPart.images.length - 1;
            if (newIndex >= currentPart.images.length) newIndex = 0;

            return {
                ...prev,
                [part]: {
                    ...currentPart,
                    currentIndex: newIndex
                }
            };
        });
    };

    return (
        <div style={{
            width: '400px',
            height: '600px',
            position: 'relative',
            border: '1px solid black'
        }}>
            {/* Avatar Image Layers */}
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '400px'
            }}>
                {Object.keys(avatarParts).map(part => (
                    <img
                        key={part}
                        src={avatar[part].images[avatar[part].currentIndex]}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                        }}
                    />
                ))}
            </div>

            {/* Navigation for Each Part */}
            <div style={{
                position: 'absolute',
                bottom: '0',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {Object.keys(avatarParts).map(part => (
                    <div
                        key={`nav-${part}`}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '5px 0'
                        }}
                    >
                        <button onClick={() => changeImage(part, -1)}>←</button>
                        <span style={{ margin: '0 10px' }}>{part}</span>
                        <button onClick={() => changeImage(part, 1)}>→</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvatarCreator;