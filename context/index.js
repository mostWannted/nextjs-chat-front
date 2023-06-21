import React, { useState, createContext } from "react";

export const Context = createContext({ token: "" });

export const ContextProvider = ({ children }) => {
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [token, setToken] = useState(""); // Добавленное состояние токена

    const value = {
        firstName,
        setFirstName,
        secondName,
        setSecondName,
        login,
        setLogin,
        email,
        setEmail,
        password,
        setPassword,
        phone,
        setPhone,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

