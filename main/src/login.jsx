import React, { useState } from "react";
import './style.css'
import { createRoot} from "react-dom/client";

const SignInForm = ({ switchToSignUp }) => (
    <form className="form_login">
        <h1>SIGN IN</h1>
        <p className="message_error">Password Incorrect</p>
        <label>Username</label>
        <input type="email" name="username" />

        <label>Password</label>
        <input type="password" name="password" />

        <input type="submit" className="button" value="Sign In" />
        <p className="link">
            Don't have an account?{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); switchToSignUp(); }}>
                Create one!
            </a>
        </p>
    </form>
);

const SignUpForm = ({ switchToSignIn }) => (
    <form className="form_login">
        <h1>SIGN UP</h1>
        <p className="message_error">Password Incorrect</p>
        <label>Username</label>
        <input type="email" name="username" />

        <label>Password</label>
        <input type="password" name="password" />

        <label>Confirm your password</label>
        <input type="password" name="confirmPassword" />

        <input type="submit" className="button" value="Sign Up" />
        <p className="link">
            Already have an account?{" "}
            <a href="#" onClick={(e) => { e.preventDefault(); switchToSignIn(); }}>
                Sign In!
            </a>
        </p>
    </form>
);

const App = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const switchToSignUp = () => setIsSignIn(false);
    const switchToSignIn = () => setIsSignIn(true);

    return (
        <div>
            {isSignIn ? (
                <SignInForm switchToSignUp={switchToSignUp} />
            ) : (
                <SignUpForm switchToSignIn={switchToSignIn} />
            )}
        </div>
    );
};

export default App;