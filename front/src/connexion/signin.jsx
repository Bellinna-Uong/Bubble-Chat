import React from 'react';
import fetchApi from '../api';

const SignInForm = ({ switchToSignUp, navigateToChat }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');

        try {
            const result = await fetchApi('login.php', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
            });

            navigateToChat();
        } catch (error) {
            alert(error.message);
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

export default SignInForm;
