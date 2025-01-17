import React, { useState } from "react";
import './style.css';

const SignInForm = ({ switchToSignUp, navigateToChat }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const response = await fetch('http://localhost:8000/api/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();
            if (result.success) {
                navigateToChat();
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('Erreur lors de la connexion.');
        }
    };

    return (
        <form className="form_login" onSubmit={handleSubmit}>
            <h1>SIGN IN</h1>
            <label>Username</label>
            <input type="text" name="username" required />

            <label>Password</label>
            <input type="password" name="password" required />

            <input type="submit" className="button" value="Sign In" />
            <p className="link">
                Don't have an account?{" "}
                <a href="#" onClick={(e) => { e.preventDefault(); switchToSignUp(); }}>
                    Create one!
                </a>
            </p>
        </form>
    );
};

const SignUpForm = ({ switchToSignIn }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/signup.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();
            if (result.success) {
                alert('Account created successfully!');
                switchToSignIn();
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert('Erreur lors de la création du compte.');
        }
    };

    return (
        <form className="form_login" onSubmit={handleSubmit}>
            <h1>SIGN UP</h1>
            <label>Username</label>
            <input type="text" name="username" required />

            <label>Password</label>
            <input type="password" name="password" required />

            <label>Confirm your password</label>
            <input type="password" name="confirmPassword" required />

            <input type="submit" className="button" value="Sign Up" />
            <p className="link">
                Already have an account?{" "}
                <a href="#" onClick={(e) => { e.preventDefault(); switchToSignIn(); }}>
                    Sign In!
                </a>
            </p>
        </form>
    );
};

const App = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [isChatVisible, setIsChatVisible] = useState(false);

    const switchToSignUp = () => setIsSignIn(false);
    const switchToSignIn = () => setIsSignIn(true);
    const navigateToChat = () => setIsChatVisible(true);

    return (
        <div>
            {isChatVisible ? (
                <h1>Bienvenue dans le chat</h1>
            ) : isSignIn ? (
                <SignInForm switchToSignUp={switchToSignUp} navigateToChat={navigateToChat} />
            ) : (
                <SignUpForm switchToSignIn={switchToSignIn} />
            )}
        </div>
    );
};

export default App;
