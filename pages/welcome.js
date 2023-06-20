import React from "react";
import { useRouter } from "next/router";

const Welcome = () => {
    const router = useRouter();

    const handleLogin = () => {
        router.push("/signin");
    };

    return (
        <div className="background">
            <div className="container">
                <div className="form">
                    <h1 className="title">Welcome to Our Website!</h1>
                    <p>Please log in to continue.</p>
                    <button className="login-button" onClick={handleLogin}>
                        Go to Login
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Welcome;