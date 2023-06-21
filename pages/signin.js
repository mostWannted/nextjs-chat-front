import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Signin = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        const userData = {
            login:login,
            password:password
        };
        const response = await axios.post("https://ya-praktikum.tech/api/v2/auth/signin", userData,{ withCredentials: true })
            .catch((error) => {
                console.log(error);
                setError("Invalid login or password");
            });
        if(response) {
            console.log(response.headers);
            await router.push("/chats");
        }
    };

    return (
        <div className="background">
            <div className="login-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="login-title">Sign in</div>

                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Login"
                            className="text-input"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>

                    <div className="input-container">
                        <input
                            type="password"
                            placeholder="Password"
                            className="text-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signin;
