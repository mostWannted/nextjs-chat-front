import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Chats = () => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");

    const router = useRouter();

    useEffect(() => {
        fetchChats();
        setToken(getCookie('token'));
    }, []);

    const getCookie = (name) => {
        const cookie = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return cookie ? cookie[2] : null;
    }

    const fetchChats = async () => {
        try {
            const response = await axios.get("https://ya-praktikum.tech/api/v2/chats", {withCredentials:true

            });
            setChats(response.data);
            setLoading(false);
        } catch (error) {
            setError("Failed to fetch chats");
            setLoading(false);
        }
    };

    const createChat = async (chatData) => {
        try {
            const response = await axios.post("https://ya-praktikum.tech/api/v2/chats", chatData, {withCredentials:true
            });
            setChats([...chats, response.data]);
        } catch (error) {
            setError("Failed to create chat");
        }
    };

    const updateChat = async (chatId, chatData) => {
        try {
            const response = await axios.put(`/api/chats/${chatId}`, chatData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const updatedChats = chats.map((chat) =>
                chat.id === chatId ? response.data : chat
            );
            setChats(updatedChats);
        } catch (error) {
            setError("Failed to update chat");
        }
    };

    const deleteChat = async (chatId) => {
        try {
            await axios.delete(`/api/chats/${chatId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const updatedChats = chats.filter((chat) => chat.id !== chatId);
            setChats(updatedChats);
        } catch (error) {
            setError("Failed to delete chat");
        }
    };

    const sendMessage = async (chatId, messageData) => {
        try {
            await axios.post(`/api/chats/${chatId}/messages`, messageData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            setError("Failed to send message");
        }
    };

    const handleCreateChat = (e) => {
        e.preventDefault();
        const chatData = {
            title: e.target.name.value,
        };
        createChat(chatData);
        e.target.reset();
    };

    const handleUpdateChat = (e, chatId) => {
        e.preventDefault();
        const chatData = {
            name: e.target.name.value,
        };
        updateChat(chatId, chatData);
    };

    const handleDeleteChat = (chatId) => {
        deleteChat(chatId);
    };

    const handleMessageSubmit = (e, chatId) => {
        e.preventDefault();
        const messageData = {
            content: message,
        };
        sendMessage(chatId, messageData);
        setMessage("");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="chatbox-container">
            <ul className="chat-list">
                {chats.map((chat) => (
                    <li key={chat.id} className="chat-item">
                        {chat.name}
                        <form
                            onSubmit={(e) => handleUpdateChat(e, chat.id)}
                            className="update-chat-form"
                        >
                            <input
                                type="text"
                                name="name"
                                className="input"
                                placeholder="Enter new chat name"
                            />
                            <button type="submit" className="button">
                                Update Chat
                            </button>
                        </form>
                        <button
                            onClick={() => handleDeleteChat(chat.id)}
                            className="delete-chat-button"
                        >
                            Delete Chat
                        </button>
                        <form
                            onSubmit={(e) => handleMessageSubmit(e, chat.id)}
                            className="send-message-form"
                        >
                            <input
                                type="text"
                                name="message"
                                className="input"
                                placeholder="Enter message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button type="submit" className="button">
                                Send Message
                            </button>
                        </form>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleCreateChat} className="create-chat-form">
                <input
                    type="text"
                    name="name"
                    className="input"
                    placeholder="Enter chat name"
                />
                <button type="submit" className="button">
                    Create Chat
                </button>
            </form>
        </div>
    );
};

export default Chats;
