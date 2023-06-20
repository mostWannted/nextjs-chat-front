import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from 'js-cookie';

const Signin = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();

        const userData = {
            login:login,
            password:password
        };

        axios
            .post("https://ya-praktikum.tech/api/v2/auth/signin", userData)
            .then((response) => {
                console.log(response.data);

                // Сохраняем токен в куки
                setCookie('token', response.data.token, { path: '/' });

                router.push("/chats");
            })
            .catch((error) => {
                console.log(error);
                setError("Invalid login or password");
            });
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
