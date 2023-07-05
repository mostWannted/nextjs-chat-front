import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Auth = () => {
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const router = useRouter();

    const handleSignUp = (e) => {
        e.preventDefault();

        const userData = {
            first_name: firstName,
            second_name: secondName,
            login: login,
            email: email,
            password: password,
            phone: phone,
        };

        axios
            .post("https://ya-praktikum.tech/api/v2/auth/signup", userData)
            .then((response) => {
                console.log(response.data);
                router.push("/chats");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="background">
            <div className="auth-container">
                <form className="auth-form" onSubmit={handleSignUp}>
                    <div className="auth-title">Registration</div>

                    <div className="input-container">
                        <input
                            placeholder="First Name"
                            className="text-input"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className="input-container">
                        <input
                            placeholder="Second Name"
                            className="text-input"
                            value={secondName}
                            onChange={(e) => setSecondName(e.target.value)}
                        />
                    </div>

                    <div className="input-container">
                        <input
                            placeholder="Login"
                            className="text-input"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                    </div>

                    <div className="input-container">
                        <input
                            placeholder="Email"
                            className="text-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                    <div className="input-container">
                        <input
                            placeholder="Phone"
                            className="text-input"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Auth;
